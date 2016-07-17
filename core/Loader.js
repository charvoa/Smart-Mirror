'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Made by Antoine Garcia in 2016
var path = require('path');

var Loader = function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.loadedFiles = [];
  }

  _createClass(Loader, [{
    key: 'loadScripts',
    value: function loadScripts(module, callback) {
      var self = this;
      if (module.getScripts() == 0) {
        callback();
      } else {
        module.getScripts().forEach(function (script) {
          self.loadFile(script, module.name, function () {
            callback();
          });
        });
      }
    }
  }, {
    key: 'loadFile',
    value: function loadFile(filename, name, callback) {
      var file = __dirname + '/modules/' + name + '/' + filename;
      var ext = path.extname(filename);
      switch (ext) {
        case '.js':
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = file;
          script.onload = function () {
            callback();
          };
          document.getElementsByTagName("body")[0].appendChild(script);
          this.loadedFiles.push(filename);
          break;

        case '.css':
          //Not yet implemented
          break;
      }
    }
  }]);

  return Loader;
}();