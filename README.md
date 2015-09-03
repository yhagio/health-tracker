# Health Tracker with Backbone.js

###Project Overview

- A single page app that tracks the user's calorie intake, and optionally, other health-related metrics.
- Typing food names into the search field will display a list of matching foods as provided by the health API.
- Users will be able to select an item from the list, and the item will be added to the list of foods the user is tracking.
- The total calorie count will also update to reflect the new daily total.

### Todo
- Implement search bar functionality to the application.
- Write code required to query a health API when the user searches, and return the results in a list.
- Add functionality to add an item to the data store when clicked.
- Write code required to show the items in the data store, and to display the total number of calories.

### Build Tool

Use [Gulp](http://gulpjs.com/)
```
npm install --save-dev gulp gulp-minify-css gulp-concat-css gulp-concat gulp-uglify gulp-minify-html
```

Use [http-server](https://www.npmjs.com/package/http-server)

### References
- [Backbone.js](http://backbonejs.org/)
- [Nutritionix API](https://developer.nutritionix.com/docs/v1_1)


### Notes

Routes
- '/' - User can search foods and it will display the results, and user can add foods from the results to myfoods list
- '/myfoods' - User can see the total calories of the foods added, and also remove foods
- '/'
