(function () {
	   'use strict';

    angular
        .module('app.ajustes')
        .controller('Ajustes', Ajustes);

    Ajustes.$inject = ['ajustesService','consultaService' , 'dataInitService' , 'zumeroService', 'Sqlite' , '$state', 'authService'];

    function Ajustes(ajustesService    ,  consultaService  , dataInitService  ,  zumeroService  , Sqlite   , $state ,  authService){
    	var vm=this;
    	vm.resetConsulta=resetConsulta;
        vm.resetDataInit=resetDataInit;
        vm.logOut=logOut;
        vm.zync=zync;

    	//oimplementation

    	function resetConsulta () {
    		consultaService.resetConsulta();    		
    	}

        function resetDataInit () {
            dataInitService.resetDataInit()
            .then(onCompleteReset)

            function onCompleteReset (data) {
                zumeroService.setZumero(data.zfile);            
                Sqlite.setDb(zumeroService.dbfileComplete);
            }
        }

        function logOut () {
            authService.logOut();
            $state.go('login')

        }

        function zync () {
            zumeroService.zync(12);
        }


    }
})(); 