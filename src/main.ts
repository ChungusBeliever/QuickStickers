import { Sticker } from "./Sticker";

const addButton = document.querySelector<HTMLButtonElement>('#add-sticker-btn');
const stickerContainer = document.querySelector<HTMLDivElement>('#sticker-container');

// Adds a new sticker to the list of stickers and the div element.
// Also removes the no sticker message if its there
function addSticker() {
    if (!stickerContainer) return; // null check

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const imageUrl = URL.createObjectURL(file);
            const newButton = new Sticker(imageUrl);

            stickerContainer.appendChild(newButton.getButton());
            stickerContainer.scrollTop = stickerContainer.scrollHeight;

            saveSticker(file);
            removeNoStickerMessage(stickerContainer);
        }
    })
}

// removes the most recently added sticker
function removeSticker(event: any) {
    chrome.storage.local.get(['myStickers'], (result) => {
        let list = result.myStickers as string[] || [];
        list = list.filter(item => item != event.detail);
        chrome.storage.local.set({myStickers: list});

        if (list.length == 0) {
            createNoStickerMessage();
        }
    });
}

// saves sticker to browser storage
async function saveSticker(file: File) {
    const base64 = await fileToBase64(file);
    chrome.storage.local.get(['myStickers'], (result) => {
        const list = result.myStickers as string[] || [];
        list.push(base64);
        chrome.storage.local.set({myStickers: list});
    })
}

// loads in the stickers from browser storage. 
// creates a no sticker message if theres no stickers to be loaded
function loadStickers() {
    createNoStickerMessage();
    chrome.storage.local.get(['myStickers'], (result) => {
        const savedStickers = result.myStickers as string[] || [];
        savedStickers.forEach((data: string) => {
            const tempSticker = new Sticker(data);
            stickerContainer?.appendChild(tempSticker.getButton());

            if (stickerContainer != null) {
                removeNoStickerMessage(stickerContainer);
            }
        })
    })
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

// helper function create the no sticker message
function createNoStickerMessage() {
    const noStickerMessage: HTMLSpanElement = document.createElement('span');
    noStickerMessage.innerText = 'No stickers available. Add one';
    noStickerMessage.id = 'no-sticker-message';
    stickerContainer?.appendChild(noStickerMessage);
}

// helper function remove the no sticker message
function removeNoStickerMessage(stickerContainer: HTMLDivElement) {
    const noStickerMessageMessage = document.querySelector<HTMLSpanElement>('#no-sticker-message');
    if (noStickerMessageMessage != null) {
        stickerContainer?.removeChild(noStickerMessageMessage);
    }
}



addButton?.addEventListener('click', () => {
    addSticker();
})

window.addEventListener('stickerDeleted', (event: any) => {
    removeSticker(event);
})

loadStickers();