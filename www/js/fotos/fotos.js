(function() {
    'use strict';

    angular
        .module('app.fotos')
        .controller('Fotos', Fotos);

    Fotos.$inject = ['$q', 'fotoService', 'logger','$ionicPopover','$ionicPopup', '$scope', '$stateParams' , 'promise'];

    function Fotos($q, fotoService, logger,        $ionicPopover,   $ionicPopup,   $scope , $stateParams , promise) {

        /*jshint validthis: true */
        var vm = this;
        v=vm;
        vm.sParams=$stateParams.placa;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };

        vm.data={
          sistemasDictamen:{},
          matriculasDictamen:{},
          placa:'placa'
        }

        vm.dataCopy={
          sistemasDictamen:null,
          matriculasDictamen:null
        }
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Fotos';
        vm.openPopover=openPopover;
        vm.closePopover=closePopover;
        vm.sistemasPopup = sistemasPopup;
        vm.matriculaPopup =matriculaPopup; 
        vm.setSistemas=setSistemas;


         preActivate();


        function preActivate () {    
        promise.existsConsulta().then(onCompleteExistsConsulta)
            function onCompleteExistsConsulta () {
               activate()
            }
         }

        // activate();

        function activate() {
            
            var promises = [getAvengerCount(), 
                            getAvengersCast(), 
                            getFotos(),
                            setPopOver(),
                            getMatriculasDictamenes(),
                            getSistemasDictamenes(),
                            getMatriculasDictamen(),
                            getSistemasDictamen()
                            ];
//            Using a resolver on all routes or Fotoservice.ready in every controller
//            return Fotoservice.ready(promises).then(function(){
            return $q.all(promises).then(function(res) {
                logger.info('Activated Fotos View', res);
            });
        }

        function getAvengerCount() {
            return fotoService.getAvengerCount().then(function(data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return fotoService.getAvengersCast().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }

        function getFotos() {
            return fotoService.getFotos().then(function(data) {
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
            return fotoService.getSistemasDictamen().then(function(data) {
              // TODO: segun el codigo encontrar el objeto en el array usando un filter puede ser
                vm.data.sistemasDictamen = data;
                return vm.data.sistemasDictamen;
            });
        }

        function getMatriculasDictamen() {
            return fotoService.getMatriculasDictamen().then(function(data) {
              // TODO: segun el codigo encontrar el objeto en el array usando un filter puede ser
                vm.data.matriculasDictamen = data;
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
                vm.data.sistemasDictamen=vm.dataCopy.sistemasDictamen;                
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
           vm.closePopover();          
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
                vm.data.matriculasDictamen=vm.dataCopy.matriculasDictamen;
                vm.closePopover();
              }
            },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!vm.data.matriculasDictamen){
                  e.preventDefault();
                
                } else {
                  vm.closePopover();
                  return vm.data.matriculasDictamen.value;
                }
              }
            }
          ]
        });
        myprompt.then(function (placa) {
           vm.closePopover();          
          if (placa ) {
              setMatricula();
              } 
        });
      }

    function setSistemas(){
      fotoService.setSistemas()
        .then(function(data) {  
        console.log(data)                        
        });
   
          // if(!vm.dataCopy.sistemasDictamen){
          
          // }
          // else{
             
          // }
          
        };

      function setMatricula(){   
        fotoService.setMatricula()
        .then(function(data) {  
        console.log(data)                        
        });
        };


          //Cleanup the popover when we're done with it!
          $scope.$on('$destroy', function() {
            vm.popover.remove();
          });
    }
})();
