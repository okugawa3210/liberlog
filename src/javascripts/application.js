'use strict';
var App = new Marionette.Application();

App.addInitializer(function() {
  // router
  new App.Router({
    controller: App.Controller
  });

  // region
  this.addRegions({
    pageHeader: '#page-header',
    pageMain: '#page-main',
    pageFooter: '#page-footer'
  });

  this.tags = new App.TagsCollection();
  this.books = new App.BooksCollection();
});

App.onStart = function() {

  $.when(
    this.tags.fetch(),
    this.books.fetch()
  ).always(function() {
    Backbone.history.start({
      pushState: true,
      root: '/liberlog/'
    });
  });
};

Handlebars.registerHelper('formatDate', function(date, format) {
  var replaced = '';
  date = moment(date);
  if (date.isValid()) {
    if (typeof format !== 'string') {
      format = 'YYYY/MM/DD';
    }
    replaced = date.format(format);
  }
  return replaced;
});

$(function() {

  App.start();

  $('[name="/error"]').on('click', function() {
    Backbone.history.navigate('/error', true);
  });
});
