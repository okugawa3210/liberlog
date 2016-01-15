/**
 * TopView
 */
App.TopView = Marionette.LayoutView.extend({
  className: 'content-top',
  template: Liberlog.Templates.top,
  events: {
    'click #view-option-form button': 'onClickChangeLayoutButton'
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
      collection: new Backbone.Collection(Liberlog.Data.Books)
    }));
  },
  layoutType: 'tile',
  onClickChangeLayoutButton: function(e) {
    this.layoutType = $(e.currentTarget).attr('name');
    this.renderBookList();
  }
});
