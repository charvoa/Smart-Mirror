"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = require("../Module");

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Made by Antoine Garcia in 2016

var calendar = function (_Module) {
    _inherits(calendar, _Module);

    function calendar() {
        _classCallCheck(this, calendar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(calendar).call(this));

        _this.name = "calendar";
        _this.dateOfToday = "";
        _this.options = {
            lang: 'fr'
        };
        return _this;
    }

    _createClass(calendar, [{
        key: "start",
        value: function start(mc) {
            this.mc = mc;
            this.getDate();
        }
    }, {
        key: "generateDisplay",
        value: function generateDisplay() {
            var wrapper = document.createElement("div");

            var small = document.createElement("div");
            small.className = "normal medium";

            var spacer = document.createElement("span");
            spacer.innerHTML = "&nbsp;";
            small.appendChild(spacer);

            var large = document.createElement("div");
            large.className = "large light";

            var calendarIcon = document.createElement("i");
            calendarIcon.className = "fa fa-calendar";
            large.appendChild(calendarIcon);

            var date = document.createElement("span");
            date.className = "bright";
            date.innerHTML = " " + this.getDate();
            large.appendChild(date);

            wrapper.appendChild(small);
            wrapper.appendChild(large);
            return wrapper;
        }
    }, {
        key: "getDate",
        value: function getDate() {
            moment.locale(this.options.lang);
            return moment().format('L');
        }
    }, {
        key: "getScripts",
        value: function getScripts() {
            return ['moment.js'];
        }
    }, {
        key: "getCSS",
        value: function getCSS() {
            return ['./font-awesome/css/font-awesome.css'];
        }
    }]);

    return calendar;
}(_Module3.default);

module.exports = calendar;