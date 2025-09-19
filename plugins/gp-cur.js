import { createCanvas, loadImage } from 'canvas'
import fetch from 'node-fetch'
import fs from 'fs'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new sqlite3.Database(path.join(__dirname, '..', 'lastfm.db'))

db.run(`CREATE TABLE IF NOT EXISTS lastfm_users (
  user_id TEXT PRIMARY KEY,
  lastfm_username TEXT NOT NULL
)`)

const LASTFM_API_KEY = '36f859a1fc4121e7f0e931806507d5f9'

function getLastfmUsername(userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT lastfm_username FROM lastfm_users WHERE user_id = ?', [userId], (err, row) => {
      if (err) reject(err)
      else resolve(row?.lastfm_username)
    })
  })
}

function setLastfmUsername(userId, username) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO lastfm_users (user_id, lastfm_username) VALUES (?, ?)', [userId, username], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function getRecentTrack(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  const res = await fetch(url)
  const json = await res.json()
  return json?.recenttracks?.track?.[0]
}

async function getRecentTracks(username, limit = 10) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`
  const res = await fetch(url)
  const json = await res.json()
  return json?.recenttracks?.track || []
}

async function getTrackInfo(username, artist, track) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&username=${username}&format=json`
  const res = await fetch(url)
  const json = await res.json()
  return json?.track
}

async function getTopArtists(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=10`
  const res = await fetch(url)
  const json = await res.json()
  return json?.topartists?.artist
}

async function getTopAlbums(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=10`
  const res = await fetch(url)
  const json = await res.json()
  return json?.topalbums?.album
}

async function compareTopArtists(user1, user2) {
  const [artists1, artists2] = await Promise.all([getTopArtists(user1), getTopArtists(user2)])
  if (!artists1 || !artists2) return null

  const map1 = new Map(artists1.map(a => [a.name.toLowerCase(), a]))
  const map2 = new Map(artists2.map(a => [a.name.toLowerCase(), a]))

  const inCommon = [...map1.keys()].filter(name => map2.has(name))
  const uniqueToUser1 = [...map1.keys()].filter(name => !map2.has(name))
  const uniqueToUser2 = [...map2.keys()].filter(name => !map1.has(name))

  return {
    inCommon: inCommon.map(name => ({
      name,
      user1Playcount: map1.get(name).playcount,
      user2Playcount: map2.get(name).playcount,
    })),
    uniqueToUser1: uniqueToUser1.map(name => map1.get(name)),
    uniqueToUser2: uniqueToUser2.map(name => map2.get(name)),
  }
}

async function generateTopArtistsCollage(artists, username, grid = 3) {
  const size = 300
  const canvas = createCanvas(size * grid, size * grid + 50)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < Math.min(grid * grid, artists.length); i++) {
    const artist = artists[i]
    const imgUrl = artist.image?.find(img => img.size === 'extralarge')?.['#text']
    const playcount = artist.playcount
    const name = artist.name

    try {
      const res = await fetch(imgUrl)
      const buffer = await res.buffer()
      const img = await loadImage(buffer)

      const x = (i % grid) * size
      const y = Math.floor(i / grid) * size

      ctx.drawImage(img, x, y, size, size)

      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Sans-serif'
      ctx.fillText(name.length > 15 ? name.slice(0, 15) + '…' : name, x + 8, y + size - 30)

      ctx.font = '16px Sans-serif'
      ctx.fillText(`${playcount} scrobble${playcount == 1 ? '' : 's'}`, x + 8, y + size - 8)

    } catch (e) {
      console.log('Errore caricando immagine artista:', name)
    }
  }

  ctx.fillStyle = 'gray'
  ctx.font = '18px Sans-serif'
  ctx.fillText(`Top ${grid * grid} artisti • ${username}`, 10, canvas.height - 10)

  return canvas.toBuffer('image/jpeg')
}

