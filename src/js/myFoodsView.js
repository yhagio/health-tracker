var MyFoodItemView = require('./myFoodItemView');

module.exports = Backbone.View.extend({
  el: '#resultList',

  // Everytime the My Foods collection is synced  or removes a food, re-render
  initialize: function() {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function() {
    this.$el.empty();

    var self = this;
    var totalCalories = 0;
    var foodItem;

    // If the route is at "#/myfoods", run the code below
    if (window.location.hash === "#/myfoods") {

      // Iterate through the My Foods collection to
      // append/display each food in the My Food List
      _(self.collection.models).each(function(item) {
        foodItem = new MyFoodItemView({
          collection: self.collection,
          model: item
        });
        self.$el.append(foodItem.render());

        totalCalories += item.get("calories");
      }, this);

      // Display the calculated total calories
      $("#totalCalories").text(Math.round(totalCalories * 100) / 100);
    }
  }
});