(function() {
    'use strict';

    angular
        .module('app.fotos')
        .controller('Fotos', Fotos);

    Fotos.$inject = ['$q', 'fotoService', 'logger'];

    function Fotos($q, fotoService, logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Fotos';

        activate();

        function activate() {
            var promises = [getAvengerCount(), getAvengersCast(), getFotos()];
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
    }
})();
