const {app,Tray,Menu,BrowserWindow} = require('electron');

let mainWindow,tray;
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width : 800,
        height : 600
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed',()=>{
        mainWindow = null;
    });


    tray = new Tray('./img/32x32/file_edit.png');
    const contextMenu = Menu.buildFromTemplate([
        {
            label : 'item 1',
            click(){console.log('click on tray')}
        },
        {role : 'quit'}
    ]);
    tray.setToolTip("Pogrammed By Sayyed Jamal Ghasemi");
    tray.setContextMenu(contextMenu);

    tray.on('click',()=>{
        mainWindow.isMinimized()?mainWindow.restore():mainWindow.minimize();
    });


});