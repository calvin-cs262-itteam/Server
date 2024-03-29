var config = require('./config'),

    express = require('express'),

    fs = require("fs"),

    mongoose = require('mongoose'),
    
    bodyParser = require('body-parser'),

    app = express(),

    apiRouter = express.Router(),

    path = require('path'),

    connection = mongoose.connect(config.database, {useNewUrlParser: true}),

    RecipeSchema = require('./models/Recipe');


/* Manage size limits for POST/PUT requests 
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
*/
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

apiRouter.get('/Recipes', function(req, res){
    RecipeSchema.find({ displayed: true}, (err, recs) =>
    {w
        if (err){
            console.dir(err);
        }   
        res.json({records: recs});
    });
});

apiRouter.post('/Recipes', function(req, res){
    var name = req.body.name,
    description = req.body.description;

    RecipeSchema.create({name: name,
            description: description},
        function (err, small)
    {if (err){
        console.dir(err);
    }
    res.json({message: 'success'});

    });

});

apiRouter.put('/Recipes/:recipeID', function(req, res){
    RecipeSchema.findById({
        _id: req.params.recordID}, (err, recs) =>
        {
            if(err){
                console.dir(err);
            }
            else{
                recs.name = req.body.name || recs.name;
                recs.description = req.body.description || recs.description;

                recs.save((err, recs) =>
                {if(err){
                    res.status(500).send(err)
                }
                res.json({records:recs});
            });
        }
        });

});

apiRouter.delete('/Recipes/:recipeID', function(req, res){
    RecipeSchema.findByIdAndRemove({_id: req.params.recordID}, (err, recs) =>
    {
        if (err)
        {
            console.dir(err);
        }
        res.json({records: recs});
    });

});


app.use('/api', apiRouter);

app.listen(config.port);