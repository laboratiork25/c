import { MongoClient } from 'mongodb';

class MongoDBAdapter {
    constructor(url, dbName = 'botDB', collectionName = 'data') {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.client = null;
        this.db = null;
        this.collection = null;
    }

    async connect() {
        if (!this.client) {
            this.client = new MongoClient(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(this.collectionName);
        }
        return this.collection;
    }

    async read() {
        try {
            const collection = await this.connect();
            const data = await collection.findOne({ _id: 'bot_data' });
            
            if (data) {
                // Rimuovi l'_id dal documento per evitare conflitti
                const { _id, ...cleanData } = data;
                return cleanData;
            }
            
            return { 
                users: {}, 
                chats: {}, 
                stats: {}, 
                msgs: {}, 
                sticker: {}, 
                settings: {},
                groups: {},
                ...(global.db.data || {})
            };
        } catch (error) {
            console.error('❌ MongoDB read error:', error);
            return { 
                users: {}, 
                chats: {}, 
                stats: {}, 
                msgs: {}, 
                sticker: {}, 
                settings: {},
                groups: {},
                ...(global.db.data || {})
            };
        }
    }

    async write(data) {
        try {
            const collection = await this.connect();
            await collection.updateOne(
                { _id: 'bot_data' },
                { 
                    $set: {
                        ...data,
                        _id: 'bot_data' // Mantieni l'ID consistente
                    }
                },
                { upsert: true }
            );
            console.log('✅ Dati salvati su MongoDB');
        } catch (error) {
            console.error('❌ MongoDB write error:', error);
        }
    }

    async close() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
            this.collection = null;
        }
    }
}

export default MongoDBAdapter;
