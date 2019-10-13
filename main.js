const { app, BrowserWindow } = require('electron')
const Store = require('./store.js');

let win

// Store the podcast's rss
const store = new Store({
  configName: 'user-data'
});

store.showUserDataPathConsole()

function createWindow () {

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('app/index.html')

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})