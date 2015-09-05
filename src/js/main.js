"use strict";
var foods;
var myFoods;
var searchBoxView;
var searchResultView;
var myFoodsHeaderView;
var myFoodsView;

// ======================== Food Item
var Food = Backbone.Model.extend({
  defaults:{
		added: false
	}
});

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
        foods.reset();
        console.log('foods.length', foods);
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
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function(){
    this.$el.empty();
    var self = this;
    var foodItem;

    _(this.collection.models).each(function(item) {
      foodItem = new FoodItemView({model: item});
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

	},

	render: function() {
		return this.$el.html(this.template({item: this.model}));
	},

	addToMyFoods: function(e) {
    e.preventDefault();
    this.model.set('added', true);
		myFoods.add(this.model);
    foods.remove(this.model);
	}
});

// ============================================== //
// ============================================== //
// ================== My Foods ================== //
// ============================================== //
// ============================================== //

// ======================== My Foods Header View
var MyFoodsHeaderView = Backbone.View.extend({
  el: '#main',
  initialize: function(){
    this.render();
  },
  render: function(){
    var template = _.template($('#myfoods-header-template').html());
    this.$el.html(template);
  }
});

// ======================== My Foods View
var MyFoodsView = Backbone.View.extend({
  el: '#resultList',

  initialize: function(){
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function(){
    this.$el.empty();

    var self = this;
    var foodItem;
    var total = 0;

    if (window.location.hash === "#/myfoods") {

      _(self.collection.models).each(function(item) {
        foodItem = new MyFoodItemView({collection: self.collection, model: item});
        self.$el.append(foodItem.render());

        total += item.get('calories');
      }, this);

      $("#totalCalories").text(Math.round(total));
    }
  }
});

// ======================== My Food Item View
var MyFoodItemView = Backbone.View.extend({

  template : _.template($('#list-item-template').html()),

	events: {
		'click .removeButton' : 'removeFromMyFoods'
	},

	initialize: function() {

	},

  render: function() {
		return this.$el.html(this.template({item: this.model}));
	},

  removeFromMyFoods: function(e) {
    e.preventDefault();
    myFoods.remove(this.model);
  }
});


// ============= Create Collection and SearchView
foods = new Foods();
myFoods = new MyFoods();
searchBoxView = new SearchBoxView();
searchResultView = new SearchResultView({collection: foods});
myFoodsHeaderView = new MyFoodsHeaderView();
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
  searchResultView.render();
});

router.on('route:myfoods', function() {
  foods.reset();
  myFoodsHeaderView.render();
  myFoodsView.render();
});

Backbone.history.start();
