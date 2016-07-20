// Made by Antoine Garcia in 2016
var path = require('path')
var Promise = require('bluebird');

class Loader {
  constructor(){
    this.loadedFiles = [];
  }

  loadScripts(module,callback){
    var self = this;
    if(module.getScripts().length == 0){
      callback()
    }
    else{
      var count = module.getScripts().length;
      var check = 0;
      module.getScripts().forEach(function(script){
        self.loadFile(script,module.name,function(){
          check++;
          if (check === count){
            callback()
          }
        });
      });
    }
  }
  loadCSS(module,callback){
    var self = this;
    if (module.getCSS().length == 0){
      callback()
    }
    else{
      var count = module.getCSS().length;
      var check = 0;
      module.getCSS().forEach(function(style){
        self.loadFile(style,module.name,function(){
          check++;
          if (check == count){
            callback();
          }
        });
      })
    }
  }
  loadFile(filename,name,callback){
    var file = '';
    if (filename.indexOf('./') === 0){
      file = __dirname + '/modules/' + name + '/' + filename;
    }
    else{
      var file = __dirname + '/modules/' + name + '/' + filename;
    }
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

      case '.css':
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = file;
        style.onload = function(){callback();}
        document.getElementsByTagName('head')[0].appendChild(style);
        break;
    }
  }
}
