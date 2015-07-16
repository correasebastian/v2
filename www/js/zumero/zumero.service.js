
(function () {

    angular
  
    .module('app.zumero')  
    .factory('zumeroService', zumeroService)

    zumeroService.$inject=['$q','$timeout','$interval','$cordovaDevice','$cordovaSQLite']

    function zumeroService($q,$timeout,$interval,$cordovaDevice, $cordovaSQLite){

      var zumero=null;
      var zumeroFactory= {
      setZumero:setZumero ,
      zync:zync     
      }
    
    //return factory object
    return zumeroFactory;

 

    function setZumero(dbfile) {
      zumeroFactory.dbfile = dbfile;
      zumeroFactory.dbfileComplete = zumeroFactory.dbfile + '.db';
      //open db con sqliteplugin brody
      db = $cordovaSQLite.openDB(zumeroFactory.dbfileComplete, 1);
      zumero = cordova.require('cordova/plugin/zumero');
      // zumeroFactory.server = ngAuthSettings.apiServiceBaseUri + ':8080/';
      zumeroFactory.server = 'http://190.145.39.139:8080/';
      zumeroFactory.packageName = 'com.ajustev.sula.v2';
      setDbPath();
    }

    function setDbPath () {
      var _options = {
        Android: '/data/data/' + zumeroFactory.packageName + '/databases/' + zumeroFactory.dbfileComplete,
        iOS: 'cdvfile://localhost/persistent/' + zumeroFactory.dbfileComplete,
        win32nt: '/' + zumeroFactory.dbfileComplete
      };
      zumeroFactory.dbpath = _options[$cordovaDevice.getPlatform()];
    }

    function zync(i){
      console.time('zync' + i);

      zumero.sync(zumeroFactory.dbpath, '', zumeroFactory.server, zumeroFactory.dbfile, '{ "scheme_type": "table", "table": "users" }', 'sebastian', 'Siva.2014*', onZyncComplete
                  , onZyncError);

            function onZyncComplete() {
              console.log('ok');
              console.timeEnd('zync' + i);
              $q.when('zync ok')
         
            }

            function onZyncError (error) {
              exception.catcher('llamado para obtener prospectos ha fallado')(error)
            }

      }

    }









      

  
})(); 

