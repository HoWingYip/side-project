const {ipcRenderer} = require('electron');

//create new file
function newFile() {
  ipcRenderer.send('newFile', {});
}

ipcRenderer.on('newFileData', function(a, filename) {
  console.log("File path:", filename.filenameToDisplay);
  document.getElementById('filename').value = "Path: " + filename.filenameToDisplay;
  document.getElementById('editor').value = "";
});

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
  //document.getElementById('editor').innerHTML = "";
  document.getElementById('editor').innerHTML = fileContents.fileContents;
});

function saveAs(textareacontent) {
  ipcRenderer.send('saveAs', {
    content: textareacontent
  });
}