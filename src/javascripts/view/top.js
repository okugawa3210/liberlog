/**
 * TopView
 */
App.TopView = Marionette.LayoutView.extend({
  className: 'content-top',
  template: Liberlog.Templates.layout.top,
  events: {
    'click .layout-btn': 'onClickChangeLayoutButton',
    'click #load-more button': 'onClickLoadMoreButton'
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
  onClickChangeLayoutButton: function(e) {
    this.layoutType = e.currentTarget.name;
    this.renderBookList();
  },
  onClickLoadMoreButton: function() {
    Backbone.history.navigate('books', true);
  }
});
