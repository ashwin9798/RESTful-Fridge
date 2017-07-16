var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema ({
    name: String,
    type: String,
    quantity: Number
})

module.exports = mongoose.model('Food', FoodSchema);
