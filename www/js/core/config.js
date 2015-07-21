(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Angular Modular Demo',
        version: '1.0.0'
    };

    core.value('config', config);

     // core.config(['$ionicAppProvider', function($ionicAppProvider) {
     //      // Identify app
     //      $ionicAppProvider.identify({
     //        // The App ID (from apps.ionic.io) for the server
     //        app_id: '6d5a8318',
     //        // The public API key all services will use for this app
     //        api_key: '16ee09dd4098ccebc97e6c4b35083ee3aa8ebb1f5a0180a5',
     //        // Set the app to use development pushes
     //        // dev_push: true
     //        // ,
     //        // The GCM project number
     //        gcm_id: '237781718403'
     //      });
     //    }]);


})();
