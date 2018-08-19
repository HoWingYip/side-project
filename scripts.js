var content = document.getElementsByClassName("editor").value;

var ipcRenderer = require('electron');
window.sendToElectron = function(textareacontent) {
  ipcRenderer.send('asynchronous-message', textareacontent);
};