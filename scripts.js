const {ipcRenderer} = require('electron');

//save file
function save(textareacontent) {
  //console.log(textareacontent);
  ipcRenderer.send('saveFile', {
    content: textareacontent
  });
}

ipcRenderer.on('filenameSend', function(a, filename) {
  console.log("File path:", filename.filenameToDisplay);
  document.getElementsByClassName('filename')[0].innerHTML = "Path: " + filename.filenameToDisplay;
});

//open file
function open() {
  ipcRenderer.send('openFile', {});
  console.log("wtf?");
}