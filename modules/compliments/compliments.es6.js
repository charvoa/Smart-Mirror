// Made by Antoine Garcia in 2016
import Module from '../Module';

class compliments extends Module{
  constructor(){
    super()
    this.name = "compliments";
    this.options = {
      updateInterval: 30000,
      morning : [
        'Bonjour !',
        'Bonne journée !',
        'J\'espère que tu as bien dormi !'
      ],
      afternoon : [
        'Bon après-midi !',
        'Bientôt la fin de journée !',
        'Comment se déroule votre journée ?'
      ]
    }
  }
  start(mc){
    var self = this;
    setInterval(function() {
      console.log("update DOM");
			mc.updateDom(self)
		}, this.options.updateInterval);
  }

  getComplimentsForHour(hour){
    if (hour >= 3 && hour <= 12){
      return this.options.morning;
    }
    else{
      return this.options.afternoon;
    }
  }

  randomCompliment(){
    var complimentsArray = this.getComplimentsForHour(moment().hour());
    var compliment = complimentsArray[Math.floor(Math.random()*complimentsArray.length)];
    return compliment;
  }
  generateDisplay(){
    var complimentText = this.randomCompliment();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(compliment);

		return wrapper;
  }

  getScripts(){
    return ['moment.js'];
  }
}
module.exports = compliments;
