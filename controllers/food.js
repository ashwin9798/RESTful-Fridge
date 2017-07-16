var Food = require('../models/food');

exports.postFoods = (function(req,res) {
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
exports.getFoods = (function(req, res) {
  // Use the Beer model to find all beer
  Food.find(function(err, foods) {
    if (err)
      res.send(err);

    res.json(foods);
  });
});

//Get a single item from the fridge by its ID
exports.getFoodItem = (function(req, res) {
  // Use the Beer model to find a specific beer
  Food.findById(req.params.food_id, function(err, food) {
    if (err)
      res.send(err);

    res.json(food);
  });
});

//PUT method to decrease the quantity of an item when it is removed

exports.putFoodItem = (function(req,res) {
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

exports.deleteFoodItem = (function(req,res) {
    Food.findByIdAndRemove(req.params.food_id, function(err, food) {
        if(err)
          res.send(err);

        res.json({message: 'Food removed from fridge'});
    })
})
