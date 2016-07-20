"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = require("../Module");

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Made by Antoine Garcia in 2016


var simpleText = function (_Module) {
  _inherits(simpleText, _Module);

  function simpleText() {
    _classCallCheck(this, simpleText);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(simpleText).call(this));

    _this.name = "simpleText";
    _this.options = {
      text: ""
    };
    return _this;
  }

  _createClass(simpleText, [{
    key: "generateDisplay",
    value: function generateDisplay() {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = this.options.text;
      return wrapper;
    }
  }]);

  return simpleText;
}(_Module3.default);

module.exports = simpleText;