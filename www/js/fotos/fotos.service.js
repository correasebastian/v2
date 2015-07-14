(function () {
	angular
	// .module('starter.services')
	.module('app.fotos')    

	.factory('fotoService', fotoService)
	fotoService.$inject=['$filter','exception', '$http' , 'logger' , 'promise'];
	function fotoService (  $filter , exception, $http, logger, promise) {

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
			getFotos:getFotos	
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

		function getFotos () {
			var data=[
					{placa:'abc',src:'http://190.145.39.138/Img/fotos/2015/julio/14/WDX857/1436902247425.jpg'},
					{placa:'def', src:'http://190.145.39.138/Img/fotos/2015/julio/14/WDX857/1436902537477.jpg'}
					]
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