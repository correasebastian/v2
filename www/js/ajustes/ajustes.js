(function () {
	   'use strict';

    angular
        .module('app.ajustes')
        .controller('Ajustes', Ajustes);

    Ajustes.$inject = ['ajustesService','consultaService'];

    function Ajustes(ajustesService    ,  consultaService){
    	var vm=this;
    	vm.reset=reset;

    	//oimplementation

    	function reset () {
    		consultaService.reset();    		
    	}


    }
})(); 