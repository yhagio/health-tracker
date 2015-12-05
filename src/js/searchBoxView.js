var helpers = require('./helpers');
var Food = require('./models');
var app = require('./main');
var error = document.getElementById("error");

module.exports = Backbone.View.extend({
  el: $("#main"),

  initialize: function() {
    this.render();
  },

  // Fire fetchData() on search with a keyword
  events: {
    "submit form": "fetchData"
  },

  // Makes ajax call to fetch the foods data from Nutritionix server
  fetchData: function(e) {
    e.preventDefault();

    var self = this;
    var foodName = $(e.currentTarget).find("input[type=text]").val().trim();
    var searchTerm = foodName.replace(/ /g, "%20");
    var url = "https://api.nutritionix.com/v1_1/search/" + searchTerm + "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=b301fa4c&appKey=dc12f0d56ee2507d0393345103cb64fa";

    if (foodName.length === 0) {

      // Display error message and remove it after 2 seconds
      helpers.displayErrorToUser(error, "Type a food keyword please ...", 2000);

    } else {

      $.ajax({
        type: "GET",
        url: url,
        dataType: "JSON",
        success: function(data) {
          app.foods.reset();

          if (data && data.hits.length > 0) {
            var id;
            var brandName;
            var itemName;
            var calories;
            var servingSize;
            var servingUnit;
            var totalFat;
            var food;

            // Iterate through the fetched data in order to
            // create a model and add it to foods collection
            for (var i = 0; data.hits.length > i; i++) {
              id = data.hits[i].fields.item_id;
              brandName = data.hits[i].fields.brand_name;
              itemName = data.hits[i].fields.item_name;
              calories = data.hits[i].fields.nf_calories;
              servingSize = data.hits[i].fields.nf_serving_size_qty;
              servingUnit = data.hits[i].fields.nf_serving_size_unit;
              totalFat = data.hits[i].fields.nf_total_fat || "N/A";

              // Create a food model
              app.food = new Food({
                id: id,
                brandName: brandName,
                itemName: itemName,
                calories: calories,
                servingSize: servingSize,
                servingUnit: servingUnit,
                totalFat: totalFat
              });

              // Add each food model to foods collection
              app.foods.add(app.food);
            }
          } else {
            // Display error message and remove it after 2 seconds
            helpers.displayErrorToUser(error, "No Result with the keyword...", 2000);
          }

          self.render();
        },

        error: function() {
          // Display error message and remove it after 2 seconds
          helpers.displayErrorToUser(error, "Error on fetching data...", 2000);
        }
      });

    }

  },

  render: function() {
    var template = _.template($("#search-page-template").html());
    this.$el.html(template);
  }
});