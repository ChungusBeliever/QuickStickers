import { Sticker } from "../Sticker";

// saves sticker to browser storage
export async function saveSticker(file: File) {
    const base64 = await fileToBase64(file);
    chrome.storage.local.get(['myStickers'], (result) => {
        const list = result.myStickers as string[] || [];
        list.push(base64);
        chrome.storage.local.set({myStickers: list});
    })
}

// loads in the stickers from browser storage. 
export function loadStickers(stickerContainer: HTMLElement) {
    chrome.storage.local.get(['myStickers'], (result) => {
        const savedStickers = result.myStickers as string[] || [];
        savedStickers.forEach((data: string) => {
            const tempSticker = new Sticker(data);
            stickerContainer?.appendChild(tempSticker.getButton());
        })
    })
}


export function removeSticker(event: any, onEmpty: () => void) {
    chrome.storage.local.get(['myStickers'], (result) => {
        let list = result.myStickers as string[] || [];
        list = list.filter(item => item != event.detail);

        chrome.storage.local.set({myStickers: list}, () => {
            if (list.length == 0) {
                onEmpty();
            }
        });
    });
}

// helper to convert file to base64 string (for saving stickers)
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}