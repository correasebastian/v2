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

        function emulate(msg,data,delay, error) {

            var deferred= $q.defer();

            $timeout(function(){
                logger.log(msg, delay);
                if(error){
                    deferred.reject('error on : '+ msg)

                }else{
                  deferred.resolve(data);   
                }
                
            }, delay);            

            return deferred.promise;
            
        }
    }
})();