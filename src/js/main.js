"use strict";
var Router = require('./router');

var app = exports = app || {};

// Semantic UI - Toggle Active Class for Navigation Bar
$(document).ready(function() {
  $(".ui .item").on("click", function() {
    $(".ui .item").removeClass("active");
    $(this).addClass("active");
  });
});

// Initiate router
app.router = new Router();

// History
Backbone.history.start();
