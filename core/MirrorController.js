'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Made by Antoine Garcia in 2016

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var Module = require(__dirname + '/modules/Module');

var MirrorController = function () {
  function MirrorController() {
    _classCallCheck(this, MirrorController);
  }

  _createClass(MirrorController, [{
    key: 'start',
    value: function start() {
      var self = this;
      ipcRenderer.send('Receiver-Load', 'ping');
      ipcRenderer.on('Display-Modules', function (event, arg) {
        self.displayObjects(arg);
      });
    }
  }, {
    key: 'selectDiv',
    value: function selectDiv(position) {
      var classes = position.replace('_', ' ');
      var parentDiv = document.getElementsByClassName(classes);
      if (parentDiv.length > 0) {
        var wrapper = parentDiv[0].getElementsByClassName("container");
        if (wrapper.length > 0) {
          return wrapper[0];
        }
      }
    }
  }, {
    key: 'displayObjects',
    value: function displayObjects(modulesJSON) {
      var modules = [];
      var self = this;
      modulesJSON.forEach(function (module) {
        var m = Module.createFromName(module.name, module.options);
        modules.push(m);
      });
      var i = 0;
      modules.forEach(function (module) {
        var wrapper = self.selectDiv(module.options.position);
        var dom = document.createElement("div");
        dom.id = module.name + i; // NEED to Modify to generate ID
        module.identifier = dom.id;
        dom.className = module.name;
        wrapper.appendChild(dom);
        var moduleContent = document.createElement("div");
        moduleContent.className = "module-content";
        dom.appendChild(moduleContent);
        self.updateDom(module);
        i++;
      });
    }
  }, {
    key: 'updateDom',
    value: function updateDom(module) {
      var newContent = module.generateDisplay();
      this.updateModuleContent(module, newContent);
    }
  }, {
    key: 'updateModuleContent',
    value: function updateModuleContent(module, content) {
      var moduleWrapper = document.getElementById(module.identifier);
      var contentWrapper = moduleWrapper.getElementsByClassName("module-content")[0];
      contentWrapper.innerHTML = null;
      contentWrapper.appendChild(content);
    }
  }]);

  return MirrorController;
}();

var mc = new MirrorController();
mc.start();