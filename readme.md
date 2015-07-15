POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Authorization: Basic Zjg3NWUwMWVlMTFkOTEwNjE1ZDUwYTRjYTBhOTljMjllYjk3N2IwNjM4NjVkNGVj
X-Ionic-Application-Id: 6d5a8318
Content-Type: application/json
Cache-Control: no-cache

{ "tokens":[ "APA91bHeSALts9tTeTA9v0po-VNYLIlo8CQDhvDuIzLkc36E7VX5FcnOg8AF8w1WuJF2wLQ9BqBviluDA_pd69kP0MPPLEQrSrXwBCl5fIyNzbkLJRgQCkKgitxVfojiMkHFLvhuC_MA" ], "notification":{ "alert":"Hello World!", "android":{ "collapseKey":"foo", "delayWhileIdle":true, "timeToLive":300, "payload":{ "key1":"value", "key2":"value", "$state":"tab.chat-detail" , "$stateParams": "{\"placa\": 1}"} } } }