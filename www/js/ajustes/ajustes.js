(function () {
	   'use strict';

    angular
        .module('app.ajustes')
        .controller('Ajustes', Ajustes);

    Ajustes.$inject = ['ajustesService','consultaService' , 'dataInitService' , 'zumeroService', 'Sqlite'];

    function Ajustes(ajustesService    ,  consultaService  , dataInitService  ,  zumeroService  , Sqlite){
    	var vm=this;
    	vm.resetConsulta=resetConsulta;
        vm.resetDataInit=resetDataInit;

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


    }
})(); 