"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = require("../Module");

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Made by Antoine Garcia in 2016


var compliments = function (_Module) {
  _inherits(compliments, _Module);

  function compliments() {
    _classCallCheck(this, compliments);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(compliments).call(this));

    _this.name = "compliments";
    return _this;
  }

  _createClass(compliments, [{
    key: "generateDisplay",
    value: function generateDisplay() {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = this.options.text;
      return wrapper;
    }
  }, {
    key: "getScripts",
    value: function getScripts() {
      return ['moment.js'];
    }
  }]);

  return compliments;
}(_Module3.default);

module.exports = compliments;