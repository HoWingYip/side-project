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
  document.getElementsByClassName('filename')[0].innerHTML = "Path: " + filename.filenameToDisplay;
});

//open file
function openFile() {
  ipcRenderer.send('openFile', {});
  console.log("wtf?");
  //judging by absence of above statement on button click, this is probably a HTML problem...?
}