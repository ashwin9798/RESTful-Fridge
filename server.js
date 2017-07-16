// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var foodController = require('./controllers/food');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/RESTful-Fridge');

var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

//endpoint for /foods
router.route('/foods')
  .post(foodController.postFoods)
  .get(foodController.getFoods);

router.route('/foods/:food_id')
  .get(foodController.getFoodItem)
  .put(foodController.putFoodItem)
  .delete(foodController.deleteFoodItem)

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers)

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Food and drinks available on port ' + port);
