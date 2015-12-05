var FoodItemView = require('./foodItemView');

// Display returned foods data on search view
module.exports = Backbone.View.extend({

  el: $("#resultList"),

  // Everytime fetched the food data from server (add each food to Foods collection), or
  // add the clicked food to My Foods collection (remove from Foos collection), re-render
  initialize: function() {
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function() {
    this.$el.empty();
    var self = this;
    var foodItem;

    // Iterate through the collection in order to
    // create individual item views and
    // append/display each to Result List view
    _(this.collection.models).each(function(item) {
      foodItem = new FoodItemView({
        model: item
      });
      self.$el.append(foodItem.render());
    }, this);
  }
});