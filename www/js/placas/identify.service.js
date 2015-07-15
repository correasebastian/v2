(function () {
	angular
	// .module('starter.services')
	.module('app.placas')    

	.factory('identifyService', identifyService)
	identifyService.$inject=['$filter','exception', '$http' , 'logger' , 'promise','$ionicUser', '$ionicPush'];
	function identifyService (  $filter , exception, $http, logger, promise, $ionicUser, $ionicPush) {

		var identified=false;
		var token=null;
		var identifyFactory= {
			identifyUser:identifyUser,
			identified : identified,
			token:token			
		}
		
		//return factory object
		return identifyFactory;

		//implementacion

		// init();

		function init() {
			
					 // Handles incoming device tokens
		    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {		      
		     console.log('Ionic Push: Got token ', data.token, data.platform);
		      identifyFactory.token = data;
		    });
		}

		function identifyUser() {
		    console.log('Ionic User: Identifying with Ionic User service');

		    var user = $ionicUser.get();
		    if(!user.user_id) {
		      // Set your user_id here, or generate a random one.
		      user.user_id = $ionicUser.generateGUID();
		    };

		    // Add some metadata to your user object.
		    angular.extend(user, {
		      name: 'kike',
		      bio: 'I come from planet Ion',
		      email: 'sebas@aj.com'
		    });

		    // Identify your user with the Ionic User Service
		   return  $ionicUser.identify(user).then(function(){
		   		console.log('user.name' , user.name, 'user_id', user.user_id)
		      	identified = true;
		      	return identified;		      		      
		    });
		  };
		}


})(); 