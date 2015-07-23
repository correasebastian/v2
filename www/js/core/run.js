
var z =null;
var c=null;
var s=null;
var st=null;
var w=null;
var d=null;
(function() {
    

    angular.module('app.core')
    .run(coreRun)
    coreRun.$inject=['$ionicPlatform','zumeroService','Sqlite','logger', 'consultaService','store' ,'widgetsService', 'dataInitService'];

    function coreRun($ionicPlatform,zumeroService, Sqlite, logger, consultaService, store          ,widgetsService   ,  dataInitService) {
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

        function setZumero () {
            zumeroService.setZumero(store.get('dataInit').zfile);
            // zumeroService.setZumero('zzdbfile');
            Sqlite.setDb(zumeroService.dbfileComplete);
            zumeroService.zync(1).then(onFirstZync) 

            function onFirstZync () {
                  logger.success('onFirstZync');
                  if(!store.get('consulta')){
                    consultaService.setConsulta().then(onSetConsultas);
                    }
                  }                  

            function onSetConsultas  () {
                   logger.success('setconsultas ok');
                   store.set('consulta', consultaService.consultas);
                 } 
        }  

        if(store.get('dataInit')){
          setZumero(); 
        }
        else{
          dataInitService.setData()
          .then(onSetDataComplete)

          function onSetDataComplete (data) {
            setZumero();
          }
        }

               
        
        if(store.get('consulta')){
            // console.log(store.get('consulta'));
            consultaService.consultas=store.get('consulta');
            // console.log(consultaService.consultas)
            }

      });
  } 

})();