async function generateTopAlbumsCollage(albums, username, grid = 3) {
  const size = 300
  const canvas = createCanvas(size * grid, size * grid + 50)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < Math.min(grid * grid, albums.length); i++) {
    const album = albums[i]
    const imgUrl = album.image?.find(img => img.size === 'extralarge')?.['#text']
    const name = album.name
    const artist = album.artist?.name || 'Sconosciuto'
    const playcount = album.playcount

    try {
      const res = await fetch(imgUrl)
      const buffer = await res.buffer()
      const img = await loadImage(buffer)

      const x = (i % grid) * size
      const y = Math.floor(i / grid) * size

      ctx.drawImage(img, x, y, size, size)

      ctx.fillStyle = 'white'
      ctx.font = 'bold 18px Sans-serif'
      ctx.fillText(name.length > 14 ? name.slice(0, 14) + '…' : name, x + 8, y + size - 32)

      ctx.font = '16px Sans-serif'
      ctx.fillText(artist.length > 14 ? artist.slice(0, 14) + '…' : artist, x + 8, y + size - 12)

    } catch (e) {
      console.log('Errore caricando immagine album:', name)
    }
  }

  ctx.fillStyle = 'gray'
  ctx.font = '18px Sans-serif'
  ctx.fillText(`Top ${grid * grid} album • ${username}`, 10, canvas.height - 10)

  return canvas.toBuffer('image/jpeg')
}

