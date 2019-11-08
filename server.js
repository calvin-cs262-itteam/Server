var config = require('./config'),

    express = require('express'),

    fs = require("fs"),

    mongoose = require('mongoose'),
    
    bodyParser = require('body-parser'),

    app = express(),

    apiRouter = express.Router(),

    path = require('path'),

    connection = mongoose.connect(config.database, {useMongoClient: true}),

    easyeats = require('./models/EasyEats');




app.use('/api', apiRouter);

app.listen(config.port);