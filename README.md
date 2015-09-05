# Health Tracker with Backbone.js

### [DEMO](http://yhagio.github.io/health-tracker/dist/)

![Screenshot](/screenshot.png)

### Features
- Search bar functionality allows user to search foods based on user's keyword input.
- Query a Nutritionix API when the user searches a food, and return the results in a list.
- User can add an food to the Firebase when clicked "Add" button on the right of an food in the results.
- User can see the total calories of the foods you added in the "#/myfoods" route.
- User can remove a food by clicking "X" button on the right side of each "My Foods" list.

### Build Tool

Use [Browserify](http://browserify.org/)
```
npm install -g browserify
browserify src/js/main.js -o src/js/bundle.js
```

Use [Gulp](http://gulpjs.com/)
```
npm install --save-dev gulp gulp-minify-css gulp-uglify gulp-minify-html
```

Use [http-server](https://www.npmjs.com/package/http-server)


### References
- [Backbone.js](http://backbonejs.org/)
- [Nutritionix API](https://developer.nutritionix.com/docs/v1_1)
- [Delegating events to sub-views in Backbone.js](http://stackoverflow.com/questions/8603705/delegating-events-to-sub-views-in-backbone-js)
