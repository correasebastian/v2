(function() {
    'use strict';

    angular
        .module('blocks.promise')
        .factory('promise', promise);

    promise.$inject=['logger','$q', '$timeout' ,'store' , '$interval','Sqlite'];

    /* @ngInject */
    function promise(logger, $q ,    $timeout , store , $interval, Sqlite) {
        var service = {
            emulate: emulate,
            existsConsulta:existsConsulta
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

        function existsConsulta () {
            var deferred= $q.defer();
            var n=1;
              if (store.get('consulta') && store.get('dataInit') && Sqlite.db){
                        deferred.resolve(true);
                    }
                else {
                     var interval=$interval(
                        function  () {
                        n +=1;
                        // logger.info(n);
                        if (store.get('consulta') && Sqlite.db){                                        
                                $interval.cancel(interval);
                                 deferred.resolve(true);
                            }                             
                     }, 500)

                }
            
             return deferred.promise;
        }
    }
})();