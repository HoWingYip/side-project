const {ipcRenderer} = require('electron');

//save file
function saveFile(textareacontent) {
  //console.log(textareacontent);
  ipcRenderer.send('saveFile', {
    content: textareacontent
  });
}

ipcRenderer.on('filenameSend', function(a, filename) {
  console.log("File path:", filename.filenameToDisplay);
  document.getElementById('filename').innerHTML = "Path: " + filename.filenameToDisplay;
});

//open file
function openFile() {
  ipcRenderer.send('openFile', {});
}

ipcRenderer.on('allDataSend', function(a, fileContents) {
  console.log(fileContents);
  document.getElementById('filename').innerHTML = "Path: " + fileContents.filename;
  document.getElementById('editor').innerHTML = fileContents.fileContents;
});