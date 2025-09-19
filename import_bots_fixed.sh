#!/bin/bash

# Configurazione
DB_NAME="botDB"
COLLECTION_NAME="bots"
IMPORT_DIR="/root"  # Cambia con il percorso dove sono i bot

find "$IMPORT_DIR" -name "database.json" -type f | while read file; do
    BOT_NAME=$(basename $(dirname "$file"))
    echo "Processing bot: $BOT_NAME"
    
    # Estrae ogni utente dal file JSON e lo importa separatamente
    jq -c 'to_entries[]' "$file" | while read -r user_data; do
        mongosh $DB_NAME --eval "
            db.$COLLECTION_NAME.insertOne({
                bot_id: '$BOT_NAME',
                user_phone: $(echo "$user_data" | jq -r '.key'),
                messaggi: $(echo "$user_data" | jq -r '.value.messaggi // 0'),
                blasphemy: $(echo "$user_data" | jq -r '.value.blasphemy // 0'),
                exp: $(echo "$user_data" | jq -r '.value.exp // 0'),
                money: $(echo "$user_data" | jq -r '.value.money // null'),
                warn: $(echo "$user_data" | jq -r '.value.warn // 0'),
                joincount: $(echo "$user_data" | jq -r '.value.joincount // 0'),
                limit: $(echo "$user_data" | jq -r '.value.limit // 0'),
                premium: $(echo "$user_data" | jq -r '.value.premium // false'),
                premiumDate: $(echo "$user_data" | jq -r '.value.premiumDate // -1'),
                name: $(echo "$user_data" | jq -r '.value.name // \"\"'),
                muto: $(echo "$user_data" | jq -r '.value.muto // false'),
                import_date: new Date()
            })
        "
    done
done

echo "Import completed!"