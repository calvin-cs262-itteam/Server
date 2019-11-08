var mongoose = require('mongoose'),

Schema = mongoose.Schema,

RecipeSchema = new Schema({
    name : {type: String, required : true, max: 50},
    description: {type: String}
});

module.exports = mongoose.model('database', RecipeSchema);