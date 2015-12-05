var Food = require('./models');

var collections = exports;

collections.Foods = Backbone.Collection.extend({
  model: Food
});

collections.MyFoods = Backbone.Firebase.Collection.extend({
  model: Food,
  url: "https://healthtrackingbbone.firebaseio.com"
});