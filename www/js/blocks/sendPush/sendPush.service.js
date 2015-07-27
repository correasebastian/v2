

(function () {

    'use strict';

    angular
    .module('blocks.sendPush')
    .factory('sendPush', sendPush)
     sendPush.$inject = ['$http', 'Sqlite' , 'store' , 'exception', 'logger'];

    function sendPush($http    ,  Sqlite   ,  store   , exception , logger) {
       
        var sendPushFactory = {
            send:send
        };

    return sendPushFactory;

        function send (idinspeccion,placa) { 

          var query=store.get('consulta').cTokenGrupoOtroRol;//consultaService.consultas.cPlacas;
          var prebinding=store.get('dataInit')
          var binding=[prebinding.idgrupo, prebinding.email ,prebinding.idrolsura ];
          
          return Sqlite.execute(query, binding)
                .then(getTokensComplete)
                .then(sendNow)
                .catch(exception.catcher('llamado para obtener tokens ha fallado'));
      
              function getTokensComplete (data) {         
                var array=Sqlite.rtnArray(data);
                var arrayToken=[]
                angular.forEach(array, function(obj, key){
                  arrayToken.push(obj.token)
                });
                return arrayToken        
              }

              function sendNow (arrayToken) {
              
                    if(arrayToken.length>0) {

                        var config={
                                    headers: {
                                      'Accept': 'application/json, text/javascript',
                                      'Content-Type': 'application/json; charset=utf-8',
                                      'Authorization': 'Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj',
                                      'X-Ionic-Application-Id': '6d5a8318'
                                          }
                            }
                          var data ={ "tokens":arrayToken,
                                       // "notification":{ "alert":"matricula " + placa +, "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":placa,"key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": \"2015-07-23T16:52:44.114Z\", \"placa\":\"FFF358\"}"} } } 
                                      "notification":{ "alert":"matricula " + placa , "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":placa,"key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": \""+ idinspeccion +"\", \"placa\":\""+ placa +"\"}"} } } 
                                   }

                            return $http.post('https://push.ionic.io/api/v1/push', data, config)
                             .success(function(data, status, headers, config) {
                              console.log(data, status, headers, config);
                              logger.success('enviado mensaje')
                              return data;
                              });

                    } else
                    {
                      logger.error('mensaje no enviado');
                      return false;
                    }

                
              }
               
                            
        }

        function getTokens (data) {
           var arrayTokens;
        }
         

    }

})(); 