let newButton , openButton , saveButton;
let editor;
let menu;
let fileEntry;
let hasWriteAccess;

const { remote} = require('electron');
const { Menu , dialog} = remote;
const fs = require('fs');

const handleNewButton=()=>{
    console.log('new');
};
const handleOpenButton=()=>{

};
const handleSaveButton=()=>{

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
});