let newButton , openButton , saveButton;
let editor;
let menu;
let fileEntry;
let hasWriteAccess;

const { remote} = require('electron');
const { Menu , dialog} = remote;
const fs = require('fs');
const path = require('path');


const handleNewButton=()=>{
    if(true){
        newFile();
        editor.setValue("");
    }
    else{
        window.open(`file://${__dirname}/index.html`)
    }
};
const handleOpenButton=()=>{
    dialog.showOpenDialog({properties : ['OpenFile']} , (filename)=>{
        //path.baseName(filename.toString());
        //handleDocumentChange(filename.toString());
        if(filename){
            onChosenFileToOpen(filename.toString());
        }

    });
};

const onChosenFileToOpen = (theFileEntry)=>{
    setFile(theFileEntry ,false);
    readFileIntoEditor(theFileEntry);
};

const setFile = (theFileEntry , isWritable)=>{
    fileEntry = theFileEntry;
    hasWriteAccess =isWritable;
};

const readFileIntoEditor = (theFileEntry)=>{
    fs.readFile(theFileEntry,(err,data)=>{
        if(err){

        }
        else{
            handleDocumentChange(theFileEntry);
            editor.setValue(String(data));
        }
    })
};

const handleSaveButton=()=>{
    if(fileEntry && hasWriteAccess){
        writeEditorToFile(fileEntry);
    }
    else if (filename){
        dialog.showSaveDialog(filename=>{
            onChosenFileToSave(filename);
        })
    }
};

const onChosenFileToSave = theFileEntry=>{
    setFile(theFileEntry,true);
    writeEditorToFile(theFileEntry);
}

const writeEditorToFile = theFileEntry =>{
  fs.writeFile(theFileEntry,editor.getValue(),err=>{
      if(err){
          console.log(err);
          return;
      }
      else{
          handleDocumentChange(theFileEntry);
          console.log("Write completed.");
      }
  });
};

const newFile = ()=>{
    fileEntry = null;
    hasWriteAccess = false;
    handleDocumentChange(null);
};

const handleDocumentChange = (title)=>{
    let mode = "javascript";
    let modeName = "javascript";
    if(title){
        document.getElementById('title').innerHTML = title
        if(path.extname(title)=== '.json'){
            mode = {name:'javascript',json:true};
            modeName = "javascript (JSON)";
        }
        else if(path.extname(title)=== '.html'){
            mode = 'htmlmixed';
            modeName = "HTML";
        }
        else if(path.extname(title)=== '.css'){
            mode = 'css';
            modeName = "CSS";
        }
    }
    else{
        document.getElementById('title').innerHTML = "[no document loaded]"
    }
    editor.setOption("mode" , mode);
    document.getElementById("mode").innerHTML = modeName;
};

const initContextMenu = ()=>{
    menu = Menu.buildFromTemplate([
        {
            label : "File",
            submenu : [
                {
                    label : "New File",
                    accelerator : 'CmdOrCtrl+N',
                    click(){handleNewButton()}
                },
                {
                    label : "Open File",
                    accelerator : 'CmdOrCtrl+P',
                    click(){handleOpenButton()}
                },
                {
                    label : "Save File",
                    accelerator : 'CmdOrCtrl+S',
                    click(){handleSaveButton()}
                },
                {
                   role:'quit'
                }
            ]
        },
        {
            label : "Edit",
            submenu : [
                {
                    role:'copy'
                },
                {
                    role:'cut'
                },
                {
                    role:'paste'
                }
            ]
        },
        {
            label : "View",
            submenu : [
                {
                    role:'reload'
                },
                {
                    role:'toggledevtools'
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    let contextmenu = Menu.buildFromTemplate([

        {
            label : 'File',
            submenu : [
                {role : 'copy'},
                {role : 'cut'},
                {role : 'paste'}
            ]
        }
    ]);

    window.addEventListener('contextmenu',(event)=>{
        event.preventDefault();
        contextmenu.popup(remote.getCurrentWindow(),event.x,event.y)
    },false)
};

document.addEventListener('DOMContentLoaded',()=>{
    initContextMenu();

    newButton = document.getElementById('new');
    openButton = document.getElementById('open');
    saveButton = document.getElementById('save');

    newButton.addEventListener('click',handleNewButton);
    openButton.addEventListener('click',handleOpenButton);
    saveButton.addEventListener('click',handleSaveButton);

    editor = CodeMirror(
        document.getElementById('editor'),
        {
            mode :{ name : 'javascript' , json : true},
            lineNumbers: true,
            theme : 'lesser-dark'
        }
    )


    newFile();
});