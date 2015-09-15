(function() {
	angular
	// .module('starter.services')
	.module('app.fotos')

	.factory('fotoService', fotoService)
	fotoService.$inject = ['$filter', 'exception', '$http', 'logger', 'promise', '$q', 'store', 'Sqlite', 'zumeroService', '$cordovaCamera', 'momentService', 'dataInitService'];

	function fotoService($filter, exception, $http, logger, promise, $q, store, Sqlite, zumeroService, $cordovaCamera, momentService, dataInitService) {



		var placaFactory = {

			getFotos: getFotos,
			getFotosHttp: getFotosHttp,
			getSistemasDictamenes: getSistemasDictamenes,
			getMatriculasDictamenes: getMatriculasDictamenes,
			getNames: getNames,
			getSistemasDictamen: getSistemasDictamen,
			getMatriculasDictamen: getMatriculasDictamen,
			insertFoto: insertFoto,
			setSistemas: setSistemas,
			setMatricula: setMatricula,
			takePic: takePic,
			updateFoto: updateFoto,
			updateFotos: updateFotos,
			updateMatricula: updateMatricula,
			updateSistemas: updateSistemas,
			zync: zync

		}

		//return factory object
		return placaFactory;

		//implementacion
		function zync() {
			// console.log(zumeroService)
			zumeroService.zync('on fotos');
		}

		function takePic() {
			var options = {
				quality: 65,
				//50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA,
				// allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 1000,
				//importante con 100 se veia horrible
				targetHeight: 1000,
				// si le pongo true me crea problemas
				saveToPhotoAlbum: false
			};
			return $cordovaCamera.getPicture(options).then(onCompleteTakePic)
				.catch(exception.catcher('error tomando foto'));

			function onCompleteTakePic(imageURI) {
				return imageURI;
			}

		};


		function getFotos(idinspeccion) {
			//
			var query = store.get('consulta').cFotos; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion, dataInitService.uuid];
			return Sqlite.execute(query, binding)
				.then(getFotosComplete)
				.catch(exception.catcher('llamado para obtener fotos ha fallado'));

			function getFotosComplete(data) {
				var array = Sqlite.rtnArray(data);
				return array
			}
		}

		function getFotosHttp(idinspeccion) {
			//
			var query = store.get('consulta').cFotosHttp; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion, dataInitService.uuid];
			return Sqlite.execute(query, binding)
				.then(getFotosComplete)
				.catch(exception.catcher('llamado para obtener fotos HTTP ha fallado'));

			function getFotosComplete(data) {
				var array = Sqlite.rtnArray(data);
				return array
			}
		}

		function getNames() {
			var query = store.get('consulta').cGetNameFotosByRol; //consultaService.consultas.cPlacas;
			var binding = [store.get('dataInit').idrolsura];
			return Sqlite.execute(query, binding)
				.then(getNamesComplete)
				.catch(exception.catcher('llamado para obtener nombres de fotos ha fallado'));

			function getNamesComplete(data) {
				var array = Sqlite.rtnArray(data);
				return array
			}

		}

		// function insertFoto ( idinspeccion,placa, FileEntry) {
		function insertFoto(FileEntry) {
			// var sync=0;
			var query = store.get('consulta').cInsertFotos; //consultaService.consultas.cPlacas;
			var binding = [FileEntry.idinspeccion, FileEntry.placa, FileEntry.path,
				FileEntry.sync, FileEntry.idtipo.idTipoFoto,
				momentService.getDateTime(), dataInitService.uuid,
				FileEntry.rutaSrv
			];
			return Sqlite.execute(query, binding)
				.then(insertFotoComplete)
				.catch(exception.catcher('insertar  foto sqlite ha fallado'));

			function insertFotoComplete(data) {
				logger.success('foto almacenada', data)
				angular.extend(FileEntry, {
					idfoto: data.insertId
				});
				return FileEntry;
			}
		}

		function updateFoto(FileEntry) {
			var sync = 1;
			var query = store.get('consulta').cUpdateFoto; //consultaService.consultas.cPlacas;
			var binding = [sync, FileEntry.idfoto];
			return Sqlite.execute(query, binding)
				.then(updatetFotoComplete)
				.catch(exception.catcher('update  foto sqlite ha fallado'));

			function updatetFotoComplete(data) {
				if (!data.rowsAffected) {
					console.log('Nothing was updated');
				} else {
					console.log(data.rowsAffected);
					console.log('update successful');
				}
				console.log(data)
					// logger.success('update sqlite')				
				return FileEntry;
			}
		}

		function updateFotos(binding) {
			var query = store.get('consulta').cUpdateFoto2; //consultaService.consultas.cPlacas;
			// var binding=[sync, FileEntry.idfoto];
			// return Sqlite.insertCollection(query, bindings)
			return Sqlite.execute(query, binding)
				.then(updateFotosComplete)
				.catch(exception.catcher('update  fotos sqlite ha fallado'));

			function updateFotosComplete(data) {
				console.log(data)
				if (!data.rowsAffected) {
					console.log('Nothing was updated');
				} else {
					console.log(data.rowsAffected);
					console.log('update successful');
				}
				// logger.success('update sqlite', data)				
				// return FileEntry;	
				return data;
			}
		}


		function getProspectsFromSqlite() {
			var query = 'select [idProspect], [name],[lastname],[cc],[phone],[avatar] ,[state] from Prospects';
			var binding = [];

			return Sqlite.execute(query, binding)
				.then(getProspectsCompleteFromSqlite)
				.catch(exception.catcher('llamado para obtener prospectos ha fallado'));

		}

		function getSistemasDictamenes() {
			var query = store.get('consulta').cSistemasDictamenes; //consultaService.consultas.cPlacas;
			var binding = [];
			return Sqlite.execute(query, binding)
				.then(getSistemasDictamenesComplete)
				.catch(exception.catcher('llamado para obtener SistemasDictamenes ha fallado'));

			function getSistemasDictamenesComplete(data) {
				var array = Sqlite.rtnArray(data)
				return array
			}
		}

		function getMatriculasDictamenes() {
			var query = store.get('consulta').cMatriculasDictamenes; //consultaService.consultas.cPlacas;
			var binding = [];
			return Sqlite.execute(query, binding)
				.then(getMatriculasDictamenesComplete)
				.catch(exception.catcher('llamado para obtener MatriculasDictamenes ha fallado'));

			function getMatriculasDictamenesComplete(data) {
				var array = Sqlite.rtnArray(data)
				return array
			}
		}

		function getSistemasDictamen(idinspeccion) {
			var query = store.get('consulta').cSistemasDictamen; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion];
			return Sqlite.execute(query, binding)
				.then(getSistemasDictamenComplete)
				.catch(exception.catcher('llamado para obtener SistemasDictamen ha fallado'));

			function getSistemasDictamenComplete(data) {
				var array = Sqlite.rtnArray(data)
				var obj = null;
				if (array.length > 0) {
					obj = array[0]
					return obj
				}
				return obj;

			}
		}

		function getMatriculasDictamen(idinspeccion) {
			var query = store.get('consulta').cMatriculasDictamen; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion];
			return Sqlite.execute(query, binding)
				.then(getMatriculasDictamenComplete)
				.catch(exception.catcher('llamado para obtener matricula Dictamen ha fallado'));

			function getMatriculasDictamenComplete(data) {
				var array = Sqlite.rtnArray(data)
				var obj = null;
				if (array.length > 0) {
					obj = array[0]
					return obj
				}
				return obj;
			}
		}


		function setSistemas(idinspeccion, sistemasDictamen) {
			// var sync=0;
			var query = store.get('consulta').cInsertSistemas; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion, sistemasDictamen.idsistemasdictamen, momentService.getDateTime(), store.get('authorizationData').userName];
			return Sqlite.execute(query, binding)
				.then(insertSistemasComplete)
				.catch(exception.catcher('insertar  sistema sqlite ha fallado'));

			function insertSistemasComplete(data) {
				logger.success('calificacion insertada', data)
				return data;
			}
		}


		function updateSistemas(idinspeccion, sistemasDictamen) {
			// var sync=0;
			var query = store.get('consulta').cUpdateSistemas; //consultaService.consultas.cPlacas;
			var binding = [sistemasDictamen.idsistemasdictamen, idinspeccion];
			return Sqlite.execute(query, binding)
				.then(updateSistemasComplete)
				.catch(exception.catcher('update  sistema sqlite ha fallado'));

			function updateSistemasComplete(data) {
				logger.success('update sistema sqlite', data)
				return data;
			}
		}

		function setMatricula(idinspeccion, matriculaDictamen) {
			var query = store.get('consulta').cInsertMatricula; //consultaService.consultas.cPlacas;
			var binding = [idinspeccion, matriculaDictamen.idmatriculadictamen, momentService.getDateTime(), store.get('authorizationData').userName];
			return Sqlite.execute(query, binding)
				.then(insertMatriculaComplete)
				.catch(exception.catcher('insertar  matricula sqlite ha fallado'));

			function insertMatriculaComplete(data) {
				logger.success('matricula insertada', data)
				return data;
			}
		}

		function updateMatricula(idinspeccion, matriculaDictamen) {
			// var sync=0;
			var query = store.get('consulta').cUpdateMatricula; //consultaService.consultas.cPlacas;
			var binding = [matriculaDictamen.idmatriculadictamen, idinspeccion];
			return Sqlite.execute(query, binding)
				.then(updateMatriculaComplete)
				.catch(exception.catcher('update  matricula sqlite ha fallado'));

			function updateMatriculaComplete(data) {
				logger.success('update matricula sqlite', data)
				return data;
			}
		}

		//    $http.get('/my-url-that-does-not-exist')
		//    .then(function(results) {
		// }, function(error) {
		//   return 'my-immediate-value';
		// }).then(function(results) {
		//   // results === 'my-immediate-value'
		// })



	}
})();