(function() {
    'use strict';
    angular.module('blocks.identify')
    .run(identifyRun)
    identifyRun.$inject=['identifyService']

    function identifyRun (identifyService) {
    	identifyService.identifyUser();    	
    }


})();
