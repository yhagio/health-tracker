var app = require('./main');

// Individual food item view
module.exports = Backbone.View.extend({

  tagName: 'div',

  className: 'item',

  template: _.template($("#list-item-template").html()),

  events: {
    'click .addButton': 'addToMyFoods'
  },

  render: function() {
    return this.$el.html(this.template({
      item: this.model
    }));
  },

  // Add a food to My Foods collection on clicking "Add" button
  addToMyFoods: function(e) {
    e.preventDefault();
    this.model.set("added", true);
    app.myFoods.add(this.model);
    app.foods.remove(this.model);
  }
});