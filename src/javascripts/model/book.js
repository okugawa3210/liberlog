/**
 * BooksModel
 */
App.BooksModel = Backbone.Model.extend();

/**
 * BooksCollection
 */
App.BooksCollection = Backbone.Collection.extend({
  model: App.BooksModel,
  initialize: function() {
    this.on('add', this.onAdd);
  },
  onAdd: function(model) {
    var
      rating = model.get('rating'),
      state = model.get('state'),
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

    model.set('ratingStar', star);

    if (rating > 8) ratingText = '非常に好評';
    else if (rating > 6) ratingText = '好評';
    else if (rating > 4) ratingText = '賛否両論';
    else if (rating > 2) ratingText = '不評';
    else if (rating > 0) ratingText = '非常に不評';
    else ratingText = '評価無し';

    if (state) stateText = '貸出中';
    else stateText = '貸出可';

    model.set('ratingText', ratingText);
    model.set('stateText', stateText);
  }
});
