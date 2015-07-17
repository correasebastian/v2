
var p=null;

(function () {

    angular
  
    .module('blocks.push')  
    .run(pushRun)

    
    pushRun.$inject = ['$ionicPlatform','$ionicPush','$rootScope', '$state', '$cordovaDialogs','pushService','store']

    function pushRun($ionicPlatform,$ionicPush, $rootScope, $state, $cordovaDialogs, pushService, store){
    		p=pushService;
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

						          if(notification.payload){
						          	
							          if(notification.payload.payload && notification.payload.payload.$state){
							          	 var stateparams={};
							         	 if(notification.payload.payload.$stateParams){
								          	stateparams= angular.fromJson(notification.payload.payload.$stateParams)
								          
									         $cordovaDialogs.beep(1);
									         if( pushService.active){
									         		$cordovaDialogs.confirm(notification.payload.payload.message, notification.payload.payload.title, ['cancel','ok'])
												    .then(function(buttonIndex) {
												      // no button = 0, 'OK' = 1, 'Cancel' = 2
												      var btnIndex = buttonIndex;
												      if(btnIndex===2){
												      	$state.go(notification.payload.payload.$state, stateparams);
												      }
												    });	

									         }else
									         {
									         	$state.go(notification.payload.payload.$state, stateparams);

									         }
								          
								          }	
							          }
						          }					         
					          return true;
					        }
					      });
					    };

				// if(!store.get('pushToken')){
				 pushRegister();
					// }

			    			 // Handles incoming device tokens
		    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {		      
		     console.log('Ionic Push: Got token ', data.token, data.platform);
		     	if( data.token){
		     		pushService.active=true;
		     		if(!store.get('pushToken')){
		     		pushService.insertPushToken(data).then(insertPushTokenComplete)
		     		function  insertPushTokenComplete() {
		     		      store.set('pushToken', data);
		     		      
		     			}
		     		}
		     	}
		     	      
		    });

	    })


    }

  
})(); 

