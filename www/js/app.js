// Ionic Starter App

var v=null;
var filter=null;

(function () {
   
   angular.module('starter', [ 
  'app.core',  
  'app.placas',
  'app.fotos',  
  'app.consulta', 
  'app.ajustes',
  'app.login'
 ])

.config(['$ionicAppProvider','$ionicConfigProvider', function($ionicAppProvider, $ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');
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

  .state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'Login as LCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache: false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'js/placas/tab-placas.html',
        controller: 'Placas as PCtrl'
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
    cache: false,
      url: '/chats',
     views: {
      'tab-chats': {
        templateUrl: 'js/placas/tab-placas.html',
        controller: 'Placas as PCtrl'
      }
    }
    })
    .state('tab.chat-detail', {
      cache: false,
      url: '/chats/:idinspeccion/:placa',
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
        templateUrl: 'js/ajustes/tab-account.html',
        controller: 'Ajustes as ACtrl'
      }
    }
  });

  $stateProvider.state("otherwise", {
            url: "*path",
            template: "",
            controller: [
                      '$state',
              function($state) {
                $state.go('login')
              }]
        });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/login');

})
.run( ['store', '$rootScope', 'logger', '$timeout', '$state', function(store, $rootScope, logger , $timeout , $state) {

   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      
      // console.log(event, toState, toParams, fromState, fromParams);
      var authData = store.get('authorizationData');
      // console.log(authData, toState.name )
      if (toState.name === 'login') { 
          // logger.info('state signing')  
          
           if (!authData ){
            // logger.info('no identificado  state signing')  
              return;
           }
           else{
            event.preventDefault();
            // logger.info('hacia palcas  state signing')
            $timeout(function () {                  
              $state.go('tab.dash');  //event.preventDefault(); //Nice addition! Can't do any redirect when it's called though
            }, 0);

           }
      }
      // console.log(authData, momentService.diffNow(authData.exp, 'm'), '> -60');
      if (!authData ) {
        event.preventDefault();
        $timeout(function () {
          // console.log('redirect'); 
          $state.go('login');  //event.preventDefault(); //Nice addition! Can't do any redirect when it's called though
        }, 0);
      }
    });
  
}])



})(); 
