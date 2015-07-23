
(function () {

    angular
  
    .module('app.ajustes')  
    .factory('ajustesService', ajustesService)

    ajustesService.$inject=[ 'logger','exception']

    function ajustesService( logger, exception){

      // var consultas=null;
      var Factory= {
      setConsulta:setConsulta    
      }
    
    //return factory object
    return Factory;

      function setConsulta () {
        var query='SELECT *  FROM [consultasSqlite]';
        var binding=[];  

        return Sqlite.execute(query, binding)
                .then(getConsultaCompleteFromSqlite)
                .catch(exception.catcher('llamado para obtener consultas iniciales ha fallado'));

            function getConsultaCompleteFromSqlite(data) {
              var object=Sqlite.rtnArray(data)[0];
              logger.success('consultainicial ok');
              consultaFactory.consultas=object;
              return consultaFactory.consultas;
              // return setProspects(array);              
            }         
      }
    }
})(); 

