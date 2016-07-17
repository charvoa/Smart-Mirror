// Made by Antoine Garcia in 2016

class Module {
  //You have to override this ! Change this.name to the name of your module.
  constructor(){
    this.options = {}
    this.name = "Module";
  }
  //Call when the module is started.
  start(mc){
    console.log("STARTING MODULE");
  }

  //Method to override if you want to display info on the mirror.
  generateDisplay(){
    var nameDiv =  document.createElement("div");
    var name = document.createTextNode(this.name);
    nameDiv.appendChild(name);

    var div = document.createElement("div");
    div.appendChild(nameDiv);

    return div;
  }

  //Method to override if you want to add custom Scripts.
  getScripts(){
    return [];
  }

  static createFromName(name,options){
    var path = __dirname + '/../modules/' + name + '/' + name;
    var Module = require(path);
    var m = new Module();
    m.options = options;
    return m;
  }
}
module.exports = Module;
