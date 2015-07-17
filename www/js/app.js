// Ionic Starter App

var v=null;

(function () {
   
   angular.module('starter', [ 
  'app.core',  
  'app.placas',
  'app.fotos',  
  'app.consulta', 
 ])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '6d5a8318',
    // The public API key all services will use for this app
    api_key: '16ee09dd4098ccebc97e6c4b35083ee3aa8ebb1f5a0180a5',
    // Set the app to use development pushes
    // dev_push: true
    // ,
    // The GCM project number
    gcm_id: '237781718403'
  });
}])



.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'js/placas/tab-placas.html',
        controller: 'Placas as PCtrl',
        // resolve: {
        //         moviesPrepService: moviesPrepService
        //     }
        // });
      }
    }
  })
    .state('tab.placas', {
            url: '/placas',
            views: {
              'tab-placas': {
                templateUrl: 'js/placas/tab-placas.html',
                controller: 'Placas as PCtrl'
              }
            }
          })

  .state('tab.chats', {
      url: '/chats',
     views: {
      'tab-chats': {
        templateUrl: 'js/placas/tab-placas.html',
        controller: 'Placas as PCtrl'
      }
    }
    })
    .state('tab.chat-detail', {
      url: '/chats/:placa',
       views: {
        'tab-chats': {
          templateUrl: 'js/fotos/tab-fotos.html',
          controller: 'Fotos as FCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})



})(); 
