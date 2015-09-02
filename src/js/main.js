"use strict";

var Food = Backbone.Model.extend({});

var Foods = Backbone.Collection.extend({
  model: Food
});

var foods = new Foods([]);

var SearchView = Backbone.View.extend({
  el: $('#formBox'),

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
        // console.log(data.hits);
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
          totalFat = data.hits[i].fields.nf_total_fat;

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
        self.render();
      }
    });
  },

  render: function(){
    var self = this;
    _(foods.models).each(function(item){
      $('#resultList').append("<li>" + item.get("itemName") + "</li>");
    }, this);
}
});

var searchView = new SearchView();
