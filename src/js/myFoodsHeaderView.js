module.exports = Backbone.View.extend({
  el: '#main',

  initialize: function() {
    this.render();
  },

  render: function() {
    var template = _.template($("#myfoods-header-template").html());
    this.$el.html(template);
  }
});