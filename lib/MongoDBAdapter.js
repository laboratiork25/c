import { MongoClient } from 'mongodb';
import { readFileSync, writeFileSync, existsSync } from 'fs';

class MongoDBAdapter {
    constructor(url, dbName = 'botDB', collectionName = 'shared_data') {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.client = null;
        this.connected = false;
        this.fallbackFile = 'database_fallback.json';
    }

    async connect() {
        if (this.connected && this.client) {
            return this.client.db(this.dbName).collection(this.collectionName);
        }
        
        try {
            this.client = new MongoClient(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await this.client.connect();
            this.connected = true;
            console.log('✅ Connesso a MongoDB - Dati Condivisi');
            return this.client.db(this.dbName).collection(this.collectionName);
        } catch (error) {
            console.error('❌ Errore connessione MongoDB:', error.message);
            this.connected = false;
            return null;
        }
    }

    async read() {
        try {
            const collection = await this.connect();
            if (!collection) {
                console.log('📁 MongoDB offline, usando fallback file');
                return this.readFallback();
            }
            
            const data = await collection.findOne({ _id: 'shared_bot_data' });
            
            if (data) {
                // Rimuovi l'_id per mantenere compatibilità
                const { _id, ...cleanData } = data;
                return cleanData;
            }
            
            return this.getDefaultData();
        } catch (error) {
            console.error('❌ MongoDB read error:', error.message);
            return this.readFallback();
        }
    }

    async write(data) {
        try {
            const collection = await this.connect();
            if (!collection) {
                console.log('📁 MongoDB offline, salvataggio su file');
                return this.writeFallback(data);
            }
            
            await collection.updateOne(
                { _id: 'shared_bot_data' },
                { 
                    $set: {
                        ...data,
                        _id: 'shared_bot_data'
                    }
                },
                { upsert: true }
            );
            console.log('💾 Dati salvati su MongoDB (Condivisi)');
        } catch (error) {
            console.error('❌ MongoDB write error:', error.message);
            this.writeFallback(data);
        }
    }

    readFallback() {
        try {
            if (existsSync(this.fallbackFile)) {
                const data = JSON.parse(readFileSync(this.fallbackFile, 'utf8'));
                console.log('📁 Letti dati da fallback file');
                return data;
            }
            return this.getDefaultData();
        } catch (error) {
            console.error('❌ Errore lettura fallback file:', error.message);
            return this.getDefaultData();
        }
    }

    writeFallback(data) {
        try {
            writeFileSync(this.fallbackFile, JSON.stringify(data, null, 2));
            console.log('💾 Dati salvati su fallback file');
        } catch (error) {
            console.error('❌ Errore scrittura fallback file:', error.message);
        }
    }

    getDefaultData() {
        return {
            users: {},
            chats: {},
            stats: {},
            msgs: {},
            sticker: {},
            settings: {},
            groups: {},
            ...(global.db?.data || {})
        };
    }

    async close() {
        if (this.client) {
            await this.client.close();
            this.connected = false;
        }
    }
}

export default MongoDBAdapter;
