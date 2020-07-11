'use strict';

const path = require('path');
const AppEvents = require(path.join(__dirname, '../events'));
const Joi = require('@hapi/joi');
const request = require('request');

class Service {
    constructor() {
        this.userApi = process.env.userapi;
    }
    async getUuid(req, res) {
        let url = `http://${this.userApi}/uuid`;
        try {
            await request({
                url: url
            }, (error, response, body) => {
                if (error) {
                    return AppEvents.emit('error', req, res, { error: error });
                }
                return AppEvents.emit('success', req, res, { uuid: JSON.parse(body).uuid });
            });
        } catch (error) {
            console.log('error', error);
            return AppEvents.emit('error', req, res, { error: error });
        }
    }
    async getUser(req, res) {
        let url = `http://${this.userApi}/user`;
        if (req.params.id) {
            url = url.concat(`/${req.params.id}`);
        }
        try {
            await request({
                url: url
            }, (error, response, body) => {
                if (error) {
                    return AppEvents.emit('error', req, res, { error: error });
                }
                return AppEvents.emit('success', req, res, body);
            });
        } catch (error) {
            console.log('error', error);
            return AppEvents.emit('error', req, res, { error: error });
        }
    }
    async saveUser(req, res) {
        let url = `http://${this.userApi}/user`;
        try {
            await request.post(url, {
                json: req.body
            }, (error, response, body) => {
                if (error) {
                    return AppEvents.emit('error', req, res, { error: error });
                }
                return AppEvents.emit('successWrite', req, res, body);
            });
        } catch (error) {
            console.log('error', error);
            return AppEvents.emit('error', req, res, { error: error });
        }
    }
}
module.exports = new Service();