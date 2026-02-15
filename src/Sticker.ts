export class Sticker {
    private button : HTMLButtonElement;
    private imageUrl: string;

    constructor(imageUrl: string) {
        this.button = document.createElement('button');
        this.imageUrl = imageUrl;
        this.initializeButton();
        this.createImage();
    }

    // copies the image to the clipboard
    private async copyToClipboard() {
        const response = await fetch(this.imageUrl);
        const blob = await response.blob();

        const item = new ClipboardItem({ [blob.type]: blob });

        await navigator.clipboard.write([item]);
        this.button.style.outline = "2px solid green";
        setTimeout(() => this.button.style.outline = "none", 100);
    }

    private remove() {
        if (confirm("Delete?")) {
            this.button.remove();

            const event = new CustomEvent('stickerDeleted', {detail: this.imageUrl});
            window.dispatchEvent(event);
        }
    }

    public getButton(): HTMLButtonElement {
        return this.button;
    }

    public getImageUrl(): String {
        return this.imageUrl;
    }

    // helper function to initialize button
    private initializeButton() {
        this.button.className = 'sticker';
        this.button.addEventListener('click', () => {
            this.copyToClipboard();
        });
        this.button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.remove();
        })
    }

    // helper function to create image
    private createImage() {
        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        this.button.appendChild(img);
    }
}