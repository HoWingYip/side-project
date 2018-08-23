//my code
//var remote = require('electron');
const { ipcMain } = require('electron');
var fs = require('fs');
const {dialog} = require('electron');
//do NOT change between ES6 and JS syntax because bloody MAGIC

ipcMain.on('newFile', function(createNewFile) {
  //show save dialog (new file)
  dialog.showSaveDialog({
    defaultPath: '~/Document.txt',
    filters: [
      {name: 'Text Files', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ], function(filename) {
      //write the file
      try {
        fs.writeFile(filename, "", function() {
          //writes blank file to disk because creating new
          console.log('New file created!');
          createNewFile.sender.send('newFileData', {
            filenameToDisplay: filename
            //filenameToDisplay is the filename in the object sent to ipcRenderer
          });
        });
      } catch(error) {
        console.error(error);
      }
    }
  });
});

ipcMain.on('saveFile', function (fileDataSend, filedata) {
  //show save dialog
  dialog.showSaveDialog({
    defaultPath: '~/Document.txt',
    filters: [
      {name: 'Text Files', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ]
    //use node fs to save
  }, function(filename) {
    //write the file
    try {
      fs.writeFile(filename, filedata.content, function() {
        console.log('Saved!');
        //change HTML to show filename AFTER save (not to type in filename in page!)
        //send filename back to ipcRenderer to make filename box show filename
        fileDataSend.sender.send('filenameSend', {
          filenameToDisplay: filename
          //filenameToDisplay is the filename in the object sent to ipcRenderer
        });
      });
    } catch(error) {
      console.error(error);
      /*
      bug: if save is cancelled:
      "TypeError: path must be a string or Buffer"
      is thrown
      */
    }
  });
});

ipcMain.on('openFile', function (fileContentSend) {
  //show open dialog
  dialog.showOpenDialog({
    defaultPath: '~/',
    filters: [
      {name: 'Text Files', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ],
    properties: ['openFile']
  }, function(filename) {
    //open the file
    try {
      fs.readFile(filename[0], "utf8", function(err, data) {
        //err is useless because it's gonna be caught later
        console.log("Opened!");
        //console.log(data);
        fileContentSend.sender.send('allDataSend', {
          filename: filename[0],
          fileContents: data
        });
      });
    } catch(error) {
      console.error(error);
    }
  });
});


//app core code, basically
const { app, BrowserWindow } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ show: false });
  win.once('ready-to-show', () => {
    win.show();
  });
  win.maximize();

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Open the DevTools (disabled by me).
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
