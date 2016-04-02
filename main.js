var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	app.quit();
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {}
});

var storage = require("./storage");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

	var lastWindowState = storage.get("lastWindowState");
	// var lastWindowState = null;

	var defaultHeight = 430;

	if (lastWindowState === null) {
		lastWindowState = {
			width: 400,
			height: defaultHeight,
			resizable: false,
			titleBarStyle: 'hidden-inset',
			fullscreen: false
		}
	}

	mainWindow = new BrowserWindow({
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: lastWindowState.width,
		height: defaultHeight, // lastWindowState.height,
		resizable: false,
		titleBarStyle: 'hidden-inset',
		fullscreen: false
	});

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Menu.setApplicationMenu(menu);

	// mainWindow.openDevTools();

	mainWindow.on('close', function() {
		var bounds = mainWindow.getBounds();
		storage.set("lastWindowState", {
			x: bounds.x,
			y: bounds.y,
			width: bounds.width,
			height: bounds.height,
			resizable: false,
			titleBarStyle: 'hidden-inset',
			fullscreen: false
		});
	});
});