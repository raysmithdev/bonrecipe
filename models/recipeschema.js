const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    keywords: {
        type: Array
    }
});
const Recipe = mongoose.model('recipe', RecipeSchema);
module.exports = Recipe;
