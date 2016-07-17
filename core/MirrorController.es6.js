// Made by Antoine Garcia in 2016
const {ipcRenderer} = require('electron');
var Module = require(__dirname + '/modules/Module');

class MirrorController {
  start(){
    var self = this
    ipcRenderer.send('Receiver-Load', 'ping');
    ipcRenderer.on('Display-Modules', (event, arg) => {
      self.displayObjects(arg);
    });
  }

  selectDiv(position){
    var classes = position.replace('_', ' ');
    var parentDiv = document.getElementsByClassName(classes);
    if (parentDiv.length > 0){
      var wrapper =  parentDiv[0].getElementsByClassName("container");
      if (wrapper.length > 0){
        return wrapper[0];
      }
    }
  }

  insertFiles(module){
    var self = this;
    self.scripts = [];
    var loader = new Loader();
    loader.loadScripts();
    //console.log(module.getScripts());
  }

  displayObjects(modulesJSON){
    var modules = []
    var self = this;
    modulesJSON.forEach(function (module) {
      var m = Module.createFromName(module.name,module.options);
      modules.push(m);
    });
    var i = 0;
    modules.forEach(function (module) {
      self.insertFiles(module);
      var wrapper = self.selectDiv(module.options.position);
      var dom = document.createElement("div");
			dom.id = module.name + i;
      module.identifier = dom.id
			dom.className = module.name;
      wrapper.appendChild(dom);
      var moduleContent = document.createElement("div");
			moduleContent.className = "module-content";
			dom.appendChild(moduleContent);
      self.updateDom(module);
      i++;
      module.start(self);
    });
  }

  updateDom(module){
    console.log("updateDom");
    var newContent = module.generateDisplay();
    this.updateModuleContent(module,newContent);
  }

  updateModuleContent(module,content){
    var moduleWrapper = document.getElementById(module.identifier);
    var contentWrapper = moduleWrapper.getElementsByClassName("module-content")[0];
    contentWrapper.innerHTML = null;
    contentWrapper.appendChild(content);
  }
}
var mc = new MirrorController();
mc.start();
