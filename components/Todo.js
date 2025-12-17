class Todo {
  constructor(data, templateSelector, { handleCheck, handleDelete }) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".todo")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
      this._handleCheck(this._checkbox.checked);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._element.remove();
    });
  }

  getView() {
    this._element = this._getTemplate();

    this._checkbox = this._element.querySelector(".todo__completed");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");
    const nameEl = this._element.querySelector(".todo__name");
    const dateEl = this._element.querySelector(".todo__date");

    nameEl.textContent = this._data.name;
    this._checkbox.checked = this._data.completed;

    if (this._data.date) {
      const date = new Date(this._data.date);
      dateEl.textContent = `Due: ${date.toLocaleDateString()}`;
    }

    this._setEventListeners();
    return this._element;
  }
}

export default Todo;