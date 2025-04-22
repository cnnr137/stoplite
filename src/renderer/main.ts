export {};

declare global {
    interface Window {
        api: {
            sendAltTab: () => void;
        }
    }
}

document.getElementById('trigger')!.addEventListener('click', () => {
    window.api.sendAltTab();
})