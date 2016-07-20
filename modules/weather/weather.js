"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = require("../Module");

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Made by Antoine Garcia in 2016

var weather = function (_Module) {
    _inherits(weather, _Module);

    function weather() {
        var _this$options;

        _classCallCheck(this, weather);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(weather).call(this));

        _this.name = "weather";
        _this.options = (_this$options = {
            location: "",
            locationID: "",
            appID: "",
            apiVersion: "2.5",
            apiBase: "http://api.openweathermap.org/data/",
            weatherEndpoint: "weather",
            initialLoadDelay: 0, // 0 seconds delay
            retryDelay: 2500,
            units: "",
            lang: "",
            timeFormat: 24,
            updateInterval: 10 * 60 * 1000, // every 10 minutes
            animationSpeed: 1000
        }, _defineProperty(_this$options, "timeFormat", 24), _defineProperty(_this$options, "iconTable", {
            "01d": "wi-day-sunny",
            "02d": "wi-day-cloudy",
            "03d": "wi-cloudy",
            "04d": "wi-cloudy-windy",
            "09d": "wi-showers",
            "10d": "wi-rain",
            "11d": "wi-thunderstorm",
            "13d": "wi-snow",
            "50d": "wi-fog",
            "01n": "wi-night-clear",
            "02n": "wi-night-cloudy",
            "03n": "wi-night-cloudy",
            "04n": "wi-night-cloudy",
            "09n": "wi-night-showers",
            "10n": "wi-night-rain",
            "11n": "wi-night-thunderstorm",
            "13n": "wi-night-snow",
            "50n": "wi-night-alt-cloudy-windy"
        }), _this$options);
        _this.temperature = null;
        _this.weatherType = null;

        _this.loaded = false;
        _this.updateTimer = null;

        return _this;
    }

    _createClass(weather, [{
        key: "start",
        value: function start(mc) {
            this.mc = mc;
            this.getWeather();
            var self = this;
            var nextLoad = this.options.updateInterval;
            setTimeout(function () {
                self.getWeather();
            }, nextLoad);
        }
    }, {
        key: "generateDisplay",
        value: function generateDisplay() {
            var wrapper = document.createElement("div");

            if (this.options.appID === "") {
                wrapper.innerHTML = "Please set the correct openweather <i>appid</i> in the config for module: " + this.name + ".";
                wrapper.className = "dimmed light small";
                return wrapper;
            }

            if (this.options.location === "") {
                wrapper.innerHTML = "Please set the openweather <i>location</i> in the config for module: " + this.name + ".";
                wrapper.className = "dimmed light small";
                return wrapper;
            }

            if (!this.loaded) {
                wrapper.innerHTML = "LOADING ...";
                wrapper.className = "dimmed light small";
                return wrapper;
            }

            var small = document.createElement("div");
            small.className = "normal medium";

            var spacer = document.createElement("span");
            spacer.innerHTML = "&nbsp;";
            small.appendChild(spacer);

            var large = document.createElement("div");
            large.className = "large light";

            var weatherIcon = document.createElement("span");
            weatherIcon.className = "wi weathericon " + this.weatherType;
            large.appendChild(weatherIcon);

            var temperature = document.createElement("span");
            temperature.className = "bright";
            temperature.innerHTML = " " + this.temperature + "&deg;";
            large.appendChild(temperature);

            wrapper.appendChild(small);
            wrapper.appendChild(large);
            return wrapper;
        }
    }, {
        key: "getWeather",
        value: function getWeather() {
            var url = this.options.apiBase + this.options.apiVersion + "/" + this.options.weatherEndpoint + this.getParams();
            var retry = true;
            var self = this;

            var weatherRequest = new XMLHttpRequest();
            weatherRequest.open("GET", url, true);
            weatherRequest.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        self.processWeather(JSON.parse(this.response));
                    } else if (this.status === 401) {
                        self.options.appID = "";
                        self.mc.updateDom(self);

                        Log.error(self.name + ": Incorrect APPID.");
                        retry = false;
                    } else {
                        Log.error(self.name + ": Could not load weather.");
                    }
                }
            };
            weatherRequest.send();
        }
    }, {
        key: "processWeather",
        value: function processWeather(data) {
            this.temperature = this.roundValue(data.main.temp);

            this.weatherType = this.options.iconTable[data.weather[0].icon];

            this.loaded = true;
            this.mc.updateDom(this);
        }
    }, {
        key: "roundValue",
        value: function roundValue(temperature) {
            return parseFloat(temperature).toFixed(1);
        }
    }, {
        key: "getParams",
        value: function getParams() {
            var params = "?";
            if (this.options.locationID !== "") {
                params += "id=" + this.options.locationID;
            } else {
                params += "q=" + this.options.location;
            }
            params += "&units=" + this.options.units;
            params += "&lang=" + this.options.lang;
            params += "&appid=" + this.options.appID;

            return params;
        }
    }, {
        key: "getScripts",
        value: function getScripts() {
            return ['moment.js'];
        }
    }, {
        key: "getCSS",
        value: function getCSS() {
            return ['weather.css', './weather-icons-master/css/weather-icons.css'];
        }
    }]);

    return weather;
}(_Module3.default);

module.exports = weather;