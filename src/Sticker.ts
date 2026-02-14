export class Sticker {
    private button : HTMLButtonElement;

    constructor() {
        this.button = document.createElement('button');
        this.button.className = 'sticker';
        this.button.innerText = 'hello';
    }

    public getButton(): HTMLButtonElement {
        return this.button;
    }
}