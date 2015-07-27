  (function() {
    'use strict';

    angular
    .module('app.fotos')
    .controller('Fotos', Fotos);

    Fotos.$inject = ['$q', 'fotoService', 'logger','$ionicPopover','$ionicPopup', '$scope', '$stateParams' , 'promise', 'copyService', 'transferService', 'filterService', 'widgetsService' ,'$ionicModal' , 'sendPush'];

    function Fotos($q,fotoService,logger,$ionicPopover,$ionicPopup,$scope,$stateParams                      ,promise, copyService     , transferService  , filterService  ,  widgetsService  , $ionicModal  ,  sendPush) {
          // console.log(zumeroService, 'zumero service on fotos')
          /*jshint validthis: true */
          var vm = this;
          v=vm;
          // filter=$filter;
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
          vm.closeModal =closeModal;  
          vm.fotosFalt=[];       
          vm.matriculaPopup =matriculaPopup;
          vm.names=[];           
          vm.openPopover=openPopover;
          vm.openModal=openModal;
          vm.setIdTipoFoto=setIdTipoFoto;
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
      getNames(),
      setPopOver(),
      setModal()
      
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

    function setIdTipoFoto(tipoFoto) {        
        vm.idtipo = tipoFoto;
        closeModal();
        takePic();
    };

    function getNames () {
      
        return fotoService.getNames().then(getNamesComplete);

         function getNamesComplete (data) {
          vm.names = data;            
          angular.copy(vm.names, vm.fotosFalt);
          angular.forEach(vm.fotos, function (obj, key) {
          removeFromfaltantes(obj);
          });
   
          return vm.names;
        }

    }

    function removeFromfaltantes (obj) {
      var filterObj = { idTipoFoto: obj.idtipo };
      filterService.rmObjFromArray(vm.fotosFalt, filterObj);
    }


    function setModal (argument) {
      return $ionicModal.fromTemplateUrl('js/fotos/fotoModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(completeModal);

      function completeModal (modal) {
        vm.modal = modal;   
        return vm.modal;     
      }
    }

    function openModal () {
      vm.modal.show();
    }
    function closeModal  () {
      vm.modal.hide()
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
              var obj={ idsistemasdictamen: data.idsistemasdictamen };
              vm.data.sistemasDictamen = filterService.rtnFirstObject(vm.sistemasDictamenes, obj)
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
              var obj={ idmatriculadictamen: data.idmatriculadictamen };              
              vm.data.matriculasDictamen = filterService.rtnFirstObject(vm.matriculasDictamenes, obj)
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
      var obj= { idmatriculadictamen: vm.dataCopy.matriculasDictamen.idmatriculadictamen }      
      vm.data.matriculasDictamen =  filterService.rtnFirstObject(vm.matriculasDictamenes, obj)
      }
      if(vm.dataCopy.sistemasDictamen){
      var obj=  { idsistemasdictamen: vm.dataCopy.sistemasDictamen.idsistemasdictamen }      
      vm.data.sistemasDictamen = filterService.rtnFirstObject(vm.sistemasDictamenes, obj)
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
              // logger.info('copiado local', FileEntry)          
              return FileEntry
            }

            function insertFoto (FileEntry) {
              angular.extend(FileEntry, {
                idinspeccion: vm.idinspeccion,
                placa: vm.placa,
                path :FileEntry.nativeURL,
                sync:0,
                idtipo:vm.idtipo
              });

              // return fotoService.insertFoto(vm.idinspeccion, vm.placa, FileEntry)
              return fotoService.insertFoto( FileEntry)
            }

            function onCompleteInsertFoto (FileEntry) {
              var foto={idinspeccion:FileEntry.idinspeccion,placa:FileEntry.placa, path:FileEntry.path, idfoto:FileEntry.idfoto, sync:FileEntry.sync, idtipo: FileEntry.idtipo.idTipoFoto};
              vm.fotos.push(foto);
              removeFromfaltantes(foto)
              return FileEntry;
            }

            function uploadFile (FileEntry) {

              return transferService.upload(FileEntry);
            }

            function onCompleteUploadFile (FileEntry) {
              // logger.info('subido ok', FileEntry);
              return FileEntry;
            }

            function updateFoto (FileEntry) {
              return fotoService.updateFoto( FileEntry)
            }

            function onCompleteUpdateFoto (FileEntry) {
              // logger.info('update ok', FileEntry);
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
            var obj ={ sync: 0 }
            var fotos=filterService.rtnArray(vm.fotos, obj);
            angular.forEach(fotos, function(foto, key){
              promises.push(
                transferService.upload(foto)
                .then(onCompleteUploadFile)
                .then(updateFoto)
                .then(onCompleteUpdateFoto)
                );

              function onCompleteUploadFile (FileEntry) {
                // logger.info('subido ok', FileEntry);
                return FileEntry;
              }

              function updateFoto (FileEntry) {
              //todo para evaluar si es mejor hacer el update con idinspeccion y path, por si pasa que ya se sincronizoy  cambio el idfoto
              return fotoService.updateFoto( FileEntry)
              }

              function onCompleteUpdateFoto (FileEntry) {
              // logger.info('update ok', FileEntry);
              var obj={ idfoto: FileEntry.idfoto }
              var foto = filterService.rtnFirstObject(vm.fotos, obj);
              logger.log(foto);
              foto.sync=1; 
              return FileEntry;  
              } 
            
            });

            function allPromisesComplete (data) {
                console.log(data)
                 return zync();
               }
            
            function onZyncComplete (res) {
                 return sendPush.send()
             }

            // function onSendPushComplete (argument) {
            //    // body...
            //  } 

            function finallyPromises (argument) {                
                 widgetsService.hideSpinner();
               }      

              return $q.all(promises)
              .then(allPromisesComplete)
              .then(onZyncComplete)              
              .finally(finallyPromises);    

            }


            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function() {
              vm.popover.remove();
            });

          }
        })();
