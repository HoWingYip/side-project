const {ipcRenderer} = require('electron');

function sendToElectron(filename, extension, textareacontent) {
  console.log(filename);
  console.log(textareacontent);
  ipcRenderer.send('asynchronous-message', {
    filename: filename,
    extension: extension,
    content: textareacontent
  });
}
//dialog - not showing...?
const { dialog } = require('electron').remote;
console.log(dialog);