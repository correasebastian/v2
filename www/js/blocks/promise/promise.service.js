(function() {
    'use strict';

    angular
        .module('blocks.promise')
        .factory('promise', promise);

    promise.$inject=['logger','$q', '$timeout' ];

    /* @ngInject */
    function promise(logger,$q,$timeout) {
        var service = {
            emulate: emulate
        };
        return service;

        function emulate(msg,delay) {

            var deferred= $q.defer();

            $timeout(function(){
                logger.log(msg, delay);
                deferred.resolve(msg); 
            }, delay);            

            return deferred.promise;
            
        }
    }
})();