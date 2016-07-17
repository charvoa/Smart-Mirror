'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Made by Antoine Garcia in 2016

var _require = require('electron');

var ipcMain = _require.ipcMain;

var Module = require(__dirname + '/../modules/Module');

var Core = function () {
  function Core() {
    _classCallCheck(this, Core);

    this.modules = [];
  }

  _createClass(Core, [{
    key: 'loadConfig',
    value: function loadConfig(callback) {
      console.log("Loading Config...");
      var configFile = require('../config/config.json');
      callback(configFile);
    }
  }, {
    key: 'loadModules',
    value: function loadModules(modules) {
      var self = this;
      modules.forEach(function (module) {
        var m = Module.createFromName(module.name, module.options);
        self.modules.push(m);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      console.log('Starting the mirror !!');
      var self = this;
      self.loadConfig(function (configFile) {
        var config = configFile.config;
        self.loadModules(config.modules);
        ipcMain.on('Receiver-Load', function (event, arg) {
          console.log("RECEIVE");
          event.sender.send('Display-Modules', self.modules);
        });
      });
    }
  }]);

  return Core;
}();

module.exports = new Core();