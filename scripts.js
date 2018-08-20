const {ipcRenderer} = require('electron');

function sendToElectron(filename, textareacontent) {
  console.log(filename);
  console.log(textareacontent);
  ipcRenderer.send('asynchronous-message', filename);
  ipcRenderer.send('asynchronous-message', textareacontent);
}