
(function () {

    angular
  
    .module('blocks.moment')  
    .factory('momentService', momentService)

    momentService.$inject=['logger','exception' ,'moment']

    function momentService( logger , exception , moment){

    
      var Factory= {
      getDateTime:getDateTime ,
      rutaSrv:rutaSrv
      }
    
    //return factory object
    return Factory;
 

    function getDateTime() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      };

    function rutaSrv(path, placa) {
      var filename = path.replace(/^.*[\\\/]/, '');
      var ruta = moment().format('YYYY/MMMM/DD/') + placa + '/' + filename;
      return ruta;
    };

  }  

  
})(); 

