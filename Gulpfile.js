var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');

// Minify CSS
gulp.task('css', function() {
  gulp.src('./src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

// Minify JavaScript
gulp.task('js', function() {
  gulp.src('./src/js/bundle.js')
    .pipe(uglify())
    .pipe(concat('bundle2.js'))
    .pipe(gulp.dest('./src/js'));
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
