
export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }
    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item);
        })
    }
    addItem(elementData) {
        const element = this._renderer(elementData);
        this._container.prepend(element);
    }
    clear() {
        this._container.innerHTML = '';
    }
}