
var z =null;
(function() {
    'use strict';

    angular.module('app.core')
    .run(coreRun)
    coreRun.$inject=['$ionicPlatform','zumeroService','Sqlite','logger'];

    function coreRun($ionicPlatform,zumeroService, Sqlite, logger) {
      $ionicPlatform.ready(function() {
         if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
        
          StatusBar.styleLightContent();
        }
        z=zumeroService;
        zumeroService.setZumero('zzdbfile');        
        Sqlite.setDb(zumeroService.dbfileComplete);
        zumeroService.zync(1).then(onFirstZync) 

        function onFirstZync () {
              logger.success('onFirstZync')
           }   



      });
  } 

})();
