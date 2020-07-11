'use strict'
// Server bootstrap
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
require(path.join(__dirname, '/bootscripts/preloadEnvVars.js'))();

server.use(bodyParser.json());

const routers = require('./routers');
routers(server);

module.exports = server;
