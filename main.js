const {app,Tray,Menu,BrowserWindow,session} = require('electron');

let mainWindow,secondWindow,tray;
app.on('ready',()=>{

    const defaultSes = session.defaultSession;
    const partition1 = session.fromPartition('partition1');


    mainWindow = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences :{ session : 'partition1' }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed',()=>{
        mainWindow = null;
    });


    secondWindow = new BrowserWindow({
        width : 800,
        height : 600
    });
    secondWindow.loadURL(`file://${__dirname}/index.html`)

    secondWindow.on('closed',()=>{
        secondWindow = null;
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