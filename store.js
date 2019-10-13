const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {

  // Create or use a json
  constructor(opts) {

    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }
  
  // Get a value with a key
  get(key) {
    return this.data[key];
  }
  
  // Set a value with a key
  set(key, val) {
    this.data[key] = val;

    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  // Show a path the JSON 
  showUserDataPathConsole(){
    console.log(this.path)
  }
}

function parseDataFile(filePath, defaults) {

  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}

// expose the class
module.exports = Store;
