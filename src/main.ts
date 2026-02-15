import { Sticker } from "./Sticker";

const addButton = document.querySelector<HTMLButtonElement>('#add-sticker-btn');
const stickerContainer = document.querySelector<HTMLDivElement>('#sticker-container');
const stickerList: Sticker[] = [];

// Adds a new sticker to the list of stickers and the div element.
// Also removes the no sticker message if its there
function addSticker() {
    if (stickerContainer == null) {
        return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const imageUrl = URL.createObjectURL(file);
            const newButton = new Sticker(imageUrl);
            stickerList.push(newButton);

            stickerContainer.appendChild(newButton.getButton());
            stickerContainer.scrollTop = stickerContainer.scrollHeight;
            removeNoStickerMessage(stickerContainer);
        }
    })
}

// helper function create the no sticker message
function createNoStickerMessage() {
    if (stickerList.length == 0) {
        const noStickerMessage: HTMLSpanElement = document.createElement('span');
        noStickerMessage.innerText = 'No stickers available. Add one';
        noStickerMessage.id = 'no-sticker-message';
        stickerContainer?.appendChild(noStickerMessage);
    }
}

// helper function remove the no sticker message
function removeNoStickerMessage(stickerContainer: HTMLDivElement) {
    const noStickerMessageMessage = document.querySelector<HTMLSpanElement>('#no-sticker-message');
    if (noStickerMessageMessage != null) {
        stickerContainer?.removeChild(noStickerMessageMessage);
    }
}


// loads in the stickers. Creates a no sticker message if theres no stickers to be loaded
function loadStickers() {
    createNoStickerMessage();
}





addButton?.addEventListener('click', () => {
    addSticker();
})
loadStickers();