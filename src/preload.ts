import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
    sendAltTab: () => ipcRenderer.invoke('do-alt-tab')
});