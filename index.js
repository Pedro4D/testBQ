#!/usr/bin/env nodemon -e js,ls
'use strict';

require('LiveScript');

var restify = require('restify')
    ,host = process.env.HOST || '127.0.0.1'
    ,port = process.env.PORT || '3000'
    ,fs = require('fs')
    ,mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testBQ');


//SET ALL COTROLLERS INTO VAR "controllers"
var controllers = {}
    , controllers_path = process.cwd() + '/controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});

var server = require('./lib/server').create();




//Configure Server
server
    .use(restify.CORS())
    .use(restify.fullResponse())
    .use(restify.queryParser())
    .use(restify.bodyParser({ mapParams: false }))
    .use(function logger(req,res,next) {
        next()
    });


/*// User Start
server.post('/users',  controllers.user.createUser);
server.del('/users/:user_id',  controllers.user.deleteUser);
server.get('/users/:user_id',  controllers.user.getUser);
server.get('/users',  controllers.user.getAllUsers);*/
server.get('/exec',  controllers.main.executeCode);



//START SERVER
server.listen(port,host, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.log('%s listening at %s', server.name, server.url);
    }
});
