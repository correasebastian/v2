(function () {
	angular
	// .module('starter.services')
	.module('app.fotos')    

	.factory('fotoService', fotoService)
	fotoService.$inject=['$filter','exception', '$http' , 'logger' , 'promise', '$q'  , 'store', 'Sqlite', 'zumeroService', '$cordovaCamera'];
	function fotoService (  $filter , exception, $http, logger, promise,         $q    ,  store,   Sqlite, zumeroService  ,  $cordovaCamera) {

		

		var placaFactory= {
			getAvengerCount:getAvengerCount	,
			getAvengersCast : getAvengersCast,
			getFotos:getFotos,
			getSistemasDictamenes:getSistemasDictamenes,
			getMatriculasDictamenes:getMatriculasDictamenes,
			getSistemasDictamen:getSistemasDictamen,
			getMatriculasDictamen:getMatriculasDictamen,
			setSistemas:setSistemas,
			setMatricula:setMatricula,
			takePic:takePic,
			zync:zync

		}
		
		//return factory object
		return placaFactory;

		//implementacion
		function zync () {
			console.log(zumeroService)
			zumeroService.zync('on fotos');
		}

		function takePic() {	
	      var options = {
	        quality: 45,
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
		      function onCompleteTakePic (imageURI) {	      	
		        return imageURI;	      
		      }
		     
	    };

		function getAvengerCount () {
			return promise.emulate('getAvengerCount','',2000);			
		}

		function getAvengersCast () {
			return promise.emulate('getAvengersCast','',3000);			
		}

		function getFotos (idinspeccion) {
			//
			var query=store.get('consulta').cFotos;//consultaService.consultas.cPlacas;
			var binding=[idinspeccion];
			return Sqlite.execute(query, binding)
                .then(getFotosComplete)
                .catch(exception.catcher('llamado para obtener fotos ha fallado'));
			
			function getFotosComplete (data) {					
				var array=Sqlite.rtnArray(data);
				return array				
			}
		}


		function getProspectsFromSqlite () {
			var query='select [idProspect], [name],[lastname],[cc],[phone],[avatar] ,[state] from Prospects';
			var binding=[];

			  return Sqlite.execute(query, binding)
                .then(getProspectsCompleteFromSqlite)
                .catch(exception.catcher('llamado para obtener prospectos ha fallado'));

		}

		function getSistemasDictamenes () {
			var data=[
				    { label: 'cod1', value: 1 ,class:'positive' },
				    { label: 'cod2', value: 2 ,class:'assertive'},
				    { label: 'cod3', value: 3,class:'positive' },
				    { label: 'cod4', value: 4, class:'positive'},
				    { label: 'cod5', value: 5 , class:'positive' },
				    { label: 'cod6', value: 6 , class:'positive' }
				  ];
			return promise.emulate('getSistemasDictamen',data,3000);			
		}

	function getMatriculasDictamenes () {
			var data=[
					    { label: 'mat1', value: 1 ,class:'positive' },
					    { label: 'mat2', value: 2 ,class:'positive'},
					    { label: 'mat3', value: 3 ,class:'positive'},
					    { label: 'mat4', value: 4 ,class:'positive' },
					    { label: 'mat5', value: 5  ,class:'positive' },
					    { label: 'mat6', value: 6 ,class:'positive' }
					  ];
		return promise.emulate('getMatriculasDictamenes',data,3000);			
	}

	function getSistemasDictamen () {
			var data=[
				    { label: 'cod1', value: 1 ,class:'positive' },
				    { label: 'cod2', value: 2 ,class:'assertive'},
				    { label: 'cod3', value: 3,class:'positive' },
				    { label: 'cod4', value: 4, class:'positive'},
				    { label: 'cod5', value: 5 , class:'positive' },
				    { label: 'cod6', value: 6 , class:'positive' }
				  ];
			return promise.emulate('getSistemasDictamen',data[0],3000);			
		}

	function getMatriculasDictamen () {
			var data=[
					    { label: 'mat1', value: 1 ,class:'positive' },
					    { label: 'mat2', value: 2 ,class:'positive'},
					    { label: 'mat3', value: 3 ,class:'positive'},
					    { label: 'mat4', value: 4 ,class:'positive' },
					    { label: 'mat5', value: 5  ,class:'positive' },
					    { label: 'mat6', value: 6 ,class:'positive' }
					  ];
		return promise.emulate('getMatriculasDictamenes',data[1],3000);			
	}


    function setSistemas() {
            var data = 1;
            return promise.emulate('setSistemas',data,3000, false)
                .then(setSistemasComplete)
                .catch(exception.catcher('XHR Failed for setSistemas'));

            function setSistemasComplete (data) {
                data += data;
                return $q.when(data);
            }
        }

    function setMatricula() {
            var data = 1;
            return promise.emulate('setMatricula',data,3000, false)
                .then(setMatriculaComplete)
                .catch(exception.catcher('XHR Failed for setMatricula'));

            function setMatriculaComplete (data) {
                data += data;
                return $q.when(data);
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