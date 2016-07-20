// Made by Antoine Garcia in 2016

import Module from '../Module';

class calendar extends Module{
    constructor(){
        super()
        this.name = "calendar";
    }

    start(mc) {
        this.mc = mc
    }

    generateDisplay(){
        var wrapper = document.createElement("div");

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

    getDate() {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var day = days[ now.getDay() ];
        var month = months[ now.getMonth() ];
}
}

module.exports = calendar;
