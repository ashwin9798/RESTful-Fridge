var Food = require('../models/food');

exports.postFoods = (function(req,res) {
    var food = new Food();
    food.name = req.body.name;
    food.type = req.body.type;
    food.quantity = req.body.quantity;
    food.userId = req.user._id;

    food.save(function(err) {
        if(err)
            res.send(err);

        res.json({ message: 'Food added to fridge!', data: food });
    });
});

//get all food in the fridge
exports.getFoods = (function(req, res) {
    // Use the Beer model to find all beer
    Food.find({userId: req.user._id} function(err, foods) {
      if (err)
        res.send(err);

      res.json(foods);
    });
});

//Get a single item from the fridge by its ID
exports.getFoodItem = (function(req, res) {
  // Use the Beer model to find a specific beer
    Food.find({userId: req.user._id, _id: req.params.food_id }, function(err, food) {
      if (err)
        res.send(err);

      res.json(food);
    });
});

//PUT method to decrease the quantity of an item when it is removed

exports.putFoodItem = (function(req,res) {
    Food.update({ userId: req.user._id, _id: req.params.food_id }, { quantity: req.body.quantity }, function(err, num, raw) {
        if (err)
          res.send(err);
        res.json({ message: num + ' updated' });
    });
});

exports.deleteFoodItem = (function(req,res) {
    Food.remove({ userId: req.user._id, _id: req.params.food_id }, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Food removed from the fridge!' });
    });
})
