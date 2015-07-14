(function () {
	angular
	// .module('starter.services')
	.module('app.placas')    

	.factory('placaService', placaService)
	placaService.$inject=['$filter','exception', '$http' , 'logger' , 'promise'];
	function placaService (  $filter , exception, $http, logger, promise) {

		var states=[
					{state:0, clase:'ion-clock', label:'pendiente'},
					{state:1, clase:'ion-thumbsup', label:'aprobado'},
					{state:2, clase:'ion-happy-outline', label:'aceptado'},
					{state:3, clase:'ion-thumbsdown', label:'rechazado'},
					{state:4, clase:'ion-sad-outline', label:'deshabilitado'}
					];

		var placaFactory= {
			getAvengerCount:getAvengerCount	,
			getAvengersCast : getAvengersCast,
			getPlacas:getPlacas	
		}
		
		//return factory object
		return placaFactory;

		//implementacion

		function getAvengerCount () {
			return promise.emulate('getAvengerCount','',2000);			
		}

		function getAvengersCast () {
			return promise.emulate('getAvengersCast','',3000);			
		}

		function getPlacas () {
			var data=[{placa:'abc'}, {placa:'def'}]
			return promise.emulate('getAvengersCast',data,3000);			
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