const handler = async (m, { conn, args, usedPrefix, text, command, groupMetadata }) => {
  if (command === 'setuser') {
    const username = text.trim()
    if (!username) {
      await conn.sendMessage(m.chat, { text: `❌ Usa il comando così: ${usedPrefix}setuser <username>` })
      return
    }

    await setLastfmUsername(m.sender, username)
    await conn.sendMessage(m.chat, { text: `✅ Username *${username}* salvato!` })
    return
  }

  const user = await getLastfmUsername(m.sender)
  if (!user) {
    await conn.sendMessage(m.chat, {
      text: `🎵 *Registrazione Last.fm richiesta*\n\n@${m.sender.split('@')[0]}, per usare i comandi musicali devi registrare il tuo username Last.fm.\n\n📱 *Usa questo comando:*\n${usedPrefix}setuser <tuo_username>\n\n💡 *Non hai Last.fm?*\nRegistrati sul sito, collega Spotify e inizia a fare scrobbling della tua musica!`,
      mentions: [m.sender]
    })
    return
  }

  if (command === 'cur') {
    const track = await getRecentTrack(user)
    if (!track) return conn.sendMessage(m.chat, { text: '❌ Nessuna traccia trovata.' })

    const detailedTrack = await getTrackInfo(user, track.artist['#text'], track.name)

    const userPlaycount = parseInt(detailedTrack?.userplaycount) || 0
    const globalListeners = parseInt(detailedTrack?.listeners) || 0
    const globalPlaycount = parseInt(detailedTrack?.playcount) || 0
    const image = track.image?.find(img => img.size === 'extralarge')?.['#text'] || null

    const caption = track['@attr']?.nowplaying === 'true'
      ? `🎧 In riproduzione • @${m.sender.split`@`[0]}\n\n` +
        `🎵 *${track.name}*\n🎤 ${track.artist['#text']}\n💿 ${track.album?.['#text'] || 'Album sconosciuto'}\n\n` +
        `📊 ${userPlaycount} scrobble${userPlaycount === 1 ? '' : 's'} personali\n🔁 ${globalPlaycount.toLocaleString()} totali • 🌍 ${globalListeners.toLocaleString()} ascoltatori`
      : `⏹️ Ultimo brano riprodotto da @${m.sender.split`@`[0]}:\n\n` +
        `🎵 *${track.name}*\n🖌️ ${track.artist['#text']}\n💿 ${track.album?.['#text'] || 'Album sconosciuto'}\n\n` +
        `📊 ${userPlaycount} play ${userPlaycount === 1 ? '' : ''} • 🔁 ${globalPlaycount.toLocaleString()} totali • 🌍 ${globalListeners.toLocaleString()} ascoltatori`

    if (image) {
      await conn.sendMessage(m.chat, {
      text: caption,
        contextInfo: {
  mentionedJid: conn.parseMention(caption),
  externalAdReply: {
    title: `${track.name}`,
body: `${track.artist['#text']}`,
    thumbnail: await (await fetch(image)).buffer(),
    thumbnailUrl: image, 
     mediaType: 1,
    renderLargerThumbnail: true
  }
}
})
    } else {
      await conn.sendMessage(m.chat, {
        text: caption,
        mentions: conn.parseMention(caption)
      })
    }

    return
  }
  
  const parseOptions = (text) => {
  let size = 3
  let period = '7day'

  const sizeMatch = text.match(/(\d)x\1/)
  const periodMatch = text.match(/(7day|1month|3month|6month|12month|overall)/i)

  if (sizeMatch) size = parseInt(sizeMatch[1])
  if (periodMatch) period = periodMatch[1].toLowerCase()

  return { size, period }
}

  if (command === 'topalbums') {
  const { size, period } = parseOptions(text)
  const albums = await getTopAlbums(user, period)
  if (!albums?.length) return conn.sendMessage(m.chat, { text: '❌ Nessun dato trovato.' })

  const buffer = await generateTopAlbumsCollage(albums, size)

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `📀 *Top ${size * size} album di ${user}* (${period})`
  }, { quoted: m })

  return
}

  if (command === 'topartists') {
  const { size, period } = parseOptions(text)
  const artists = await getTopArtists(user, period)
  if (!artists?.length) return conn.sendMessage(m.chat, { text: '❌ Nessun dato trovato.' })

  const buffer = await generateTopArtistsCollage(artists)

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `🖼️ *Top ${size * size} artisti di ${user}* (${period})`
  }, { quoted: m })

  return
}

  if (command === 'compare') {
    let [u1, u2] = text.split(/[ ,|]/).map(v => v.trim()).filter(Boolean)
    const mentions = m.mentionedJid || []

    if (!u1 && m.quoted) {
      u1 = db[m.sender]
      u2 = db[m.quoted.sender]
    } else if (!u1 && mentions.length === 1) {
      u1 = db[m.sender]
      u2 = db[mentions[0]]
    } else if (!u1 && mentions.length === 2) {
      u1 = db[mentions[0]]
      u2 = db[mentions[1]]
    } else if (u1 && u2) {
      u1 = db[u1] || u1
      u2 = db[u2] || u2
    } else if (u1 && mentions.length === 1) {
      u2 = db[mentions[0]]
      u1 = db[u1] || u1
    } else {
      await conn.sendMessage(m.chat, {
        text: `❌ Usa il comando così:\n- ${usedPrefix}compare @utente\n- ${usedPrefix}compare @utente1 @utente2\n- ${usedPrefix}compare (in risposta a un messaggio)`
      }, { quoted: m })
      return
    }

    if (!u1 || !u2) {
      await conn.sendMessage(m.chat, {
        text: `❌ Uno dei due utenti non ha registrato il proprio username.`
      }, { quoted: m })
      return
    }

    const result = await compareTopArtists(u1, u2)

    if (!result) {
      await conn.sendMessage(m.chat, { text: '❌ Errore nel recuperare i dati di confronto.' }, { quoted: m })
      return
    }

    const title = `🤝🏻 *Artisti in comune tra ${u1} e ${u2} (7 giorni)*\n`
    const common = result.inCommon.map((a, i) =>
      `${i + 1}. *${a.name}*\n   👤 ${u1}: ${a.user1Playcount} scrobble${a.user1Playcount > 1 ? 's' : ''}\n   👤 ${u2}: ${a.user2Playcount} scrobble${a.user2Playcount > 1 ? 's' : ''}`
    ).join('\n\n') || 'Nessun artista in comune.'

    const message = `${title}\n${common}`

    await conn.sendMessage(m.chat, { text: message }, { quoted: m })
    return
  }

  if (command === 'cronologia') {
    const tracks = await getRecentTracks(user, 10)
    if (!tracks.length) return conn.sendMessage(m.chat, { text: '❌ Nessuna cronologia trovata.' })

    const trackList = tracks.map((track, i) => {
      const icon = track['@attr']?.nowplaying === 'true' ? '▶️' : `${i + 1}.`
      return `${icon} ${track.name}\n   🖌️ ${track.artist['#text']}`
    }).join('\n\n')

    const cron = `📜 *Cronologia di ${user}*\n\n${trackList}`
    await conn.sendMessage(m.chat, { text: cron })
    return
  }
}

handler.command = ['setuser', 'cur', 'topartists', 'topalbums', 'compare', 'cronologia']
handler.group = true

export default handler