/**
 * HeaderView
 */
App.HeaderView = Marionette.LayoutView.extend({
  template: Liberlog.Templates.header,
  events: {
    'click a': 'onClickNavigate',
    'submit #header-search-form': 'onSubmitHeaderSearchForm'
  },
  onClickNavigate: function(e) {
    Backbone.history.navigate(e.currentTarget.name, true);
  },
  onSubmitHeaderSearchForm: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.navigate('books', true);
  }
});
