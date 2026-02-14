import { Sticker } from "./Sticker";

const addButton = document.querySelector<HTMLButtonElement>('#add-sticker-btn');
const stickerContainer = document.querySelector<HTMLDivElement>('#sticker-container');
const stickerList: Sticker[] = [];

function addSticker() {
    if (stickerContainer == null) {
        return;
    }
    const newButton = new Sticker;
    stickerList.push(newButton);

    stickerContainer.appendChild(newButton.getButton());
    stickerContainer.scrollTop = stickerContainer.scrollHeight;
}

addButton?.addEventListener('click', () => {
    addSticker();
})