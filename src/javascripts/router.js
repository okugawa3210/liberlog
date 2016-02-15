/**
 * AppRouter
 */
App.Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'root',
    'top': 'root',
    'books': 'books',
    'books/:id': 'books',
    'error': 'error',
    '*notFound': 'notFound'
  }
});

/**
 * AppController
 */
App.Controller = {
  default: function() {
    App.pageMain.reset();
  },
  root: function() {
    this.top();
  },
  top: function() {
    App.pageHeader.show(new App.HeaderView());
    App.pageMain.show(new App.LayoutView());
    App.pageFooter.show(new App.FooterView());
  },
  books: function(id) {
    App.pageHeader.show(new App.HeaderView());
    if (id) {
      App.pageMain.show(new App.LayoutView({
        layoutType: 'book',
        model: App.books.get(id)
      }));
    } else {
      App.pageMain.show(new App.LayoutView({
        layoutType: 'books'
      }));
    }
    App.pageFooter.show(new App.FooterView());
  },
  error: function() {},
  notFound: function() {
    App.pageHeader.show(new App.HeaderView());
    App.pageMain.show(new App.NotFoundView());
    App.pageFooter.show(new App.FooterView());
  }
};
