// Made by Antoine Garcia in 2016

import Module from '../Module';

class calendar extends Module{
    constructor(){
        super()
        this.name = "calendar";
        this.dateOfToday = "";
    }

    start(mc) {
        this.mc = mc;
        this.getDate();
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

        var calendarIcon = document.createElement("i");
        calendarIcon.className = "fa fa-calendar";
        large.appendChild(calendarIcon);

        var date = document.createElement("span");
        date.className = "bright";
        date.innerHTML = " " + this.dateOfToday;
        large.appendChild(date);

        wrapper.appendChild(small);
        wrapper.appendChild(large);
        return wrapper;
    }

    getDate() {
        var now = new Date();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var day = days[ now.getDay() ];
        day = day.substring(0, 3);
        day += ".";
        var month = months[ now.getMonth() ];
        month = month.substring(0, 3);
        month += ".";

        this.dateOfToday = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear();
        this.mc.updateDom(this);
    }

    getScripts() {
        return ['moment.js'];
    }

    getCSS() {
        return ['./font-awesome/css/font-awesome.css'];
    }
}

module.exports = calendar;
