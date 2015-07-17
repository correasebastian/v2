(function() {
    'use strict';

    angular.module('blocks.sendPush', [])
     .run(runSqlite)

 runSqlite.$inject=['$ionicPlatform','Sqlite'];

 function runSqlite($ionicPlatform,Sqlite) {
	  $ionicPlatform.ready(function() {
	  	// Sqlite.setConsultas();	  
	  });
	}

})();