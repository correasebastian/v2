POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Authorization: Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj
X-Ionic-Application-Id: 6d5a8318
Content-Type: application/json
Cache-Control: no-cache

{ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ], "notification":{ "alert":"Hello World!", "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":300, "payload":{ "key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"placa\": 1}"} } } }

----------------------------------------------------------------------------

POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Authorization: Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj
X-Ionic-Application-Id: 6d5a8318
Content-Type: application/json
Cache-Control: no-cache

{ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ], "notification":{ "alert":"mtricula del ABC", "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":"ABC","key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"placa\": 19}"} } } }

----------------------------------------------------------------------------

cuando ingreseuna columna nueva en consultas tengo k borrar el store.remove('consulta')

-----------------------------------

POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Authorization: Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj
X-Ionic-Application-Id: 6d5a8318
Content-Type: application/json
Cache-Control: no-cache

{ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ], "notification":{ "alert":"mtricula del ABC", "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":"ABC","key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": 19, \"placa\":\"abc123\"}"} } } }

---------------------------------------------------------------

Preview Limitations
POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Authorization: Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj
X-Ionic-Application-Id: 6d5a8318
Content-Type: application/json
Cache-Control: no-cache

{ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ], "notification":{ "alert":"mtricula del ABC", "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":600, "payload":{"message": "matricula disponible","title":"ABC","key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"idinspeccion\": \"2015-07-21T17:24:45.910Z\", \"placa\":\"BBB888\"}"} } } }



---------------------------------------------------------------
---------------------------------------------------------------
PUBLISHING

1 cordova build --release android
