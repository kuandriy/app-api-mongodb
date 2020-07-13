'use strict';

const path = require('path');
const AppEvents = require(path.join(__dirname, '../events'));
const Joi = require('@hapi/joi');
const uuid = require('uuid');
const MongoClient = require('mongodb').MongoClient;

class Service {
    constructor() {
        try {
            this.dbConnect();
        }
        catch (error) {
            throw error;
        }
    }
    async dbConnect() {
        try {
            const client = await MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
            this.db = client.db(process.env.DB_NAME);
        } catch (error) {
            throw error;
        }
    }
    async generateId(req, res) {
        const result = { uuid: uuid.v4() };
        return AppEvents.emit('success', req, res, result);
    }
    async getUser(req, res) {
        try {
            let query = {};
            if (req.params && req.params.id) {
                query.id = req.params.id;
            }
            await this.db.collection('user').find(query, { projection: { _id: 0 } }).toArray((error, result) => {
                if (error) {
                    return AppEvents.emit('error', req, res, { error: error });
                }
                return AppEvents.emit('success', req, res, result);
            });
        } catch (error) {
            return AppEvents.emit('error', req, res, { error: error });
        }
    }
    async saveUser(req, res) {
        const data = req.body;
        const schema = Joi.object().keys({
            data: Joi.object().required()
        });

        let { error, value } = schema.validate({
            data: data
        });

        if (error) {
            return AppEvents.emit('error', req, res, { error: error });
        }

        data.created = new Date(Date.now()).toISOString();
        data.id = uuid.v4();

        try {
            await this.db.collection('user').insertOne(data, (error, result) => {
                if (error) {
                    return AppEvents.emit('error', req, res, { error: error });
                }
                return AppEvents.emit('successWrite', req, res, result);
            });
        } catch (error) {
            return AppEvents.emit('error', req, res, { error: error });
        }
    }
}
module.exports = new Service();