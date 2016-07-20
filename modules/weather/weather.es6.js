// Made by Antoine Garcia in 2016

import Module from '../Module';

class weather extends Module{
    constructor(){
        super()
        this.name = "weather";
        this.options = {
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
            animationSpeed: 1000,
            timeFormat: 24,
            iconTable: {
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
            }
        };
        this.temperature = null;
        this.weatherType = null;

        this.loaded = false;
        this.updateTimer = null;

    }

    start(mc) {
        this.mc = mc
        this.getWeather();
        var self = this;
        var nextLoad = this.options.updateInterval;
        setTimeout(function() {
            self.getWeather();
        }, nextLoad);
    }

    generateDisplay(){
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


    getWeather() {
        var url = this.options.apiBase + this.options.apiVersion + "/" + this.options.weatherEndpoint + this.getParams();
        var retry = true;
        var self = this;

        var weatherRequest = new XMLHttpRequest();
        weatherRequest.open("GET", url, true);
        weatherRequest.onreadystatechange = function() {
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

    processWeather(data) {
        this.temperature = this.roundValue(data.main.temp);

        this.weatherType = this.options.iconTable[data.weather[0].icon];


        this.loaded = true;
        this.mc.updateDom(this);
    }
    roundValue(temperature) {
        return parseFloat(temperature).toFixed(1);
    }

    getParams() {
        var params = "?";
        if(this.options.locationID !== "") {
            params += "id=" + this.options.locationID;
        } else {
            params += "q=" + this.options.location;
        }
        params += "&units=" + this.options.units;
        params += "&lang=" + this.options.lang;
        params += "&appid=" + this.options.appID;

        return params;
    }

    getScripts() {
        return ['moment.js'];
    }

    getCSS() {
        return ['weather.css','./weather-icons-master/css/weather-icons.css'];
    }
}
module.exports = weather;
