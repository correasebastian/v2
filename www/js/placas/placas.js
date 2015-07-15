(function() {
    'use strict';

    angular
        .module('app.placas')
        .controller('Placas', Placas);

    Placas.$inject = ['$q', 'placaService', 'logger', 'identifyService'];

    function Placas($q, placaService, logger, identifyService) {

        /*jshint validthis: true */
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Placas';

        // $ionicPlatform.ready(function() {

         activate();

                function activate() {
                    var promises = [getAvengerCount(), getAvengersCast(), getPlacas(),identifyUser()];
        //            Using a resolver on all routes or placaService.ready in every controller
        //            return placaService.ready(promises).then(function(){
                    return $q.all(promises).then(function(res) {
                        logger.info('Activated Placas View', res);
                    });
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

                function identifyUser() {
                    return identifyService.identifyUser();
                }

           // })     
    }
})();
