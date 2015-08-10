(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = [ 'logger' , '$state' , 'authService', 'coreService'];

    function Login(   logger , $state, authService   , coreService) {


        /*jshint validthis: true */
        var vm = this;

        vm.loginData = {
          // userName: 'jj@jj.com',
          // password: 'Siva',
          userName: '',
          password: '',
          useRefreshTokens: false
        };
        vm.login=login;    
        vm.title = 'Login';

          function signIn(user) {
            console.log('Sign-In');
            $state.go('tab.dash');
          };

          function login() {            
              authService.login(vm.loginData).then(onCompleteLogin, onErrorLogin); 

              function onCompleteLogin (res) {
                coreService.onAuth();                        
                signIn();              
              }

              function onErrorLogin (err) {
                  vm.message = err.error_description;
              }          
          };


                
    }
})();
