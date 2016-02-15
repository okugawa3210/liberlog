/**
 * BooksView
 */
App.BooksView = Marionette.LayoutView.extend({
  className: 'content-top',
  template: Liberlog.Templates.layout.books,
  events: {
    'click #main-header .breadcrumb a': 'onClickBreadcrumb',
    'click .layout-btn': 'onClickChangeLayoutButton'
  },
  regions: {
    bookList: '#book-list'
  },
  onRender: function() {
    this.renderBookList();
  },
  renderBookList: function() {
    var
      tagName = 'div',
      className = 'tile',
      childView = App.BookListTileView;

    if (this.layoutType === 'list') {
      tagName = 'ul';
      className = 'list list-group';
      childView = App.BookListListView;
    } else if (this.layoutType === 'large') {
      className = 'large clearfix';
      childView = App.BookListLargeView;
    }

    this.bookList.show(new App.BookListView({
      tagName: tagName,
      className: className,
      childView: childView,
      collection: App.books
    }));

    this.$('.layout-btn').removeClass('select').filter('[name="' + this.layoutType + '"]').addClass('select');
  },
  layoutType: 'tile',
  onClickBreadcrumb: function(e) {
    Backbone.history.navigate(e.currentTarget.name, true);
  },
  onClickChangeLayoutButton: function(e) {
    this.layoutType = e.currentTarget.name;
    this.renderBookList();
  }
});

/**
 * BookListBaseView
 */
App.BookListBaseView = Marionette.ItemView.extend({
  events: {
    'click a.title': 'onClickTitle'
  },
  onRender: function() {
    this.$('[data-toggle="tooltip"]').tooltip();
  },
  onClickTitle: function(e) {
    Backbone.history.navigate(e.currentTarget.name, true);
  }
});

/**
 * BookListTileView
 */
App.BookListTileView = App.BookListBaseView.extend({
  className: 'panel panel-default',
  template: Liberlog.Templates.book.tile
});

/**
 * BookListListView
 */
App.BookListListView = App.BookListBaseView.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: Liberlog.Templates.book.list
});

/**
 * BookListLargeView
 */
App.BookListLargeView = App.BookListBaseView.extend({
  className: 'col-xs-12 col-sm-6 col-lg-4',
  template: Liberlog.Templates.book.large
});

/**
 * BookListEmptyView
 */
App.BookListEmptyView = Marionette.ItemView.extend({
  tagName: 'p',
  template: Liberlog.Templates.book.none
});

/**
 * BookListView
 */
App.BookListView = Marionette.CollectionView.extend({
  emptyView: App.BookListEmptyView
});

/**
 * BookView
 */
App.BookView = Marionette.LayoutView.extend({
  className: 'content-top',
  template: Liberlog.Templates.layout.book,
  events: {
    'click #main-header .breadcrumb a': 'onClickBreadcrumb'
  },
  regions: {
    bookDetail: '#book-detail',
    bookList: '#book-list'
  },
  onRender: function() {
    var book = this.options.model;
    this.bookDetail.show(new App.BookDetailView({
      model: book
    }));
    this.bookList.show(new App.BookListView({
      tagName: 'div',
      className: 'tile',
      childView: App.BookListTileView,
      collection: new App.BooksCollection(App.books.filter(function(model) {
        return model.get('id') !== book.get('id');
      }))
    }));
  },
  onClickBreadcrumb: function(e) {
    Backbone.history.navigate(e.currentTarget.name, true);
  }
});

/**
 * BookDetail
 */
App.BookDetailView = Marionette.ItemView.extend({
  className: 'panel panel-default',
  template: Liberlog.Templates.book.detail,
  onRender: function() {
    this.$('[data-toggle="tooltip"]').tooltip();
  }
});
