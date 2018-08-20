var content = document.getElementsByClassName("editor").value;

const {ipcRenderer} = require('electron');

function sendToElectron(textareacontent) {
  ipcRenderer.send('asynchronous-message', textareacontent);
};