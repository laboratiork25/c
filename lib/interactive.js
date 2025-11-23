import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@realvare/based'

export function initializeInteractiveFunctions(conn) {
    if (!conn.sendButton2) {
        conn.sendButton2 = async function(jid, text = '', footer = '', buffer, buttons, copy, urls, quoted, options) {
            let img, video

            // media handling
            if (buffer) {
                if (/^https?:\/\//i.test(buffer)) {
                    try {
                        const response = await fetch(buffer)
                        const contentType = response.headers.get('content-type')
                        if (/^image\//i.test(contentType)) {
                            img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer })
                        } else if (/^video\//i.test(contentType)) {
                            video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer })
                        } else {
                            console.error("Unsupported MIME type:", contentType)
                        }
                    } catch (error) {
                        console.error("Error fetching MIME type:", error)
                    }
                } else {
                    try {
                        const type = await conn.getFile(buffer)
                        if (/^image\//i.test(type.mime)) {
                            img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer })
                        } else if (/^video\//i.test(type.mime)) {
                            video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer })
                        }
                    } catch (error) {
                        console.error("Error getting file type:", error)
                    }
                }
            }

            const dynamicButtons = []
            if (buttons && Array.isArray(buttons)) {
                buttons.forEach(btn => dynamicButtons.push({
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({ display_text: btn[0], id: btn[1] })
                }))
            }

            if (copy && (typeof copy === 'string' || typeof copy === 'number')) {
                dynamicButtons.push({
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({ display_text: 'Copy', copy_code: copy })
                })
            }

            if (urls && Array.isArray(urls)) {
                urls.forEach(url => dynamicButtons.push({
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({ display_text: url[0], url: url[1], merchant_url: url[1] })
                }))
            }

            const interactiveMessage = {
                body: { text },
                footer: { text: footer },
                header: {
                    hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
                    imageMessage: img?.imageMessage || null,
                    videoMessage: video?.videoMessage || null
                },
                nativeFlowMessage: {
                    buttons: dynamicButtons,
                    messageParamsJson: ''
                }
            }

            const msgL = generateWAMessageFromContent(jid, {
                viewOnceMessage: { message: { interactiveMessage } }
            }, { userJid: conn.user.jid, quoted })

            return conn.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })
        }
    }

    if (!conn.sendNCarousel) {
        conn.sendNCarousel = async function(jid, text = '', footer = '', buffer, buttons, copy, urls, list, quoted, options = {}) {
            let img, video

            if (buffer) {
                if (/^https?:\/\//i.test(buffer)) {
                    try {
                        const response = await fetch(buffer)
                        const contentType = response.headers.get('content-type')
                        if (/^image\//i.test(contentType)) {
                            img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer, ...options })
                        } else if (/^video\//i.test(contentType)) {
                            video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer, ...options })
                        }
                    } catch (error) {
                        console.error("Error fetching MIME type:", error)
                    }
                } else {
                    try {
                        const type = await conn.getFile(buffer)
                        if (/^image\//i.test(type.mime)) {
                            img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer, ...options })
                        } else if (/^video\//i.test(type.mime)) {
                            video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer, ...options })
                        }
                    } catch (error) {
                        console.error("Error getting file type:", error)
                    }
                }
            }

            const dynamicButtons = []
            if (buttons && Array.isArray(buttons)) {
                buttons.forEach(btn => dynamicButtons.push({
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({ display_text: btn[0], id: btn[1] })
                }))
            }

            if (copy && (typeof copy === 'string' || typeof copy === 'number')) {
                dynamicButtons.push({
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({ display_text: 'Copy', copy_code: copy })
                })
            }

            if (urls && Array.isArray(urls)) {
                urls.forEach(url => dynamicButtons.push({
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({ display_text: url[0], url: url[1], merchant_url: url[1] })
                }))
            }

            if (list && Array.isArray(list)) {
                list.forEach(lister => dynamicButtons.push({
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({ title: lister[0], sections: lister[1] })
                }))
            }

            const interactiveMessage = {
                body: { text: text || '' },
                footer: { text: footer || '' },
                header: {
                    hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
                    imageMessage: img?.imageMessage || null,
                    videoMessage: video?.videoMessage || null
                },
                nativeFlowMessage: {
                    buttons: dynamicButtons.filter(Boolean),
                    messageParamsJson: ''
                }
            }

            const messageContent = proto.Message.fromObject({
                viewOnceMessage: {
                    message: {
                        messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                        interactiveMessage
                    }
                }
            })

            const msgs = await generateWAMessageFromContent(jid, messageContent, {
                userJid: conn.user.jid,
                quoted: quoted,
                upload: conn.waUploadToServer
            })

            return conn.relayMessage(jid, msgs.message, { messageId: msgs.key.id })
        }
    }

    if (!conn.sendCarousel) {
        conn.sendCarousel = async function(jid, text = '', footer = '', messages, quoted, options = {}) {
            try {
                if (messages.length > 1) {
                    const cards = await Promise.all(messages.map(async ([cardText = '', cardFooter = '', buffer, buttons, copy, urls, list]) => {
                        let img, video

                        if (buffer) {
                            if (/^https?:\/\//i.test(buffer)) {
                                try {
                                    const response = await fetch(buffer)
                                    const contentType = response.headers.get('content-type')
                                    if (/^image\//i.test(contentType)) {
                                        img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer, ...options })
                                    } else if (/^video\//i.test(contentType)) {
                                        video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer, ...options })
                                    }
                                } catch (error) {
                                    console.error("Error fetching MIME type:", error)
                                }
                            } else {
                                try {
                                    const type = await conn.getFile(buffer)
                                    if (/^image\//i.test(type.mime)) {
                                        img = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer, ...options })
                                    } else if (/^video\//i.test(type.mime)) {
                                        video = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer, ...options })
                                    }
                                } catch (error) {
                                    console.error("Error getting file type:", error)
                                }
                            }
                        }

                        const dynamicButtons = []
                        if (buttons && Array.isArray(buttons)) {
                            buttons.forEach(btn => dynamicButtons.push({
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({ display_text: btn[0], id: btn[1] })
                            }))
                        }

                        if (copy && Array.isArray(copy)) {
                            copy.forEach(copyBtn => dynamicButtons.push({
                                name: 'cta_copy',
                                buttonParamsJson: JSON.stringify({ display_text: copyBtn[0] || 'Copy', copy_code: copyBtn[1] })
                            }))
                        }

                        if (urls && Array.isArray(urls)) {
                            urls.forEach(url => dynamicButtons.push({
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({ display_text: url[0], url: url[1], merchant_url: url[1] })
                            }))
                        }

                        if (list && Array.isArray(list)) {
                            list.forEach(lister => dynamicButtons.push({
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({ title: lister[0], sections: lister[1] })
                            }))
                        }

                        // Handle cardText being an object {title, body} or a string
                        let bodyText = '';
                        let headerTitle = '';

                        if (typeof cardText === 'object' && cardText !== null) {
                             bodyText = cardText.body || '';
                             headerTitle = cardText.title || '';
                        } else {
                             bodyText = cardText || '';
                             // Evita duplicazione testo: estrai prima linea breve per header, lascia contenuto completo nel body
                             const firstLine = (bodyText).split(/\n|\r/).find(l => l.trim()) || ''
                             headerTitle = firstLine.length > 60 ? firstLine.slice(0, 57) + '…' : firstLine
                        }

                        return {
                            body: proto.Message.InteractiveMessage.Body.fromObject({ text: bodyText }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: cardFooter || null }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: headerTitle || null,
                                subtitle: null, // rimuoviamo subtitle duplicato
                                hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
                                imageMessage: img?.imageMessage || null,
                                videoMessage: video?.videoMessage || null
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: dynamicButtons.filter(Boolean), messageParamsJson: '' })
                        }
                    }))

                    const interactiveMessage = proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.fromObject({ text: text || '' }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: footer || '' }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({ title: text || '', subtitle: text || '', hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: cards })
                    })

                    const messageContent = proto.Message.fromObject({
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                interactiveMessage
                            }
                        }
                    })

                    const msgs = await generateWAMessageFromContent(jid, messageContent, {
                        userJid: conn.user.jid,
                        quoted: quoted,
                        upload: conn.waUploadToServer
                    })

                    return conn.relayMessage(jid, msgs.message, { messageId: msgs.key.id })
                } else {
                    // Usa sendNCarousel per messaggi singoli
                    return conn.sendNCarousel(jid, ...messages[0], quoted, options)
                }
            } catch (error) {
                console.error("Error en sendCarousel:", error)
                throw error
            }
        }
    }
}
