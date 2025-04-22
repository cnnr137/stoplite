import {app, ipcMain, BrowserWindow} from "electron";
import { keyboard, Key } from "@nut-tree-fork/nut-js";
import { fileURLToPath } from "url";
import * as path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

let mainWindow : BrowserWindow

function createWindows (): void {
    const preloadPath = path.join(__dirname, "/preload.js");
    console.log("-> preloadPath:", preloadPath);
    console.log("-> existsSync", fs.existsSync(preloadPath))

    mainWindow = new BrowserWindow({
        width: 450, height: 150,
        resizable: true,
        x: 25, y: 25,
        alwaysOnTop: true,
        webPreferences: {
            preload: preloadPath
        },
        show: false
    });

    mainWindow.loadFile("./index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show())
}

// function handleResponse(keys: string): void {
//     ipcMain.handle()
// }
ipcMain.handle('do-alt-tab', async () => {
    await keyboard.pressKey(Key.LeftAlt);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.releaseKey(Key.LeftAlt)
    console.log("should have alt-tabbed")
})

app.on("ready", createWindows);