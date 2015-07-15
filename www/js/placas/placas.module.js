(function() {
    'use strict';
    angular.module('app.placas', [])
    .run(placaRun)

    
    placaRun.$inject = ['$ionicPlatform','$ionicPush','$rootScope', '$state']

    function placaRun($ionicPlatform,$ionicPush, $rootScope, $state){

    	  $ionicPlatform.ready(function() {

			    	     // Registers a device for push notifications and stores its token
			     function pushRegister() {
					      console.log('Ionic Push: Registering user');

					      // Register with the Ionic Push service.  All parameters are optional.
					      $ionicPush.register({
					        canShowAlert: true, //Can pushes show an alert on your screen?
					        canSetBadge: true, //Can pushes update app icon badges?
					        canPlaySound: true, //Can notifications play a sound?
					        canRunActionsOnWake: true, //Can run actions outside the app,
					        onNotification: function(notification) {
					          // Handle new push notifications here
					          // console.log(notification.payload.payload.$state);
					          if(notification.payload.payload && notification.payload.payload.$state){
					          	 var stateparams={};
					         	 if(notification.payload.payload.$stateParams){
						          	stateparams= angular.fromJson(notification.payload.payload.$stateParams)
						          }
					        
					          $state.go(notification.payload.payload.$state, stateparams);
					          }
					         
					          return true;
					        }
					      });
					    };

			    pushRegister();


			    			 // Handles incoming device tokens
		    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {		      
		     console.log('Ionic Push: Got token ', data.token, data.platform);
		      $rootScope.token = data;
		    });

	    })


    }

 

})();
