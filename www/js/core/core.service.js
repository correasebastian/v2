/* global toastr:false, moment:false */

(function() {
    

    angular
        .module('app.core')

	    .factory('coreService', coreService)

	    coreService.$inject=[ 'logger','exception', 'zumeroService' , 'Sqlite' , 'store' , 'consultaService', 'dataInitService' , 'identifyService' ,'pushService' ,'$cordovaDevice']

	    function coreService( logger , exception  , zumeroService   , Sqlite  , store   , consultaService   , dataInitService   ,  identifyService  , pushService  ,  $cordovaDevice){

	    
	      var Factory= {
	      onAuth:onAuth 
	      }
	    
	    //return factory object
	    return Factory;


	    function onAuth (argument) {
	    	pushService.setActive(true);
	    	dataInitService.uuid=$cordovaDevice.getUUID();
	    	if(store.get('dataInit')){
	    		dataInitService.data=store.get('dataInit');
	    	}
	    	
	    	if (store.get('authorizationData') ){

			    function setZumero () {
		    	   	if(!store.get('pushToken')){
						identifyService.identifyUser(); 
					}
		            // zumeroService.setZumero(store.get('dataInit').zfile);
		            zumeroService.setZumero('zumerotestdbfile');
		            // zumeroService.setZumero('zzdbfile');
		            Sqlite.setDb(zumeroService.dbfileComplete);		            
		            zumeroService.zync(1).then(onFirstZync) 

		            function onFirstZync () {
		                  logger.success('onFirstZync');		                  
		                  pushService.pushRegister();
		                  if(!store.get('consulta')){
		                    consultaService.setConsulta().then(onSetConsultas);
		                    }
		                  }                  

		            function onSetConsultas  () {
		                   logger.success('setconsultas ok');
		                   store.set('consulta', consultaService.consultas);
		                 } 
		        }  

		        if(store.get('dataInit')){
		          setZumero(); 
		        }
		        else{
		          dataInitService.setData()
		          .then(onSetDataComplete)
		          function onSetDataComplete (data) {
		            setZumero();
		          }
		        }
		               
		        
		        if(store.get('consulta')){
		            // console.log(store.get('consulta'));
		            consultaService.consultas=store.get('consulta');
		            // console.log(consultaService.consultas)
		        }
		    }
	    }



	  }

})();
