// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Food = require('./models/food');

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

router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on nourishment!' });
});

var foodsRoute = router.route('/foods');

foodsRoute.post(function(req,res) {
    var foodi = new Food();
    foodi.name = req.body.name;
    foodi.type = req.body.type;
    foodi.quantity = req.body.quantity;

    foodi.save(function(err) {
        if(err)
            res.send(err);

        res.json({ message: 'Food added to fridge!', data: foodi });
    });
});

//get all food in the fridge
foodsRoute.get(function(req, res) {
  // Use the Beer model to find all beer
  Food.find(function(err, foods) {
    if (err)
      res.send(err);

    res.json(foods);
  });
});

//single item
var foodRoute = router.route('/foods/:food_id');

//Get a single item from the fridge by its ID
foodRoute.get(function(req, res) {
  // Use the Beer model to find a specific beer
  Food.findById(req.params.food_id, function(err, food) {
    if (err)
      res.send(err);

    res.json(food);
  });
});

//PUT method to decrease the quantity of an item when it is removed

foodRoute.put(function(req,res) {
    Food.findById(req.params.food_id, function(err, food) {
        if(err)
          res.send(err);

        food.quantity = req.body.quantity;

        beer.save(function(err) {
            if(err)
              res.send(err);

            res.json(food)
        });
    });
});

//DELETE food when quantity is 0

foodRoute.delete(function(req,res) {
    Food.findByIdAndRemove(req.params.food_id, function(err, food) {
        if(err)
          res.send(err);

        res.json({message: 'Food removed from fridge'});
    })
})

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Food and drinks available on port ' + port);
