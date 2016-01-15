var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('vendor:javascript', function() {
  return gulp
    .src(mainBowerFiles({
      filter: '**/*.js'
    }))
    .pipe($.concat('vendor.min.js'))
    .pipe($.uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('public/assets/javascripts'));
});
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
  return runSequence(
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
gulp.task('vendor:font', function() {
  return gulp
    .src(mainBowerFiles({
      filter: '**/*.{eot,svg,ttf,woff,woff2}'
    }))
    .pipe(gulp.dest('public/assets/fonts'));
});
gulp.task('vendor', function(callback) {
  return runSequence(
    'vendor:javascript', ['vendor:fontawesome', 'vendor:bootstrap'],
    'vendor:stylesheet',
    callback
  );
});
gulp.task('javascript:deploy', function() {
  return gulp
    .src(['dist/templates/templates.js', 'src/javascripts/**/*.js'])
    .pipe($.plumber())
    .pipe($.concat('application.min.js'))
    .pipe($.uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('public/assets/javascripts'));
});
gulp.task('javascript:template', function() {
  return gulp
    .src('src/templates/**/*.hbs')
    .pipe($.plumber())
    .pipe($.handlebars())
    .pipe($.wrap('Handlebars.template(<%= contents %>)'))
    .pipe($.declare({
      namespace: 'Liberlog.Templates',
      noRedeclare: true
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('dist/templates'));
});
gulp.task('javascript', function(callback) {
  return runSequence(
    'javascript:template',
    'javascript:deploy',
    callback
  );
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

gulp.task('deploy', ['vendor', 'javascript', 'stylesheet']);

gulp.task('watch', function() {
  'use strict';
  gulp.watch('src/lib/bootstrap/*', function() {
    runSequence(
      'vendor:bootstrap:compile',
      'vendor:stylesheet'
    );
  });
  gulp.watch('src/stylesheets/**/*', function() {
    runSequence(
      'stylesheet'
    );
  });
  gulp.watch('src/javascripts/**/*', function() {
    runSequence(
      'javascript:deploy'
    );
  });
  gulp.watch('src/templates/**/*', function() {
    runSequence(
      'javascript'
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
