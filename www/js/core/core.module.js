(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate',  'ngSanitize','angular-storage',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger',
        'blocks.promise', 'blocks.push',
        'blocks.sqlite','blocks.zumero','blocks.sendPush',
        // , 'blocks.router'

        /*
        ionic

        */
         'ionic.service.core',
         'ionic.service.push','ionic', 'ionic.ion.headerShrink',
         'ngCordova'

    ]);
})();
