

(function () {

    'use strict';

    angular
    .module('blocks.sqlite')
    .factory('Sqlite', Sqlite)
     Sqlite.$inject = ['$log', '$cordovaSQLite'];

    function Sqlite($log, $cordovaSQLite ) {

       var _db;
        var service = {
            setDb:setDb,
            execute:execute,
            insertCollection:insertCollection,
            rtnArray:rtnArray,
            db:null
            
        };

    return service;

        function setDb (dbname) {            
             service.db=$cordovaSQLite.openDB(dbname, 1);                 
         }
         
         function execute (query, binding) {
            console.log(query, binding);
             return $cordovaSQLite.execute(service.db,query, binding); 
         }

          function insertCollection (query, bindings) {
            console.log(query, bindings);
             return $cordovaSQLite.insertCollection(service.db,query, bindings); 
         }

         function rtnArray(res) {
          var array = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              array.push(res.rows.item(i));
            }
            return array;
          } 
            return array;
          
        };
    }

})(); 