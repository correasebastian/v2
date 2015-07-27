/* global toastr:false, moment:false */
(function() {
    

    angular
        .module('app.core')

	    .factory('coreService', coreService)

	    coreService.$inject=[ 'logger','exception', 'zumeroService' , 'Sqlite' , 'store' , 'consultaService', 'dataInitService' , 'identifyService' ,'pushService']

	    function coreService( logger , exception  , zumeroService   , Sqlite  , store   , consultaService   , dataInitService   ,  identifyService  , pushService){

	    
	      var Factory= {
	      onAuth:onAuth 
	      }
	    
	    //return factory object
	    return Factory;

	    function onAuth (argument) {
	    	pushService.setActive(true);
	    	if (store.get('authorizationData') ){

			    function setZumero () {
		    	   	if(!store.get('pushToken')){
						identifyService.identifyUser(); 
					}
		            // zumeroService.setZumero(store.get('dataInit').zfile);
		            zumeroService.setZumero('zzdbfile');
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
