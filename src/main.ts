import { loadStickers, removeSticker, saveSticker } from "./persistence/PersistenceUtil";
import { Sticker } from "./Sticker";

const addButton = document.querySelector<HTMLButtonElement>('#add-sticker-btn');
const stickerContainer = document.querySelector<HTMLDivElement>('#sticker-container');

// adds a new sticker to the list of stickers and the div element.
// also removes the no sticker message if its there
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


// the function that first runs
// sets up event listeners and loading in the stickers
function startUp() {
    // button event listener
    addButton?.addEventListener('click', () => {
        addSticker();
    })

    // window event listener
    window.addEventListener('stickerDeleted', (event: any) => {
        removeSticker(event, () => {
            createNoStickerMessage();
        });
    })

    // loading in stickers
    createNoStickerMessage();
    if (stickerContainer != null) {
        loadStickers(stickerContainer);
        removeNoStickerMessage(stickerContainer);
    }
}

startUp();