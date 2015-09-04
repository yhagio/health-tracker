"use strict";
var foods;
var myFoods;
var searchBoxView;
var searchResultView;
var myFoodsView;

// ======================== Food Item
var Food = Backbone.Model.extend({});

// ======================== Foods Collection
var Foods = Backbone.Collection.extend({
  model: Food
});

// ======================== My Foods Collection
var MyFoods = Backbone.Firebase.Collection.extend({
  model: Food,
  url: "https://healthtrackingbbone.firebaseio.com"
});

// ======================== Search View
// Use Search Form to fetch data from Nutritionix server
// and display the data as a list
var SearchBoxView = Backbone.View.extend({
  el: $('#main'),

  initialize: function(){
    // _.bindAll(this, "render");
    this.render();
  },

  // Fire fetchData() on search with a keyword
  events: {
    "submit form": "fetchData"
  },

  // Makes ajax call to fetch the foods data from Nutritionix server
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
        if(data && data.hits.length > 0) {
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
          for(var i = 0; data.hits.length > i; i++){
            id = data.hits[i].fields.item_id;
            brandName = data.hits[i].fields.brand_name;
            itemName = data.hits[i].fields.item_name;
            calories = data.hits[i].fields.nf_calories;
            servingSize = data.hits[i].fields.nf_serving_size_qty;
            servingUnit = data.hits[i].fields.nf_serving_size_unit;
            totalFat = data.hits[i].fields.nf_total_fat || "N/A";

            // Create a food model
            food = new Food({
              id: id,
              brandName: brandName,
              itemName: itemName,
              calories: calories,
              servingSize: servingSize,
              servingUnit: servingUnit,
              totalFat: totalFat
            });

            // Add each food model to foods collection
            foods.add(food);
            // console.log('foods', foods);
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
    var template = _.template($('#search-page-template').html());
    this.$el.html(template);
  }
});


// Display returned foods data on search
var SearchResultView = Backbone.View.extend({

  el: $('#resultList'),

  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function(){
    var self = this;
    var foodItem;

    _(this.collection.models).each(function(item) {
      // console.log('item: ', item);
      foodItem = new FoodItemView({model: item});
      // console.log('foodItem: ', self.$el);
      self.$el.append(foodItem.render());
    }, this);
  }
});

// Individual food item
var FoodItemView = Backbone.View.extend({

  template : _.template($('#list-item-template').html()),

	events: {
		'click .addButton' : 'addToMyFoods'
	},

	initialize: function() {
    _.bindAll(this, 'render');
		// this.render();
	},

	render: function() {
    // this.$el.html(this.template({item: this.model}));
		return this.$el.html(this.template({item: this.model}));
	},

	addToMyFoods: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    console.log('adding', id)
    var item = foods.get(id);
    var name = item.get("itemName");
		myFoods.add( this.model );
	}
});


// ======================== My Foods View
var MyFoodsView = Backbone.View.extend({
  el: '#main',

  initialize: function(){
    this.render();
  },

  render: function(){
    // console.log(this.collection);
    var template = _.template($('#myfoods-template').html());
    this.$el.html(template);

    var self = this;
    var listTemplate;
    _(this.collection.models).each(function(item) {

      var foodItem = new FoodItemView({model: item});
      $("#myFoods").append(foodItem.render());
    }, this);
  }
});

// ============= Create Collection and SearchView
foods = new Foods();
myFoods = new MyFoods();
searchBoxView = new SearchBoxView();
searchResultView = new SearchResultView({collection: foods});
myFoodsView = new MyFoodsView({collection: myFoods});


// ======================== Routing
var Router = Backbone.Router.extend({
  routes: {
    "": "search",
    "myfoods": "myfoods"
  }
});

var router = new Router;

router.on('route:search', function() {
  searchBoxView.render();
});

router.on('route:myfoods', function() {
  searchResultView.remove();
  myFoodsView.render();
});

Backbone.history.start();
