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
  document.getElementById('filename').value = "Path: " + filename.filenameToDisplay;
});
//filenameSend is used for both Save and Save As

//open file
function openFile() {
  ipcRenderer.send('openFile', {});
}

ipcRenderer.on('allDataSend', function(a, fileContents) {
  console.log(fileContents);
  document.getElementById('filename').value = "Path: " + fileContents.filename;
  document.getElementById('editor').value = fileContents.fileContents;
});

//save file as another file
function saveAs(textareacontent) {
  ipcRenderer.send('saveAs', {
    content: textareacontent
  });
}