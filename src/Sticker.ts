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
    }

    public getButton(): HTMLButtonElement {
        return this.button;
    }

    public getImageUrl(): String {
        return this.imageUrl;
    }
}