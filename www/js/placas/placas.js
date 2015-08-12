
var pl=null;
(function() {
    'use strict';

    angular
        .module('app.placas')
        .controller('Placas', Placas);

    Placas.$inject = ['$q', 'placaService', 'logger', 'promise','zumeroService', 'sendPush', '$scope', '$ionicPopup' ,'dataInitService'];

    function Placas($q,placaService,         logger,     promise,zumeroService  ,sendPush     ,$scope  ,$ionicPopup , dataInitService) {


        console.log(zumeroService, 'zumero service on placas')
        /*jshint validthis: true */
        var vm = this;
        pl=vm;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.data = {placa: null, sl: null};        
        vm.insertPLaca=insertPLaca;
        vm.placaPopup=placaPopup;
        vm.refresh=refresh;
        vm.role=dataInitService.data;
        vm.title = 'Placas';

         preActivate();


          function preActivate () {    
          promise.existsConsulta().then(onCompleteExistsConsulta)
              function onCompleteExistsConsulta () {
                 activate()
              }
           }

          function activate() {
  //             var promises = [ getPlacas()];
  // //            Using a resolver on all routes or placaService.ready in every controller
  // //            return placaService.ready(promises).then(function(){
  //             return $q.all(promises).then(function(res) {
  //                 logger.info('Activated Placas View', res);
  //             });

              return zumeroService.zync(1)
              .then(onCompleteZync)
              .then(getPlacas)
              function onCompleteZync (res) {
                return res;
              }

              function onGetPlacas (res) {
                logger.info('Activated Placas View', res);
                return res;
              }
          }


          function refresh () {
            preActivate ();
          }



          function getAvengerCount() {
              return placaService.getAvengerCount().then(function(data) {
                  vm.avengerCount = data;
                  return vm.avengerCount;
              });
          }

          function getAvengersCast() {
              return placaService.getAvengersCast().then(function(data) {
                  vm.avengers = data;
                  return vm.avengers;
              });
          }

          function getPlacas() {
              return placaService.getPlacas().then(function(data) {
                  vm.placas = data;
                  return vm.placas;
              });
          }

          function insertPLaca (placa) {
            logger.info('Ingresando nueva placa');
              placaService.insertPlaca(placa)
              .then(onInsertPlaca)
              .then(zyncafterinsert)

              function onInsertPlaca(res) {
                  cleanData();
                  return getPlacas();               
              }

              function zyncafterinsert (res) {
                 zumeroService.zync(1)
              }

              
          }

          function identifyUser() {
              return identifyService.identifyUser();
          }

          function placaPopup() {
          
          var myprompt = $ionicPopup.prompt({
            title: 'Nueva Placa',
            
            templateUrl: 'js/placas/insertPlaca.html',
            scope: $scope,
            buttons: [
              {
                text: 'Cancel',
                onTap: function (e) {
                  cleanData();
                }
              },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (vm.data.placa === null ) {      
                  // || vm.data.sl === null|| vm.data.sl === null                    
                    e.preventDefault();
                  } else {
                    return vm.data.placa;
                  }
                }
              }
            ]
          });
          myprompt.then(function (placa) {
            if (placa !== null) {
              if (placa.length < 4) {
                logger.error('longitud de placa muy corta');
                return;
              }
              placa = placa.replace(/[^\w\s]/gi, '').toUpperCase();
              placa = placa.replace(/\s/g, '');
              insertPLaca (placa);
            }            
          }); 
        };

      function cleanData() {
          vm.data.placa = null;
          vm.data.sl = null;
        };

      function addPlaca(placa) {
         
          
          // var found = $filter('filter')($scope.placas, { placa: placa }, true);
          // if (found.length) {
          //   toastService.showShortBottom('placa ya registrada');
          //   return;
          // }
          logger.info('Ingresando nueva placa');
          // placasService.insertPLaca(placa, $scope.data.sl).then(function () {
          //   console.log('en el controller');
          //   $scope.placas = placasService.all;
          //   vm.cleanData();
          //   $ionicScrollDelegate.scrollTop();
          // });
        };

                
    }
})();
