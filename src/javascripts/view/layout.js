/**
 * LayoutView
 */
App.LayoutView = Marionette.LayoutView.extend({
  template: Liberlog.Templates.layout,
  events: {
    'submit #side-search-form': 'onSubmitSideSearchForm'
  },
  regions: {
    childView: '#main-content'
  },
  onRender: function() {
    this.onRenderChidView();
  },
  onRenderChidView: function() {
    var layoutType = this.options.layoutType || 'top';
    if (layoutType === 'top') {
      this.childView.show(new App.TopView());
    } else if (layoutType === 'book') {
      this.childView.show(new App.BookView());
    }
  },
  onSubmitSideSearchForm: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.navigate('books', true);
  }
});
