import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

// Counter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", {
      handleCheck: (isChecked) => {
        todoCounter.updateCompleted(isChecked);
      },
      handleDelete: (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      },
    });

    section.addItem(todo.getView());
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// Validation
const addTodoFormValidator = new FormValidator(
  validationConfig,
  addTodoForm
);
addTodoFormValidator.enableValidation();

// Popup
const addTodoPopup = new PopupWithForm(
  "#add-todo-popup",
  (formData) => {
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const newTodo = {
      id: uuidv4(),
      name: formData.name,
      date,
      completed: false,
    };

    const todo = new Todo(newTodo, "#todo-template", {
      handleCheck: (isChecked) => {
        todoCounter.updateCompleted(isChecked);
      },
      handleDelete: (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      },
    });

    section.addItem(todo.getView());
    todoCounter.updateTotal(true);
    addTodoFormValidator.resetValidation();
  }
);

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});