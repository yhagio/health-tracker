var app = require('./main');

module.exports = Backbone.View.extend({

  tagName: 'div',

  className: 'item',

  template: _.template($("#list-item-template").html()),

  events: {
    'click .removeButton': 'removeFromMyFoods'
  },

  render: function() {
    return this.$el.html(this.template({
      item: this.model
    }));
  },

  // remove the clicked food from My Foods collection
  removeFromMyFoods: function(e) {
    e.preventDefault();
    app.myFoods.remove(this.model);
  }
});