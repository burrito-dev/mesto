
export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this.renderer = renderer;
    }
    renderItems() {
        this._items.forEach((item) => {
            this.renderer(item);
        })
    }
    addItem(element, prepend= false) {
        if (prepend) {
            this._container.prepend(element)
        } else {
            this._container.append(element);
        }
    }
    clear() {
        this._container.innerHTML = '';
    }
}