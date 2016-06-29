var express = require('express');
var router = express.Router();
var models = require('../models');
var Place = models.Place;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
module.exports = router;

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll({}),
    Restaurant.findAll({}),
    Activity.findAll({})
  ])
  .then(function(valueArray) {
    res.render('index', {
      hotels: valueArray[0],
      restaurants: valueArray[1],
      activities: valueArray[2]
    });
  })
  .catch(next);
});
