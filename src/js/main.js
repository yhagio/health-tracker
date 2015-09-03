"use strict";

// ======================== Food Item
var Food = Backbone.Model.extend({});

// ======================== Foods Collection
var Foods = Backbone.Collection.extend({
  model: Food
});

// ======================== My Foods Collection
var MyFoods = Backbone.Collection.extend({
  model: Food
});

// ======================== Search View
// Use Search Form to fetch data from Nutritionix server
// and display the data as a list
var SearchView = Backbone.View.extend({
  el: $('#main'),

  initialize: function(){
    _.bindAll(this, "render");
    this.render();
  },

  events: {
    "submit form": "fetchData"
  },

  fetchData: function(e){
    e.preventDefault();

    var self = this;
    var foodName = $(e.currentTarget).find("input[type=text]").val().trim();
    var searchTerm = foodName.replace(/ /g, "%20");
    var url = "https://api.nutritionix.com/v1_1/search/"+searchTerm+"?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=b301fa4c&appKey=dc12f0d56ee2507d0393345103cb64fa";

    $.ajax({
      type: "GET",
      url: url,
      dataType: "JSON",
      success: function(data) {
        console.log(data.hits);
        if(data && data.hits.length > 0) {
          var brandName;
          var itemName;
          var calories;
          var servingSize;
          var servingUnit;
          var totalFat;
          var food;

          for(var i = 0; data.hits.length > i; i++){
            brandName = data.hits[i].fields.brand_name;
            itemName = data.hits[i].fields.item_name;
            calories = data.hits[i].fields.nf_calories;
            servingSize = data.hits[i].fields.nf_serving_size_qty;
            servingUnit = data.hits[i].fields.nf_serving_size_unit;
            totalFat = data.hits[i].fields.nf_total_fat || "N/A";

            food = new Food({
              brandName: brandName,
              itemName: itemName,
              calories: calories,
              servingSize: servingSize,
              servingUnit: servingUnit,
              totalFat: totalFat
            });

            foods.add(food);
          }
        } else {
          console.log('None');
        }

        self.render();
      },
      error: function(){
        console.log('Error on fetching data...');
      }
    });
  },

  render: function(){
    var template = _.template($('#search-page-template').html(), null);
    this.$el.html(template);

    var self = this;
    _(foods.models).each(function(item){
      $('#resultList').append(
        "<li class='listItem'>" +
          "<p>" + item.get("itemName") + " - " + item.get("brandName") + " <span class='addButtonSpan'><button class='addButton'>Add</button></span>" + "</p>" +
          "<hr />" +
          "<p>" + item.get("servingSize") + " " + item.get("servingUnit") + "</p>" +
          "<p>Calories: " + item.get("calories") + "</p>" +
          "<p>Total Fat: " + item.get("totalFat") + "</p>" +
        "</li>");
    }, this);
  }
});

// ======================== My Foods View
var MyFoodsView = Backbone.View.extend({
  el: '#main',

  render: function(){
    var template = _.template($('#myfoods-template').html(), null);
    this.$el.html(template);
  }
});

// ============= Create Collection and SearchView
var foods = new Foods([]);
var searchView = new SearchView();
var myFoodsView = new MyFoodsView();


// ======================== Routing
var Router = Backbone.Router.extend({
  routes: {
    "": "search",
    "myfoods": "myfoods"
  }
});

var router = new Router;

router.on('route:search', function() {
  searchView.render();
});

router.on('route:myfoods', function(id) {
  myFoodsView.render();
});

Backbone.history.start();
