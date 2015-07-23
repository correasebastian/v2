(function() {
    'use strict';

    angular
        .module('blocks.filter')
        .factory('filterService', filterService);

    filterService.$inject=['logger', '$filter'];

    /* @ngInject */
    function filterService(logger, $filter) {
        var factory = {
            rtnArray:rtnArray,
            rtnFirstObject:rtnFirstObject,
            rmObjFromArray:rmObjFromArray
           
        };
        return factory;

        function rtnArray (array, obj) {
            console.log(array, obj);
          var array =  $filter('filter')(array, obj, true);
          if (array && array.length) {
                 return array                
            }
            return null;
            
        }
        
        function rtnFirstObject (array, obj) {
            console.log(array, obj);
            var array =  $filter('filter')(array, obj, true);
            var obj=null;
            if (array && array.length) {
                 obj = array[0];                
            }
            return obj
        }

        function rmObjFromArray(array, filterObj) {
          var subArray = $filter('filter')(array, filterObj, true);
          // $log.debug(subArray);
          if ( subArray && subArray.length) {
            var obj = subArray[0];
            if (obj.cantidad > 0) {
              var index = array.indexOf(obj);
              array.splice(index, 1);
            }
          }
        }

     
    }
})();