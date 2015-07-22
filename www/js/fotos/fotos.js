  (function() {
    'use strict';

    angular
    .module('app.fotos')
    .controller('Fotos', Fotos);

    Fotos.$inject = ['$q', 'fotoService', 'logger','$ionicPopover','$ionicPopup', '$scope', '$stateParams' , 'promise', 'copyService', 'transferService', '$filter', 'widgetsService' ];

    function Fotos($q,fotoService,logger,$ionicPopover,$ionicPopup,$scope,$stateParams                      ,promise, copyService     , transferService  , $filter  ,  widgetsService) {
          // console.log(zumeroService, 'zumero service on fotos')
          /*jshint validthis: true */
          var vm = this;
          v=vm;
          filter=$filter;
          vm.idinspeccion=$stateParams.idinspeccion;
          vm.placa=$stateParams.placa;
          logger.log(vm.placa);

          vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
          };

          vm.data={
            sistemasDictamen:null,
            matriculasDictamen:null,
            placa:vm.placa
          }

          vm.dataCopy={
            sistemasDictamen:null,
            matriculasDictamen:null
          }

          vm.closePopover=closePopover;          
          vm.matriculaPopup =matriculaPopup;           
          vm.openPopover=openPopover;
          vm.setSistemas=setSistemas;
          vm.sistemasPopup = sistemasPopup;
          vm.takePic=takePic;
          vm.title = 'Fotos';
          vm.uploadFotos=uploadFotos;
          vm.zync=zync;


          preActivate();


    function preActivate () {    
      promise.existsConsulta().then(onCompleteExistsConsulta)
      function onCompleteExistsConsulta () {
       activate()
       }
     }

            // activate();

    function activate() {

      var promises = [
      getMatriculasDictamenes(),
      getSistemasDictamenes(),
      getMatriculasDictamen(),
      getSistemasDictamen(),
      getFotos(),
      setPopOver()
      
      ];
    //            Using a resolver on all routes or Fotoservice.ready in every controller
    //            return Fotoservice.ready(promises).then(function(){
      return $q.all(promises).then(function(res) {
        setData();     
        logger.info('Activated Fotos View', res);
      });
    }


    function getFotos() {
      return fotoService.getFotos(vm.idinspeccion).then(function(data) {
        vm.fotos = data;
        return vm.fotos;
      });
    }

    function setPopOver () {
      return $ionicPopover.fromTemplateUrl('js/fotos/popover.html', {scope: $scope })
      .then(function(popover) {
       vm.popover = popover;
       return vm.popover;
     });
    }

    function getSistemasDictamenes() {
      return fotoService.getSistemasDictamenes().then(function(data) {
        vm.sistemasDictamenes = data;
        return vm.sistemasDictamenes;
      });
    }

    function getMatriculasDictamenes() {
      return fotoService.getMatriculasDictamenes().then(function(data) {
        vm.matriculasDictamenes = data;
        return vm.matriculasDictamenes;
      });
    }

    function getSistemasDictamen() {
      return fotoService.getSistemasDictamen(vm.idinspeccion).then(function(data) {
              // TODO: segun el codigo encontrar el objeto en el array usando un filter puede ser
              
              if(!data){
                vm.data.sistemasDictamen =data;                
                return data;
              }
              var sistemasDictamen=$filter('filter')(vm.sistemasDictamenes, { idsistemasdictamen: data.idsistemasdictamen }, true);
              vm.data.sistemasDictamen = sistemasDictamen[0];
              return vm.data.sistemasDictamen;


            });
    }

    function getMatriculasDictamen() {
      return fotoService.getMatriculasDictamen(vm.idinspeccion).then(function(data) {
              // TODO: segun el codigo encontrar el objeto en el array usando un filter puede ser
              
              if(!data){
                vm.data.matriculasDictamen=data;
                return data;
              }
              var matriculaDictamen=$filter('filter')(vm.matriculasDictamenes, { idmatriculadictamen: data.idmatriculadictamen }, true)[0];
              vm.data.matriculasDictamen = matriculaDictamen;
              return vm.data.matriculasDictamen;
            });
    }

    function openPopover($event) {
      vm.popover.show($event);
    };

    function closePopover() {
      vm.popover.hide();
    };


    function  sistemasPopup () {  
      vm.dataCopy.sistemasDictamen= angular.copy(vm.data.sistemasDictamen);
      var myprompt = $ionicPopup.prompt({
        title: 'Sistemas',

        templateUrl: 'js/fotos/sistemas.html',
        scope: $scope,
        buttons: [
        {
          text: 'Cancel',
          onTap: function(e){
            resetData()
            // vm.data.sistemasDictamen=vm.dataCopy.sistemasDictamen;                
          }
        },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!vm.data.sistemasDictamen) {                  
              e.preventDefault();
            } else {                 
              return true;
            }
          }
        }
        ]
      });
      myprompt.then(function (placa) {
       // vm.closePopover();          
       if (placa ) {
        vm.setSistemas();
      } 
    });
    }


    function matriculaPopup () {
     vm.dataCopy.matriculasDictamen= angular.copy(vm.data.matriculasDictamen);
     var myprompt = $ionicPopup.prompt({
      title: 'Matricula',
              // template: 'Ingrese la nueva placa',
              templateUrl: 'js/fotos/matricula.html',
              scope: $scope,
              buttons: [
              {
                text: 'Cancel',
                onTap: function(e){
                  resetData()
                  // vm.data.matriculasDictamen=vm.dataCopy.matriculasDictamen;
                  // vm.closePopover();
                }
              },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!vm.data.matriculasDictamen){
                    e.preventDefault();
                    
                  } else {
                    // vm.closePopover();
                    return true;
                  }
                }
              }
              ]
            });
     myprompt.then(function (placa) {
       // vm.closePopover();          
       if (placa ) {
        setMatricula();
      } 
    });
   }

   function resetData(){
      if(vm.dataCopy.matriculasDictamen){
      var matriculaDictamen=$filter('filter')(vm.matriculasDictamenes, { idmatriculadictamen: vm.dataCopy.matriculasDictamen.idmatriculadictamen }, true)[0];
      vm.data.matriculasDictamen = matriculaDictamen;
      }
      if(vm.dataCopy.sistemasDictamen){
        
      var sistemasDictamen=$filter('filter')(vm.sistemasDictamenes, { idsistemasdictamen: vm.dataCopy.sistemasDictamen.idsistemasdictamen }, true)[0];
      vm.data.sistemasDictamen = sistemasDictamen;
      }

   }

   function setData () {
      vm.dataCopy= angular.copy(vm.data);
   }

   function setSistemas(){
    if(vm.dataCopy.sistemasDictamen){
      fotoService.updateSistemas(vm.idinspeccion,vm.data.sistemasDictamen)
      .then(function(data) { 
      setData() 
      console.log(data) 
       });

    }else{
      fotoService.setSistemas(vm.idinspeccion,vm.data.sistemasDictamen)
      .then(function(data) {  
        setData()
      console.log(data)                        
    });

    }
    

  };

  function setMatricula(){   
    if(vm.dataCopy.matriculasDictamen){
      fotoService.updateMatricula(vm.idinspeccion,vm.data.matriculasDictamen)
      .then(function(data) {  
      console.log(data) 
      setData()
       });

    }else{
      fotoService.setMatricula(vm.idinspeccion,vm.data.matriculasDictamen)
      .then(function(data) {  
        setData()
      console.log(data)                        
      });

    }
    
  };

  function takePic () {
    fotoService.takePic()
    .then(onCompleteTakePic)
    .then(copyFile)
    .then(onCompleteCopyFile)
    .then(insertFoto)
    .then(onCompleteInsertFoto)
          // .then(uploadFile)
          // .then(onCompleteUploadFile)
          // .then(updateFoto)
          // .then(onCompleteUpdateFoto)
          function onCompleteTakePic (imageURI) {
              // logger.log(imageURI)
              // vm.fotos.push({path:imageURI});
              return imageURI;
            }

            function copyFile (mediaURI) {
              return copyService.copyFile(mediaURI)
            }

            function onCompleteCopyFile (FileEntry) {
              logger.info('copiado local', FileEntry)          
              return FileEntry
            }

            function insertFoto (FileEntry) {
              angular.extend(FileEntry, {
                idinspeccion: vm.idinspeccion,
                placa: vm.placa,
                path :FileEntry.nativeURL,
                sync:0
              });

              // return fotoService.insertFoto(vm.idinspeccion, vm.placa, FileEntry)
              return fotoService.insertFoto( FileEntry)
            }

            function onCompleteInsertFoto (FileEntry) {
              var foto={idinspeccion:FileEntry.idinspeccion,placa:FileEntry.placa, path:FileEntry.path, idfoto:FileEntry.idfoto, sync:FileEntry.sync};
              vm.fotos.push(foto);
              return FileEntry;
            }

            function uploadFile (FileEntry) {

              return transferService.upload(FileEntry);
            }

            function onCompleteUploadFile (FileEntry) {
              logger.info('subido ok', FileEntry);
              return FileEntry;
            }

            function updateFoto (FileEntry) {
              return fotoService.updateFoto( FileEntry)
            }

            function onCompleteUpdateFoto (FileEntry) {
              logger.info('update ok', FileEntry);
            }


  }



          function zync () {
            fotoService.zync();
            // console.log(zumeroService);
            // zumeroService.zync('ZYNC');
          }

          function uploadFotos () {
            widgetsService.showSpinner();
            var promises=[];
            var fotos=$filter('filter')(vm.fotos, { sync: 0 }, true);
            angular.forEach(fotos, function(foto, key){
              promises.push(
                transferService.upload(foto)
                .then(onCompleteUploadFile)
                .then(updateFoto)
                .then(onCompleteUpdateFoto)
                );

              function onCompleteUploadFile (FileEntry) {
                logger.info('subido ok', FileEntry);
                return FileEntry;
              }

              function updateFoto (FileEntry) {
              //todo para evaluar si es mejor hacer el update con idinspeccion y path, por si pasa que ya se sincronizoy  cambio el idfoto
              return fotoService.updateFoto( FileEntry)
              }

              function onCompleteUpdateFoto (FileEntry) {
              logger.info('update ok', FileEntry);
              var foto = $filter('filter')(vm.fotos, { idfoto: FileEntry.idfoto }, true)[0];
              logger.log(foto);
              foto.sync=1; 
              return FileEntry;  
              } 
            
            });

            function allPromisesComplete (data) {
                console.log(data)
                 return zync();
               }
            function finallyPromises (argument) {
                 widgetsService.hideSpinner();
               }   

              return $q.all(promises).then(allPromisesComplete).finally(finallyPromises);    

            }


            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function() {
              vm.popover.remove();
            });

          }
        })();
