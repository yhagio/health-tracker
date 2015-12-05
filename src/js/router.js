var app = require('./main');
var Foods = require('./collections').Foods;
var MyFoods = require('./collections').MyFoods;
var SearchBoxView = require('./searchBoxView');
var SearchResultView = require('./searchResultView');
var MyFoodsHeaderView = require('./myFoodsHeaderView');
var MyFoodsView = require('./myFoodsView');

app.foods = new Foods();
app.myFoods = new MyFoods();
app.searchBoxView = new SearchBoxView();
app.searchResultView = new SearchResultView({
  collection: app.foods
});
app.myFoodsHeaderView = new MyFoodsHeaderView();
app.myFoodsView = new MyFoodsView({
  collection: app.myFoods
});

module.exports = Backbone.Router.extend({
  routes: {
    "": "search",
    "myfoods": "myfoods"
  },

  search: function() {
    app.searchBoxView.render();
    app.foods.reset();
    app.searchResultView.render();
  },

  myfoods: function() {
    app.myFoodsHeaderView.render();
    app.myFoodsView.render();
  }
});