/**
 * LayoutView
 */
App.LayoutView = Marionette.LayoutView.extend({
  template: Liberlog.Templates.layout.base,
  events: {
    'submit #side-search-form': 'onSubmitSideSearchForm'
  },
  regions: {
    childView: '#main-content',
    tagList: '#tag-list .panel-body'
  },
  onRender: function() {
    this.onRenderChidView();

    this.tagList.show(new App.TagListView({
      collection: App.tags
    }));
  },
  onRenderChidView: function() {
    var layoutType = this.options.layoutType || 'top';
    if (layoutType === 'top') {
      this.childView.show(new App.TopView());
    } else if (layoutType === 'books') {
      this.childView.show(new App.BooksView());
    } else if (layoutType === 'book') {
      this.childView.show(new App.BookView({
        model: this.options.model
      }))
    }
  },
  onSubmitSideSearchForm: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.navigate('books', true);
  }
});

/**
 * TagListItemView
 */
App.TagListItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: Liberlog.Templates.tag.list
});

/**
 * TagListView
 */
App.TagListView = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'list-group',
  childView: App.TagListItemView
});
