const {ipcRenderer} = require('electron');

function sendToElectron(textareacontent) {
  //console.log(filename);
  //not used anymore (chosen in dialog)
  console.log(textareacontent);
  ipcRenderer.send('saveFile', {
    content: textareacontent
  });
}
//dialog - not showing...?
const { dialog } = require('electron').remote;
document.querySelector('#saveButton').addEventListener('click', function() {
  dialog.showSaveDialog({
    defaultPath: '~/Documents'
  });
});