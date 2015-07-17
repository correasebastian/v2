(function () {
	angular
	// .module('starter.services')
	.module('app.placas')    

	.factory('placaService', placaService)
	placaService.$inject=['$filter','exception', '$http' , 'logger' , 'promise','consultaService' , 'Sqlite', 'store'];
	function placaService (  $filter , exception, $http, logger, promise       , consultaService  ,Sqlite , store) {

	
		var placaFactory= {
			getAvengerCount:getAvengerCount	,
			getAvengersCast : getAvengersCast,
			getPlacas:getPlacas,
			insertPlaca:insertPlaca
		}
		
		//return factory object
		return placaFactory;

		//implementacion

		function getAvengerCount () {
			logger.log('-----------------------------------------' )
			logger.log(consultaService.consultas);
			
			return promise.emulate('getAvengerCount','',2000);			
		}

		function getAvengersCast () {
			return promise.emulate('getAvengersCast','',3000);			
		}

		function getPlacas () {
			//
			var query=store.get('consulta').cPlacas;//consultaService.consultas.cPlacas;
			var binding=[];
			return Sqlite.execute(query, binding)
                .then(getPlacasComplete)
                .catch(exception.catcher('llamado para obtener placas ha fallado'));
			
			function getPlacasComplete (data) {
					// function onPlacaZync () {
						var array=Sqlite.rtnArray(data);
						return array
					// }
				// return zumeroService.zync('getPlacasComplete').then(onPlacaZync)

				
				// var array=Sqlite.rtnArray(data);
				// return array;
				
			}
		}

		function insertPlaca () {
			//store.get('consulta').cPlacas;
			var query=consultaService.consultas.cInsertPlaca;
			var binding=[new Date().toISOString(), 'abc123'];
			return Sqlite.execute(query, binding)
                .then(insertPlacaComplete)
                .catch(exception.catcher('ingreso de  placa ha fallado'));
			
			function insertPlacaComplete () {				
				return true				
			}
		}


		function getProspectsFromSqlite () {
			var query='select [idProspect], [name],[lastname],[cc],[phone],[avatar] ,[state] from Prospects';
			var binding=[];

			  return Sqlite.execute(query, binding)
                .then(getProspectsCompleteFromSqlite)
                .catch(exception.catcher('llamado para obtener prospectos ha fallado'));

		}
	}
})(); 