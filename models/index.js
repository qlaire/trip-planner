var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost/tripplanner', {
  logging : true
});

  var Place = db.define('place', {
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.ARRAY(Sequelize.FLOAT),
      allowNull: false
    }
  });

  var Hotel = db.define('hotel', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    num_stars: {
      type: Sequelize.INTEGER,
      isIn: [[1,2,3,4,5]],
      allowNull: false
    },
    amenities: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  var Activity = db.define('activity', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age_range: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  var Restaurant = db.define('restaurant', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cuisine: {
      type: Sequelize.STRING,
      allowNull: false
    },

    price: {
      type: Sequelize.INTEGER,
      isIn: [[1,2,3,4,5]],
    }
  });

  Hotel.belongsTo(Place);
  Activity.belongsTo(Place);
  Restaurant.belongsTo(Place); 

module.exports = db;
