import '../lib/language.js';
let handler = async (m, { conn }) => {
    if (!m.isGroup) return; 
    
    let groupMetadata = await conn.groupMetadata(m.chat);
    let participants = groupMetadata.participants;
  

    let users = global.db.data.users;
  

    let groupUsers = participants
      .map(p => ({
        id: p.id,
        bestemmie: users[p.id]?.blasphemy || 0, 
      }))
      .filter(u => u.bestemmie > 0) 
      .sort((a, b) => b.bestemmie - a.bestemmie) 
      .slice(0, 10); 
  
    let text = global.t('blasphemy_top_title', m.sender) + '\n\n';
    groupUsers.forEach((user, index) => {
      text += global.t('blasphemy_top_entry', m.sender, null, {
        position: index + 1,
        user: user.id.split('@')[0],
        count: user.bestemmie
      }) + '\n';
    });
  
    if (groupUsers.length === 0) {
      text = global.t('blasphemy_no_data', m.sender);
    }
 
    await conn.sendMessage(
      m.chat,
      { 
        text, 
        mentions: groupUsers.map(u => u.id) 
      },
      { quoted: m }
    );
  };
  

  handler.command = /^(topbestemmie|bestemmietop|blasphemytop|swearrank|curseleaderboard)$/i;
  handler.group = true;
  export default handler;