// Made by Antoine Garcia in 2016
const {ipcMain} = require('electron');
var Module = require(__dirname + '/../modules/Module');
class Core {
  constructor(){
    this.modules = [];
  }
  loadConfig(callback){
    console.log("Loading Config...");
    var configFile = require('../config/config.json');
    callback(configFile);
  }

  loadModules(modules){
    var self = this;
    modules.forEach(function (module) {
      var m = Module.createFromName(module.name,module.options);
      self.modules.push(m);
    });
  }

  start(){
    console.log('Starting the mirror !!');
    var self = this
    self.loadConfig(function(configFile){
      var config = configFile.config;
      self.loadModules(config.modules)
      ipcMain.on('Receiver-Load', (event, arg) => {
        console.log("RECEIVE");
        event.sender.send('Display-Modules', self.modules);
      });
    });
  }

}

module.exports = new Core();
