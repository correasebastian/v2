(function () {
	angular.module('block.widgets')
	.factory('widgetsService', widgetsService)

    widgetsService.$inject=[ 'logger','exception', '$ionicLoading']

    function widgetsService( logger , exception ,   $ionicLoading  ){

	 var Factory= {
      showSpinner:showSpinner,
      hideSpinner:hideSpinner
      }
	    
	    //return factory object
	   return Factory;

	    //implementation
      function showSpinner() {
	    $ionicLoading.show({
	      templateUrl : 'js/blocks/widgets/spinner.html'
	    });
	  };

	  function hideSpinner(){
	    $ionicLoading.hide();
	  };

    }

})(); 