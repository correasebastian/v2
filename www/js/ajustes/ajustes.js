(function () {
	   'use strict';

    angular
        .module('app.ajustes')
        .controller('Ajustes', Ajustes);

    Ajustes.$inject = ['ajustesService','consultaService' , 'dataInitService' , 'zumeroService', 'Sqlite' , '$state', 'authService', '$ionicDeploy', 'logger'];

    function Ajustes(ajustesService    ,  consultaService  , dataInitService  ,  zumeroService  , Sqlite   , $state ,  authService , $ionicDeploy , logger){
    	var vm=this;
    	vm.resetConsulta=resetConsulta;
        vm.resetDataInit=resetDataInit;
        vm.logOut=logOut;
        vm.zync=zync;
        vm.hasUpdate=false;

        vm.doUpdate=doUpdate;
        vm.checkForUpdates=checkForUpdates;
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


              // Update app code with new release from Ionic Deploy
      function doUpdate() {
        $ionicDeploy.update().then(function(res) {
          logger.success('Ionic Deploy: Update Success! ', res);
        }, function(err) {
          logger.error('Ionic Deploy: Update error! ', err);
        }, function(prog) {
          logger.info('Ionic Deploy: Progress... ', prog);
        });
      };

      // Check Ionic Deploy for new code
       function checkForUpdates() {
        logger.success('Ionic Deploy: Checking for updates');
        $ionicDeploy.check().then(function(hasUpdate) {
          logger.success('Ionic Deploy: Update available: ' + hasUpdate);
          vm.hasUpdate = hasUpdate;
        }, function(err) {
          logger.error('Ionic Deploy: Unable to check for updates', err);
        });
      }




    }
})(); 