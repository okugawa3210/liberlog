'use strict';
var App = new Marionette.Application();

App.addInitializer(function() {
  console.log('run initializer');

  // router
  new App.Router({
    controller: App.Controller
  });

  // region
  this.addRegions({
    pageMain: '#page-main'
  });
});

App.onStart = function() {
  Backbone.history.start({
    pushState: true,
    root: '/'
  });
};

$(function() {
  App.start();

  $('[name="/error"]').on('click', function() {
    Backbone.history.navigate('/error', true);
  });
});

/**
 * Test
 */
Liberlog.Data = {
  Tags: [{
    id: 1,
    name: 'プログラム'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'HTML5'
  }],
  Books: [{
    id: 1,
    title: '3ステップでしっかり学ぶ JavaScript入門 (今すぐ使えるかんたんプラス)',
    tags: [{
      id: 1,
      name: 'プログラム'
    }, {
      id: 2,
      name: 'JavaScript'
    }],
    author: '大津 真',
    publisher: '技術評論社',
    publicationAt: '2010/06/04',
    registrant: '鈴木 一郎',
    registerAt: '2015/12/23',
    rating: 5,
    views: 4,
    state: 1,
    borrower: '田中 太郎',
    returnAt: '2016/01/13'
  }, {
    id: 2,
    title: '徹底解説HTML5マークアップガイドブック',
    tags: [{
      id: 1,
      name: 'プログラム'
    }, {
      id: 3,
      name: 'HTML5'
    }],
    author: '羽田野太巳',
    publisher: '秀和システム',
    publicationAt: '2010/2/26',
    registrant: '鈴木 一郎',
    registerAt: '2015/12/23',
    rating: 10,
    views: 1,
    state: 0,
    borrower: '',
    returnAt: ''
  }, {
    id: 3,
    title: '入門 HTML5',
    tags: [{
      id: 1,
      name: 'プログラム'
    }, {
      id: 3,
      name: 'HTML5'
    }],
    author: 'Mark Pilgrim',
    publisher: 'オライリージャパン',
    publicationAt: '2011/4/23',
    registrant: '鈴木 一郎',
    registerAt: '2015/12/23',
    rating: 0,
    views: 0,
    state: 0,
    borrower: '',
    returnAt: ''
  }]
};
