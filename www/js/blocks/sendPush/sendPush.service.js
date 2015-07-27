

(function () {

    'use strict';

    angular
    .module('blocks.sendPush')
    .factory('sendPush', sendPush)
     sendPush.$inject = ['$http'];

    function sendPush($http ) {
       
        var sendPushFactory = {
            send:send
        };

    return sendPushFactory;

        function send (idinspeccion,placa) { 

               
            var config={
                  headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj',
                    'X-Ionic-Application-Id': '6d5a8318'
                }
            }
            var data ={ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ],
                         // "notification":{ "alert":"matricula " + placa +, "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":placa,"key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": \"2015-07-23T16:52:44.114Z\", \"placa\":\"FFF358\"}"} } } 
                        "notification":{ "alert":"matricula " + placa , "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":placa,"key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": \""+ idinspeccion +"\", \"placa\":\""+ placa +"\"}"} } } 
                     }

             return $http.post('https://push.ionic.io/api/v1/push', data, config)
               .success(function(data, status, headers, config) {
                console.log(data, status, headers, config);
                return data;
                });                
        }

        function getTokens (data) {
           var arrayTokens;
        }
         

    }

})(); 