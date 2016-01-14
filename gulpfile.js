var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();

gulp.task('vendor:fontawesome', function() {
  return gulp
    .src(mainBowerFiles({
      filter: '**/font-awesome/**/*.{less,css,scss}'
    }))
    .pipe($.plumber())
    .pipe($.if('*.less', $.less()))
    .pipe($.if('*.scss', $.sass()))
    .pipe(gulp.dest('dist/stylesheets'));
});
gulp.task('vendor:bootstrap:pre', function() {
  return gulp
    .src(mainBowerFiles({
      filter: '**/bootstrap/**/*.less'
    }), {
      base: 'bower_components/bootstrap/less'
    })
    .pipe($.plumber())
    .pipe(gulp.dest('src/lib/bootstrap'));
});
gulp.task('vendor:bootstrap:compile', function() {
  return gulp
    .src('src/lib/bootstrap/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe(gulp.dest('dist/stylesheets'));
});
gulp.task('vendor:bootstrap', function(callback) {
  return $.runSequence(
    'vendor:bootstrap:pre',
    'vendor:bootstrap:compile',
    callback
  );
});

gulp.task('vendor:stylesheet', function() {
  return gulp
    .src('dist/stylesheets/**/*')
    .pipe($.concat('vendor.min.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('public/assets/stylesheets'))
});

gulp.task('stylesheet', function() {
  return gulp
    .src('src/stylesheets/application.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.minifyCss())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('deploy', function(callback) {
  // vendor
  gulp
    .src(mainBowerFiles({
      filter: '**/*.js'
    }))
    .pipe($.concat('vendor.min.js'))
    .pipe($.uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('public/assets/javascripts'));
  $.runSequence(
    ['vendor:fontawesome', 'vendor:bootstrap'],
    'vendor:stylesheet',
    callback
  );
  gulp
    .src(mainBowerFiles({
      filter: '**/font-awesome/**/*.{eot,svg,ttf,woff,woff2}'
    }))
    .pipe(gulp.dest('public/assets/fonts'));

  $.runSequence('stylesheet');
});

gulp.task('watch', function() {
  'use strict';
  gulp.watch('src/lib/bootstrap/*', function() {
    $.runSequence(
      'vendor:bootstrap:compile',
      'vendor:stylesheet'
    );
  });
  gulp.watch('src/stylesheets/**/*', function() {
    $.runSequence(
      'stylesheet'
    );
  });
});

gulp.task('default', ['watch'], function() {
  gulp
    .src('./public')
    .pipe($.webserver({
      port: 9999,
      host: 'localhost',
      open: true
    }));
});
