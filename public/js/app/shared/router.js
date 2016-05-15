angular.module('app.router', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'js/app/posts/templates/home.html',
          controller: 'MainCtrl',
          resolve: {
            postPromise: ['posts', function(posts) {
              return posts.getAll();
            }]
          }
        })
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: 'js/app/posts/templates/posts.html',
          controller: 'PostsCtrl',
          resolve: {
            post: ['$stateParams', 'posts', function($stateParams, posts) {
              return posts.get($stateParams.id);
            }]
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: 'js/app/auth/templates/login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
              $state.go('home');
            }
          }]
        })
        .state('register', {
          url: '/register',
          templateUrl: 'js/app/auth/templates/register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
              $state.go('home');
            }
          }]
        });

      $urlRouterProvider.otherwise('home');
  }]);
