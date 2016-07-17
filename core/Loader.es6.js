// Made by Antoine Garcia in 2016
var path = require('path')
class Loader {
  constructor(){
    this.loadedFiles = [];
  }

  loadScripts(module,callback){
    var self = this;
    if(module.getScripts() == 0){
      callback()
    }
    else{
      module.getScripts().forEach(function(script){
        self.loadFile(script,module.name,function(){
          callback()
        });
      });
    }
  }
  loadFile(filename,name,callback){
    var file = __dirname + '/modules/' + name + '/' + filename;
    var ext = path.extname(filename);
    switch(ext){
      case '.js':
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        script.onload = function() {
          callback()
        }
        document.getElementsByTagName("body")[0].appendChild(script);
        this.loadedFiles.push(filename);
        break;

      case '.css': //Not yet implemented
        break;
    }
  }
}
