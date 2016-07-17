// Made by Antoine Garcia in 2016
import Module from '../Module';

class simpleText extends Module{
  constructor(){
    super()
    this.name = "simpleText";
  }
  generateDisplay(){
    var wrapper = document.createElement("div");
		wrapper.innerHTML = this.options.text;
		return wrapper;
  }
}
module.exports = simpleText;
