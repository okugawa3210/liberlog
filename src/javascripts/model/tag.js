/**
 * TagsModel
 */
App.TagsModel = Backbone.Model.extend();

/**
 * TagsCollection
 */
App.TagsCollection = Backbone.Collection.extend({
  model: App.TagsModel,
  url: 'http://localhost:3000/api/tags'
});
