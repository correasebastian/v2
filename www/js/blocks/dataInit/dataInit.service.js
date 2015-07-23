
(function () {

    angular
  
    .module('blocks.dataInit')  
    .factory('dataInitService', dataInitService)

    dataInitService.$inject=[ 'logger','exception', '$http' ,'store']

    function dataInitService( logger,  exception   , $http   , store){

      // var consultas=null;
      var initURL='http://190.145.39.139/suralocalapi'
      var Factory= {
      setData:setData    
      }
    
    //return factory object
    return Factory;

      function setData () {
        return $http.get(initURL + '/api/all/roles', { params: { email: 'matricula@ajustev.com' } })
         .then(getDataInitComplete)
         .catch(exception.catcher('llamado para obtener dataInit  ha fallado'));

            function getDataInitComplete(data) {
              console.log(data);
              if (data && data.data ){
                var obj=data.data[0];
                angular.extend(obj, {zfile:'zzdbfile'})
                logger.success('dataInit ok'); 
                store.set('dataInit', obj); 
              }
                          
              return true
                           
            }         
      }
    }
})(); 

