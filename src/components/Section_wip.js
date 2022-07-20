export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector);
  }

  addItem(element, item) {
    item.element = element;
    this._container.append(element);
  }

  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

}
