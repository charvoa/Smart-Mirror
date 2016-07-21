// Made by Antoine Garcia in 2016

import Module from '../Module';

class calendar extends Module{
    constructor(){
        super()
        this.name = "calendar";
        this.dateOfToday = "";
        this.options = {
          lang:'fr'
        };
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
        date.innerHTML = " " + this.getDate();
        large.appendChild(date);

        wrapper.appendChild(small);
        wrapper.appendChild(large);
        return wrapper;
    }

    getDate() {
        moment.locale(this.options.lang);
        return moment().format('L');
    }

    getScripts() {
        return ['moment.js'];
    }

    getCSS() {
        return ['./font-awesome/css/font-awesome.css'];
    }
}

module.exports = calendar;
