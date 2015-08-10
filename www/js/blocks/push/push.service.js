(function () {
	angular
	// .module('starter.services')
	.module('blocks.push')    

	.factory('pushService', pushService)
	pushService.$inject=['exception', 'logger','Sqlite', '$rootScope'  , 'store' , '$ionicPush', '$state', '$cordovaDialogs' ,'promise' , '$timeout' ,'zumeroService'  , 'dataInitService'];
	function pushService ( exception, logger  ,Sqlite ,  $rootScope    ,  store    ,$ionicPush , $state  ,  $cordovaDialogs  , promise  ,  $timeout  , zumeroService   ,  dataInitService) {
		
		
		var pushFactory= {
			insertPushToken:insertPushToken	,
			insert:insert,
			isFirst:true,
			active:false,
			pushRegister:pushRegister,
			removePushToken:removePushToken,
			registerEventTokenReceived:registerEventTokenReceived,
			setActive:setActive
		}
		//return factory object
		return pushFactory;
		//implementacion
		function insertPushToken (data) {

			if(pushFactory.isFirst ){
				pushFactory.isFirst=false;
			}
			logger.log('---------insert token');						
			// var query='INSERT INTO [pushtokens] ([email] ,[token] ,[platform]) VALUES (?,?,?)';
			var query = store.get('consulta').cInsertPushToken;
			var binding=[store.get('authorizationData').userName,data.token, data.platform , dataInitService.uuid];
			  console.log(query, binding, '-----------------------')
			  return Sqlite.execute(query, binding)
                .then(insertPushTokenComplete)
                .catch(exception.catcher('insertado pushToken fallo'));
                function insertPushTokenComplete () {
        			logger.success('---------insert token sqlite');
        			return true;	
                }			
		}

		function insert (query, binding) {
			logger.log('---------insert sql');						
			
			  return Sqlite.execute(query, binding)
                .then(insertPushTokenComplete, onError)
                .catch(exception.catcher('insertado pushToken fallo'));
                function insertPushTokenComplete (res) {
        			logger.log('---------insert  sqlite', res);
        			return true;	
                }
                function onError (err) {
                	console.log(err)
                }			
		}

		function setActive (bool) {
			if(bool && !pushFactory.active){
				$timeout(function(){
					pushFactory.active=true;
				}, 25000);
			}
		}

		function removePushToken () {
			var query = store.get('consulta').cRemovePushToken;
			var binding=[store.get('authorizationData').userName];
			console.log(query, binding, '-----------------------')
				return Sqlite.execute(query, binding)
                .then(removePushTokenComplete)
                .catch(exception.catcher('remove pushToken fallo'));
                function removePushTokenComplete () {
        			logger.success('---------remove token sqlite');
        			return true;	
                }	

		}


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

	          if(notification.payload && notification.payload.payload && notification.payload.payload.$state){
	          	 var stateparams={};
	          	 zumeroService.zync()
	          	 .then(onCompleteZync)

	          	 function onCompleteZync () {
	          	 	 if(notification.payload.payload.$stateParams){
		          	stateparams= angular.fromJson(notification.payload.payload.$stateParams)
		          
			         $cordovaDialogs.beep(2);
			         if( pushFactory.active){
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


		function registerEventTokenReceived () {
			logger.success('registerEventTokenReceived')
						    			 // Handles incoming device tokens
		    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {		      
		     console.log('Ionic Push: Got token ', data.token, data.platform);
		     pushFactory.active=true;
		     	if( data.token){
		     		
		     		if(!store.get('pushToken')){
		     			promise.existsConsulta()
		     			.then(onCompleteExistsConsulta)
		     			.then(insertPush)
		     			.then(insertPushTokenComplete)

		     			function onCompleteExistsConsulta (res) {
		     				return res
		     			}

		     			function insertPush (res) {
		     				if(pushFactory.isFirst){
		     					return insertPushToken(data)
		     				}else{
		     					return false

		     				}
		     				
		     			}
						// pushService.insertPushToken(data).then(insertPushTokenComplete)
		     			function  insertPushTokenComplete(data) {
		     		      store.set('pushToken', data);
		     		      
		     			}
		     		}
		     	}
		     	      
		    });
		}
	}
})(); 