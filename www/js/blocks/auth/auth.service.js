
(function () {

    angular
  
    .module('blocks.auth')  
    .factory('authService', authService)

    authService.$inject=[ 'logger','exception', 'ngAuthSettings', 'store', '$http' ,'pushService']

    function authService( logger , exception ,  ngAuthSettings  ,  store  , $http , pushService){

      var serviceBase = ngAuthSettings.apiServiceBaseUri;     
      var _authentication = {
        isAuth: false,
        userName: '',
        useRefreshTokens: false,
        lastLoging: ''
      };
      var _externalAuthData = {
        provider: '',
        userName: '',
        externalAccessToken: ''
      };

    
      var Factory= {
      login:login ,
      logOut:logOut
      }
    
    //return factory object
    return Factory;
 

    function login(loginData) {
        var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password + '&client_id=' + ngAuthSettings.clientId;
        
        
       return  $http.post(ngAuthSettings.apiServiceBaseUri + '/auth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .success(oCompleteGetToken)
              .catch(onErrorGetToken);

              function oCompleteGetToken(response) {
               
                  store.set('authorizationData', {
                    token: response.access_token,
                    userName: loginData.userName,
                    refreshToken: '',
                    useRefreshTokens: false,
                    exp: response.expires_in
                  });    

                _authentication.isAuth = true;
                // _authentication.lastLoging = moment();
                _authentication.userName = loginData.userName;
                // _authentication.useRefreshTokens = loginData.useRefreshTokens;
                return response;
                
              }

              function onErrorGetToken (message) {          
                exception.catcher('XHR Failed get Token')(message);          
                logOut();
                return message;        
              }

    }

    function logOut (argument) {     

      pushService.removePushToken()
      .then(onCompleteRemovePush)
        function onCompleteRemovePush () {
          store.remove('pushToken')
          store.remove('dataInit')      
          store.remove('consulta')
        }
      store.remove('authorizationData');

      _authentication.isAuth = false;
      _authentication.userName = '';
      _authentication.useRefreshTokens = false;
    }

  }  

  
})(); 

