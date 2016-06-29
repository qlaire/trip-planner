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
    Activity.findAll({}),
    Hotel.findAll({
      where: {
      amenities: 'Free Wi-Fi'
      }
    }),
    Restaurant.findAll({
      where: {
        price: 2
      }
    }),
    Activity.findAll({
      where: {
        placeId:{
          gt: 41
        }
      }
    })
  ])
  .then(function(valueArray) {
    res.render('index', {
      hotels: valueArray[0],
      restaurants: valueArray[1],
      activities: valueArray[2],
      dayHotels: valueArray[3],
      dayRestaurants: valueArray[4],
      dayActivities: valueArray[5]
    });
  })
  .catch(next);
});
