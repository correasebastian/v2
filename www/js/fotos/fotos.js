  (function() {
      'use strict';

      angular
          .module('app.fotos')
          .controller('Fotos', Fotos);

      Fotos.$inject = ['$q', 'fotoService', 'logger', '$ionicPopover', '$ionicPopup', '$scope', '$stateParams', 'promise', 'copyService', 'transferService', 'filterService', 'widgetsService', '$ionicModal', 'sendPush', 'dataInitService', 'momentService', '$timeout', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];

      function Fotos($q, fotoService, logger, $ionicPopover, $ionicPopup, $scope, $stateParams, promise, copyService, transferService, filterService, widgetsService, $ionicModal, sendPush, dataInitService, momentService, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
          // console.log(zumeroService, 'zumero service on fotos')
          /*jshint validthis: true */
          var vm = this;
          v = vm;
          // filter=$filter;
          vm.idinspeccion = $stateParams.idinspeccion;
          vm.placa = $stateParams.placa;
          logger.log(vm.placa);

          vm.news = {
              title: 'Marvel Avengers',
              description: 'Marvel Avengers 2 is now in production!'
          };


          vm.data = {
              sistemasDictamen: null,
              matriculasDictamen: null,
              placa: vm.placa
          }

          vm.dataCopy = {
              sistemasDictamen: null,
              matriculasDictamen: null
          }

          vm.closePopover = closePopover;
          vm.closeModal = closeModal;
          vm.closeModalFull = closeModalFull;
          vm.closeModalZoom = closeModalZoom;
          vm.fotosFalt = [];
          vm.full = full;
          vm.matriculaPopup = matriculaPopup;
          vm.names = [];
          vm.openPopover = openPopover;
          vm.openModal = openModal;
          vm.openModalFull = openModalFull;
          vm.openModalZoom = openModalZoom;
          vm.refresh = refresh;
          vm.setIdTipoFoto = setIdTipoFoto;
          vm.setSistemas = setSistemas;
          vm.sistemasPopup = sistemasPopup;
          vm.takePic = takePic;
          vm.title = 'Fotos';
          vm.viewFullPath = null;
          vm.updateSlideStatus=updateSlideStatus;
          vm.uploadFotos = uploadFotos;
          vm.zoomMin = 1;
          vm.zoom=zoom;
          vm.zync = zync;


          preActivate();


          function preActivate() {
              return promise.existsConsulta().then(onCompleteExistsConsulta)

              function onCompleteExistsConsulta() {
                  return activate()
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
                  setModal(),
                  setModalFull(),
                  setModalZoom()

              ];
              //            Using a resolver on all routes or Fotoservice.ready in every controller
              //            return Fotoservice.ready(promises).then(function(){
              return $q.all(promises).then(function(res) {
                  setData();
                  logger.info('Fotos activado', res);
              });
          }

          function refresh() {
              preActivate().finally(refreshCompleted)

              function refreshCompleted() {
                  $scope.$broadcast('scroll.refreshComplete');
              }
          }


          function getFotos() {
              return fotoService.getFotos(vm.idinspeccion)
                  .then(onCompleteFotos);

              function onCompleteFotos(data) {
                  vm.role = dataInitService.data;
                  vm.fotos = data;
                  if (vm.role.idrolsura == 1) {
                      return getFotosHttp();
                  } else {
                      return vm.fotos;
                  }
              }
          }

          function getFotosHttp() {
              return fotoService.getFotosHttp(vm.idinspeccion)
                  .then(onCompleteFotosHttp);

              function onCompleteFotosHttp(data) {
                  angular.forEach(data, function(obj, key) {
                      vm.fotos.push(obj)
                  });
                  return vm.fotos;
              }
          }

          function setIdTipoFoto(tipoFoto) {
              vm.idtipo = tipoFoto;
              closeModal();
              takePic();
          };

          function getNames() {

              return fotoService.getNames().then(getNamesComplete);

              function getNamesComplete(data) {
                  vm.names = data;
                  angular.copy(vm.names, vm.fotosFalt);
                  angular.forEach(vm.fotos, function(obj, key) {
                      removeFromfaltantes(obj);
                  });

                  return vm.names;
              }

          }

          function removeFromfaltantes(obj) {
              var filterObj = {
                  idTipoFoto: obj.idtipo
              };
              filterService.rmObjFromArray(vm.fotosFalt, filterObj);
          }


          function setModal() {
              return $ionicModal.fromTemplateUrl('js/fotos/fotoModal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(completeModal);

              function completeModal(modal) {
                  vm.modal = modal;
                  return vm.modal;
              }
          }

          function setModalFull() {
              return $ionicModal.fromTemplateUrl('js/fotos/image-modal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(completeModal);

              function completeModal(modal) {
                  vm.modalFull = modal;
                  return vm.modalFull;
              }
          }

          function setModalZoom() {
              return $ionicModal.fromTemplateUrl('js/fotos/zoom-modal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(completeModal);

              function completeModal(modal) {
                  vm.modalZoom = modal;
                  return vm.modalZoom;
              }
          }

          function full(path) {
              vm.viewFullPath = path;
              openModalFull()

          }

          function zoom(index) {

              vm.activeSlide = index;

              openModalZoom()

          }

          function openModal() {
              vm.modal.show();
          }

          function closeModal() {
              vm.modal.hide()
          }


          function updateSlideStatus(slide) {
              var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
              if (zoomFactor == vm.zoomMin) {
                  $ionicSlideBoxDelegate.enableSlide(true);
              } else {
                  $ionicSlideBoxDelegate.enableSlide(false);
              }
          };

          function openModalFull() {
              vm.modalFull.show();
          }

          function closeModalFull() {
              vm.modalFull.hide()
          }

          function openModalZoom() {
              vm.modalZoom.show();
          }

          function closeModalZoom() {
              vm.modalZoom.hide()
          }

          function setPopOver() {
              return $ionicPopover.fromTemplateUrl('js/fotos/popover.html', {
                      scope: $scope
                  })
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

                  if (!data) {
                      vm.data.sistemasDictamen = data;
                      return data;
                  }
                  var obj = {
                      idsistemasdictamen: data.idsistemasdictamen
                  };
                  vm.data.sistemasDictamen = filterService.rtnFirstObject(vm.sistemasDictamenes, obj)
                  return vm.data.sistemasDictamen;


              });
          }

          function getMatriculasDictamen() {
              return fotoService.getMatriculasDictamen(vm.idinspeccion).then(function(data) {
                  // TODO: segun el codigo encontrar el objeto en el array usando un filter puede ser

                  if (!data) {
                      vm.data.matriculasDictamen = data;
                      return data;
                  }
                  var obj = {
                      idmatriculadictamen: data.idmatriculadictamen
                  };
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


          function sistemasPopup() {
              vm.dataCopy.sistemasDictamen = angular.copy(vm.data.sistemasDictamen);
              var myprompt = $ionicPopup.prompt({
                  title: 'Sistemas',

                  templateUrl: 'js/fotos/sistemas.html',
                  scope: $scope,
                  buttons: [{
                      text: 'Cancel',
                      onTap: function(e) {
                          resetData()
                              // vm.data.sistemasDictamen=vm.dataCopy.sistemasDictamen;                
                      }
                  }, {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                          if (!vm.data.sistemasDictamen) {
                              e.preventDefault();
                          } else {
                              return true;
                          }
                      }
                  }]
              });
              myprompt.then(function(placa) {
                  // vm.closePopover();          
                  if (placa) {
                      vm.setSistemas();
                  }
              });
          }


          function matriculaPopup() {
              vm.dataCopy.matriculasDictamen = angular.copy(vm.data.matriculasDictamen);
              var myprompt = $ionicPopup.prompt({
                  title: 'Matricula',
                  // template: 'Ingrese la nueva placa',
                  templateUrl: 'js/fotos/matricula.html',
                  scope: $scope,
                  buttons: [{
                      text: 'Cancel',
                      onTap: function(e) {
                          resetData()
                              // vm.data.matriculasDictamen=vm.dataCopy.matriculasDictamen;
                              // vm.closePopover();
                      }
                  }, {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                          if (!vm.data.matriculasDictamen) {
                              e.preventDefault();

                          } else {
                              // vm.closePopover();
                              return true;
                          }
                      }
                  }]
              });
              myprompt.then(function(placa) {
                  // vm.closePopover();          
                  if (placa) {
                      setMatricula();
                  }
              });
          }

          function resetData() {
              if (vm.dataCopy.matriculasDictamen) {
                  var obj = {
                      idmatriculadictamen: vm.dataCopy.matriculasDictamen.idmatriculadictamen
                  }
                  vm.data.matriculasDictamen = filterService.rtnFirstObject(vm.matriculasDictamenes, obj)
              } else {

                  vm.data.matriculasDictamen = vm.dataCopy.matriculasDictamen;

              }
              if (vm.dataCopy.sistemasDictamen) {
                  var obj = {
                      idsistemasdictamen: vm.dataCopy.sistemasDictamen.idsistemasdictamen
                  }
                  vm.data.sistemasDictamen = filterService.rtnFirstObject(vm.sistemasDictamenes, obj)
              } else {

                  vm.data.sistemasDictamen = vm.dataCopy.sistemasDictamen

              }

          }

          function setData() {
              vm.dataCopy = angular.copy(vm.data);
          }

          function setSistemas() {
              if (vm.dataCopy.sistemasDictamen) {
                  fotoService.updateSistemas(vm.idinspeccion, vm.data.sistemasDictamen)
                      .then(function(data) {
                          setData()
                          console.log(data)
                      });

              } else {
                  fotoService.setSistemas(vm.idinspeccion, vm.data.sistemasDictamen)
                      .then(function(data) {
                          setData()
                          console.log(data)
                      });

              }


          };

          function setMatricula() {
              if (vm.dataCopy.matriculasDictamen) {
                  fotoService.updateMatricula(vm.idinspeccion, vm.data.matriculasDictamen)
                      .then(function(data) {
                          console.log(data)
                          setData()
                      });

              } else {
                  fotoService.setMatricula(vm.idinspeccion, vm.data.matriculasDictamen)
                      .then(function(data) {
                          setData()
                          console.log(data)
                      });

              }

          };

          function takePic() {
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
              function onCompleteTakePic(imageURI) {
                  // logger.log(imageURI)
                  // vm.fotos.push({path:imageURI});
                  return imageURI;
              }

              function copyFile(mediaURI) {
                  return copyService.copyFile(mediaURI)
              }

              function onCompleteCopyFile(FileEntry) {
                  // logger.info('copiado local', FileEntry)          
                  return FileEntry
              }

              function insertFoto(FileEntry) {
                  angular.extend(FileEntry, {
                      idinspeccion: vm.idinspeccion,
                      placa: vm.placa,
                      path: FileEntry.nativeURL,
                      sync: 0,
                      idtipo: vm.idtipo,
                      rutaSrv: momentService.rutaSrv(FileEntry.nativeURL, vm.placa)

                  });

                  // return fotoService.insertFoto(vm.idinspeccion, vm.placa, FileEntry)
                  return fotoService.insertFoto(FileEntry)
              }

              function onCompleteInsertFoto(FileEntry) {
                  var foto = {
                      idinspeccion: FileEntry.idinspeccion,
                      placa: FileEntry.placa,
                      path: FileEntry.path,
                      idfoto: FileEntry.idfoto,
                      sync: FileEntry.sync,
                      idtipo: FileEntry.idtipo.idTipoFoto,
                      rutaSrv: FileEntry.rutaSrv
                  };
                  vm.fotos.push(foto);
                  removeFromfaltantes(foto)
                  return FileEntry;
              }

              function uploadFile(FileEntry) {

                  return transferService.upload(FileEntry);
              }

              function onCompleteUploadFile(FileEntry) {
                  // logger.info('subido ok', FileEntry);
                  return FileEntry;
              }

              function updateFoto(FileEntry) {
                  return fotoService.updateFoto(FileEntry)
              }

              function onCompleteUpdateFoto(FileEntry) {
                  // logger.info('update ok', FileEntry);
              }


          }



          function zync() {
              fotoService.zync();
              // console.log(zumeroService);
              // zumeroService.zync('ZYNC');
          }

          function uploadFotos() {
              widgetsService.showSpinner();
              var promises = [];
              var obj = {
                  sync: 0
              }
              var fotos = filterService.rtnArray(vm.fotos, obj);
              angular.forEach(fotos, function(foto, key) {
                  promises.push(
                      transferService.upload(foto)
                      .then(onCompleteUploadFile)
                      .then(updateFoto)
                      .then(onCompleteUpdateFoto)
                  );

                  function onCompleteUploadFile(FileEntry) {
                      // logger.info('subido ok', FileEntry);
                      return FileEntry;
                  }

                  function updateFoto(FileEntry) {
                      //todo para evaluar si es mejor hacer el update con idinspeccion y path, por si pasa que ya se sincronizoy  cambio el idfoto
                      return fotoService.updateFoto(FileEntry)
                  }

                  function onCompleteUpdateFoto(FileEntry) {
                      // logger.info('update ok', FileEntry);
                      var obj = {
                          idfoto: FileEntry.idfoto
                      }
                      var foto = filterService.rtnFirstObject(vm.fotos, obj);
                      logger.log(foto);
                      foto.sync = 1;
                      return FileEntry;
                  }

              });

              function allPromisesComplete(data) {
                  console.log(data)
                  return data;
              }

              function updateArray(array) {
                  // var bindings =[];

                  //  angular.forEach(array, function(obj, key){
                  //    console.log(obj,'--------');
                  //    var binding=[obj.sync, obj.idinspeccion, dataInitService.uuid, obj.path]
                  //    bindings.push(binding);
                  //  });

                  //  console.log(bindings);

                  //  return fotoService.updateFotos(bindings)  
                  var binding = [1, vm.idinspeccion, dataInitService.uuid]

                  return $timeout(onTimeOut, 300);

                  function onTimeOut() {
                      return fotoService.updateFotos(binding);
                  }


              }

              function setZync(data) {
                  return zync();
              }

              function onZyncComplete(res) {
                // quitando las notificaciones
                //565 no sgca nada , solo hay 1 y 2 pero se quieren quitar ambas

                if(vm.role.idrolsura == 565){
                  return sendPush.send(vm.idinspeccion, vm.placa)
                }else{
                  return $q.when();
                }
              }

              // function onSendPushComplete (argument) {
              //    // body...
              //  } 

              function finallyPromises(argument) {
                  widgetsService.hideSpinner();
              }

              return $q.all(promises)
                  .then(allPromisesComplete)
                  // .then(updateArray)
                  .then(setZync)
                  .then(onZyncComplete)
                  .then(getFotos)
                  .finally(finallyPromises);

          }


          //Cleanup the popover when we're done with it!
          $scope.$on('$destroy', function() {
              vm.popover.remove();
          });

      }
  })();
