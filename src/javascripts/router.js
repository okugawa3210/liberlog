/**
 * AppRouter
 */
App.Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'root',
    'error': 'error',
    '*notFound': 'notFound',
    'top': 'top',
    'books': 'books'
  }
});

/**
 * AppController
 */
App.Controller = {
  default: function() {
  },
  root: function() {
    this.top();
  },
  error: function() {
  },
  notFound: function() {
  },
  top: function() {
    App.pageMain.show(new App.TopView());
  },
  books: function() {

  }
};