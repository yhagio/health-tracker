var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');

// Minify CSS
gulp.task('css', function() {
  gulp.src('./src/css/*.css')
    .pipe(concatCss("./src/css/bundle.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

// Minify JavaScript
gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(concat('./src/js/bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Minify HTML
gulp.task('html', function() {
  gulp.src('./src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./dist'));
});


// Default
gulp.task('default', ['css', 'js', 'html'], function() {
  gulp.watch('./src/index.html', function() {
    gulp.run('html');
  });
  gulp.watch('./src/css/*.css', function() {
    gulp.run('css');
  });
  gulp.watch('./src/js/*.js', function() {
    gulp.run('js');
  });
});
