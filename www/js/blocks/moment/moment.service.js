
(function () {

    angular
  
    .module('blocks.moment')  
    .factory('momentService', momentService)

    momentService.$inject=['logger','exception' ,'moment']

    function momentService( logger , exception , moment){

    
      var Factory= {
      getDateTime:getDateTime 
      }
    
    //return factory object
    return Factory;
 

    function getDateTime() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      };

  }  

  
})(); 

