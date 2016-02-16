/**
 * BooksModel
 */
App.BooksModel = Backbone.Model.extend({
  parseView: function() {
    var
      detail = this.get('detail'),
      rating = detail.rating,
      starCount, halfStarCount, noStartCount,
      i,
      star = '',
      ratingText = '';

    if (rating >= 0) {

      starCount = Math.floor(rating / 2);
      halfStarCount = rating % 2;
      noStartCount = 5 - starCount - halfStarCount;

      for (i = starCount; i--;) star += '<i class="fa fa-star"></i>';
      for (i = halfStarCount; i--;) star += '<i class="fa fa-star-half-o"></i>';
      for (i = noStartCount; i--;) star += '<i class="fa fa-star-o"></i>';

      this.set('ratingStar', star);

      if (rating > 8) ratingText = '非常に好評';
      else if (rating > 6) ratingText = '好評';
      else if (rating > 4) ratingText = '賛否両論';
      else if (rating > 2) ratingText = '不評';
      else if (rating > 0) ratingText = '非常に不評';
      else ratingText = '評価無し';

      this.set('ratingText', ratingText);
    }

    this.set('borrowable', detail.bookStatus.id !== 1);
  }
});

/**
 * BooksCollection
 */
App.BooksCollection = Backbone.Collection.extend({
  model: App.BooksModel,
  url: 'http://localhost:3000/api/books',
  initialize: function() {
    this.on('add', this.onAdd);
  },
  onAdd: function(model) {
    model.parseView();
  }
});
