
(function () {

    angular
  
    .module('blocks.dataInit')  
    .factory('dataInitService', dataInitService)

    dataInitService.$inject=[ 'logger','exception', '$http' ,'store' ]

    function dataInitService( logger,  exception   , $http   , store  ){

      // var consultas=null;
      var initURL='http://190.145.39.139/suralocalapi'
      var Factory= {
      setData:setData ,
      resetDataInit:resetDataInit ,
      data:null ,
      uuid:null 
      }
    
    //return factory object
    return Factory;

      // function setData () {
      //   return $http.get(initURL + '/api/all/roles', { params: { email: 'matricula@ajustev.com' } })
      //    .then(getDataInitComplete)
      //    .catch(exception.catcher('llamado para obtener dataInit  ha fallado'));

      //       function getDataInitComplete(data) {
      //         console.log(data);
      //          var z={zfile:'zzdbfile'}
      //         if (data && data.data && data.data[0] ){               
      //           var obj={idrolsura: data.data[0].idrolsura}
      //           angular.extend(obj,z )
      //           logger.success('dataInit ok'); 
      //           store.set('dataInit', obj); 
      //         }
                          
      //         return z
                           
      //       }         
      // }

      function setData () {
        var params={
          params:{id:store.get('authorizationData').userName}
        }
        return $http.get(initURL + '/api/vw_info_inicial', params)
         .then(getDataInitComplete)
         .catch(exception.catcher('llamado para obtener dataInit  ha fallado'));

            function getDataInitComplete(data) {
              console.log(data);
               var z={zfile:'zzdbfile'}
              if (data && data.data  ){               
                var obj=data.data;
                angular.extend(obj,z )
                logger.success('dataInit ok'); 
                Factory.data=obj;
                store.set('dataInit', obj); 
              }
                          
              return z
                           
            }         
      }

      function resetDataInit () {
        store.remove('dataInit');
        return setData();
      }
    }
})(); 

