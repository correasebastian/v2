(function() {
    'use strict';
    angular.module('blocks.identify')
    .run(identifyRun)
    identifyRun.$inject=['identifyService', 'store']

    function identifyRun (identifyService , store) {
  //   	if(!store.get('pushToken')){
		// 		identifyService.identifyUser(); 
		// }
    	   	
    }


})();
