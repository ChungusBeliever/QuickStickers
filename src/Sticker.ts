export class Sticker {
    private button : HTMLButtonElement;
    private imageUrl: string;

    constructor(imageUrl: string) {
        this.button = document.createElement('button');
        this.button.className = 'sticker';
        this.imageUrl = imageUrl;

        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        this.button.appendChild(img);

        this.button.addEventListener('click', () => {
            this.copyToClipboard();
        })
    }

    public getButton(): HTMLButtonElement {
        return this.button;
    }

    public getImageUrl(): String {
        return this.imageUrl;
    }

    private async copyToClipboard() {
        const response = await fetch(this.imageUrl);
        const blob = await response.blob();

        const item = new ClipboardItem({ [blob.type]: blob });

        await navigator.clipboard.write([item]);
        this.button.style.outline = "2px solid green";
        setTimeout(() => this.button.style.outline = "none", 100);
    }
}