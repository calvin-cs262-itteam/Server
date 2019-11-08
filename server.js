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


/* Manage size limits for POST/PUT requests */
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

/* Manage CORS Access for ALL requests/responses */
app.use(function(req, res, next)
{
   /* Allow access from any requesting client */
   res.setHeader('Access-Control-Allow-Origin', '*');

   /* Allow access for any of the following Http request types */
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

   /* Set the Http request header */
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});


app.use('/api', apiRouter);

app.listen(config.port);