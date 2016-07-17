// Made by Antoine Garcia in 2016
import Module from '../Module';

class compliments extends Module{
  constructor(){
    super()
    this.name = "compliments";
  }
  generateDisplay(){
    var wrapper = document.createElement("div");
		wrapper.innerHTML = this.options.text;
		return wrapper;
  }

  getScripts(){
    return ['moment.js'];
  }
}
module.exports = compliments;
