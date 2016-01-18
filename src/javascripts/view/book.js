/**
 * TopView
 */
App.BookView = Marionette.LayoutView.extend({
  className: 'content-top',
  template: Liberlog.Templates.book,
  events: {
    'click #main-header .breadcrumb a': 'onClickBreadcrumb',
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
  onBeforeRender: function() {
    var
      rating = this.model.get('rating'),
      state = this.model.get('state'),
      starCount = Math.floor(rating / 2),
      halfStarCount = rating % 2,
      noStartCount = 5 - starCount - halfStarCount,
      i,
      star = '',
      ratingText = '',
      stateText = '';

    for (i = starCount; i--;) star += '<i class="fa fa-star"></i>';
    for (i = halfStarCount; i--;) star += '<i class="fa fa-star-half-o"></i>';
    for (i = noStartCount; i--;) star += '<i class="fa fa-star-o"></i>';

    this.model.set('ratingStar', star);

    if (rating > 8) ratingText = '非常に好評';
    else if (rating > 6) ratingText = '好評';
    else if (rating > 4) ratingText = '賛否両論';
    else if (rating > 2) ratingText = '不評';
    else if (rating > 0) ratingText = '非常に不評';
    else ratingText = '評価無し';

    if (state) stateText = '貸出中';
    else stateText = '貸出可';

    this.model.set('ratingText', ratingText);
    this.model.set('stateText', stateText);
  },
  onRender: function() {
    this.$('[data-toggle="tooltip"]').tooltip();
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
