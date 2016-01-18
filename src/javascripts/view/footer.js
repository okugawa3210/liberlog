/**
 * FooterView
 */
App.FooterView = Marionette.LayoutView.extend({
  template: Liberlog.Templates.footer,
  events: {
    'click a': 'onClickNavigate'
  },
  onClickNavigate: function(e) {
    Backbone.history.navigate(e.currentTarget.name, true);
  }
});
