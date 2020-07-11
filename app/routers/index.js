// Routers definition
'use strict'
const path = require('path');
const Controller = require(path.join(__dirname,'../controllers/controller.js'));

module.exports = function(server){
    server.route('/uuid').get(Controller.getUuid.bind(Controller));
    server.route('/user/:id').get(Controller.getUser.bind(Controller));
    server.route('/user').get(Controller.getUser.bind(Controller));
    server.route('/user').post(Controller.saveUser.bind(Controller));
};

