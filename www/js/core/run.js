
var z =null;
var c=null;
var s=null;
var st=null;
var w=null;
var d=null;
var ps=null;
(function() {
    

    angular.module('app.core')
    .run(coreRun)
    coreRun.$inject=['$ionicPlatform','zumeroService','Sqlite','logger', 'consultaService','store' ,'widgetsService', 'dataInitService', 'coreService' , 'pushService'];

    function coreRun($ionicPlatform,zumeroService, Sqlite, logger, consultaService, store          ,widgetsService   ,  dataInitService  , coreService  ,  pushService) {
      $ionicPlatform.ready(function() {
         if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
        
          StatusBar.styleLightContent();
        }
        z=zumeroService;
        c=consultaService;
        s=store;
        w=widgetsService;
        d=dataInitService
        ps=pushService;

        coreService.onAuth();

      

      });
  } 

})();
