
(function () {

    angular
  
    .module('blocks.copy')  
    .factory('copyService', copyService)

    copyService.$inject=['$cordovaFile', 'logger','exception']

    function copyService($cordovaFile, logger , exception){

    
      var Factory= {
      copyFile:copyFile 
      }
    
    //return factory object
    return Factory;
 

  function copyFile(mediaURI) {
      var FileName = mediaURI.replace(/^.*[\\\/]/, '');
      logger.log(FileName);      
      var path = mediaURI.substring(0, mediaURI.lastIndexOf('/') + 1);
      logger.log(path);
      var newFileName = FileName;     
      return $cordovaFile.copyFile(path, FileName, cordova.file.dataDirectory, newFileName)
      .then(onCompleteCopy)
      .catch(exception.catcher('copiando archivo fallo'));

      function onCompleteCopy(FileEntry) {        
        // return checkFileService.fileDetail(FileEntry);
        return FileEntry;
      }
    };

  }  

  
})(); 

