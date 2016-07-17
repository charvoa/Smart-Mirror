"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Made by Antoine Garcia in 2016

var Module = function () {
  //You have to override this ! Change this.name to the name of your module.

  function Module() {
    _classCallCheck(this, Module);

    this.options = {};
    this.name = "Module";
  }
  //Call when the module is started.


  _createClass(Module, [{
    key: "start",
    value: function start(mc) {
      console.log("STARTING MODULE");
    }

    //Method to override if you want to display info on the mirror.

  }, {
    key: "generateDisplay",
    value: function generateDisplay() {
      var nameDiv = document.createElement("div");
      var name = document.createTextNode(this.name);
      nameDiv.appendChild(name);

      var div = document.createElement("div");
      div.appendChild(nameDiv);

      return div;
    }

    //Method to override if you want to add custom Scripts.

  }, {
    key: "getScripts",
    value: function getScripts() {
      return [];
    }
  }], [{
    key: "createFromName",
    value: function createFromName(name, options) {
      var path = __dirname + '/../modules/' + name + '/' + name;
      var Module = require(path);
      var m = new Module();
      Object.assign(m.options, options);
      return m;
    }
  }]);

  return Module;
}();

module.exports = Module;