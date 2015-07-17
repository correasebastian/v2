(function () {
	angular
	// .module('starter.services')
	.module('blocks.push')    

	.factory('pushService', pushService)
	pushService.$inject=['exception', 'logger','Sqlite' ];
	function pushService ( exception, logger,Sqlite) {
		var pushFactory= {
			insertPushToken:insertPushToken	,
			insert:insert,
			active:false
		}
		//return factory object
		return pushFactory;
		//implementacion
		function insertPushToken (data) {
			logger.log('---------insert token');						
			var query='INSERT INTO [pushtokens] ([email] ,[token] ,[platform]) VALUES (?,?,?)';
			var binding=[new Date().toISOString(),data.token, data.platform];
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

	}
})(); 