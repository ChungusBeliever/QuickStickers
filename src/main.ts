const addButton = document.querySelector<HTMLButtonElement>('#add-sticker-btn');
const stickerContainer = document.querySelector<HTMLDivElement>('#sticker-container');

function addSticker() {
    if (stickerContainer == null) {
        return;
    }
    const newButton = document.createElement('button');
    newButton.className = 'sticker';
    newButton.innerText = 'hello';

    stickerContainer.appendChild(newButton);
    stickerContainer.scrollTop = stickerContainer.scrollHeight;
}

addButton?.addEventListener('click', () => {
    addSticker();
})