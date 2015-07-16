
(function () {

    angular
  
    .module('app.consulta')  
    .factory('consultaService', consultaService)

    consultaService.$inject=['Sqlite', 'logger','exception']

    function consultaService(Sqlite, logger, exception){

      // var consultas=null;
      var consultaFactory= {
      setConsulta:setConsulta ,
      consultas:null    
      }
    
    //return factory object
    return consultaFactory;

      function setConsulta () {
        var query='SELECT [idconsulta]  ,[cSistemasDictamenes],[cMatriculasDictamenes]  FROM [consultasSqlite]';
        var binding=[];  

        return Sqlite.execute(query, binding)
                .then(getConsultaCompleteFromSqlite)
                .catch(exception.catcher('llamado para obtener consultas iniciales ha fallado'));

            function getConsultaCompleteFromSqlite(data) {
              var object=Sqlite.rtnArray(data)[0];
              console.log(object);
              consultaFactory.consultas=object;
              // return setProspects(array);              
            }         
      }
    }
})(); 

