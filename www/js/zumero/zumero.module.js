(function() {
    'use strict';
    angular.module('app.zumero', [])

 .run(runZumero)

 runZumero.$inject=['$ionicPlatform','zumeroService'];

 function runZumero($ionicPlatform,zumeroService) {
	  $ionicPlatform.ready(function() {
	  	z=zumeroService;
	  	zumeroService.setZumero('zzdbfile');	  
	  });
	}

})();
