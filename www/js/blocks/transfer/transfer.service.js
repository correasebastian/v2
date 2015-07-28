
(function () {

    angular
  
    .module('blocks.transfer')  
    .factory('transferService', transferService)

    transferService.$inject=['$cordovaFile', 'logger','exception','$cordovaFileTransfer' ,'consultaService']

    function transferService($cordovaFile, logger , exception    ,   $cordovaFileTransfer, consultaService){
    
      var Factory= {
      upload:upload 
      }
    
    //return factory object
    return Factory;

    //implementacion

    function upload(fileEntry) {
       var nativeURL=fileEntry.path;
       var timeout=consultaService.consultas.timeoutFotos;//25000;
       var FileName = nativeURL.replace(/^.*[\\\/]/, '');
        logger.log(FileName);
        var fileExt = FileName.split('.').pop();
        logger.log('extension', fileExt);
        var mimetype = 'image/jpeg';
        // fileTransferServiceFactory.setTimeOut = 20000;
        if (fileExt === 'mp4') {
          mimetype = 'video/mp4';
          timeout = 60000;
        }
        var server = 'http://www.ajustevsiva.com';

        var options = {};
        options.fileKey = 'file';
        options.fileName = nativeURL.substr(nativeURL.lastIndexOf('/') + 1);
        options.mimeType = mimetype;

        var params = {};
        params.pathFileServer =fileEntry.rutaSrv.substring(0, fileEntry.rutaSrv.lastIndexOf('/') + 1);// '2015/JULIO/sebas/'// obj.rutaSrv.substring(0, obj.rutaSrv.lastIndexOf('/') + 1);
        params.value2 = 'param';
        options.params = params;
        // TODO: definir un servicio para set el timeout dependiendo si es foto o video;
        options.timeout = timeout;
      
        console.time('fileUpload');
        return $cordovaFileTransfer.upload(server + '/auth/api/file',nativeURL, options)
        .then(onCompleteUpload)
        .catch(exception.catcher('subiendo archivo fallo'));

        function onCompleteUpload(res) {
          logger.log('succes en el upload',res );  
          angular.extend(fileEntry, res)    
          return fileEntry;  //TODO: verificar si puedo poner el error aca y disparar el ooflinemode desde aca y no desde todos los controllers
        } 
      };

  }  

  
})(); 

