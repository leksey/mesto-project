export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items=items;
        this._renderer=renderer;
        this._containerElement = document.querySelector(containerSelector);
    }

    addItem(item) {
      this._containerElement.prepend(this._renderer(item));
    }

    renderItems() {
      this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}
