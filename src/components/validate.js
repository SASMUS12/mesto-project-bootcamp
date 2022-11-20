//Функция, которая добавляет класс с ошибкой
function showInputError(inputElement, formElement, errorMessage, formData) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.classList.add(formData.errorClass);
}

//good Функция ошибки очистки
function hideInputError(inputElement, formElement, formData) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.errorClass);
}

///Функция, которая проверяет валидность поля
function isValid(inputElement, formElement, formData) {
  if (inputElement.validity.valid) {
    inputElement.onblur = () => {
      inputElement.setAttribute("data-used", "true");
    };
    hideInputError(inputElement, formElement, formData);
    return;
  }
  if (inputElement.dataset.used === "true") {
    showInputError(
      inputElement,
      formElement,
      inputElement.validationMessage,
      formData
    );
    return;
  }
  inputElement.onblur = () => {
    inputElement.setAttribute("data-used", "true");
    showInputError(
      inputElement,
      formElement,
      inputElement.validationMessage,
      formData
    );
    return;
  };
}

export function setFormValidityHandler(formElement, formData) {
  const submitButton = formElement.querySelector(formData.submitButtonSelector);
  toggleButtonState(formElement, submitButton, formData);
  formElement.addEventListener("input", (evt) => {
    const inputElement = evt.target;
    isValid(inputElement, formElement, formData);
    toggleButtonState(formElement, submitButton, formData);
  });
}

//функция сброса ошибки
export function resetErrors(formElement, formData) {
  formElement.reset();
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  inputList.forEach((input) => {
    hideInputError(input, formElement, formData);
    input.removeAttribute("data-used");
  });
}

//Добавление функции валидации всем формам
export function enableValidation(formData) {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      resetErrors(form, formData);
    });
    setFormValidityHandler(form, formData);
  });
}

//Функция принимает массив поле
function hasInvalidInput(formElement, formData) {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector)
  );
  return inputList.some((input) => {
    isValid(input, formElement, formData);
    return !input.validity.valid;
  });
}

// Функция cостояние кнопки переключения принимает массив полей ввода
export function toggleButtonState(formElement, button, formData) {
  if (hasInvalidInput(formElement, formData)) {
    button.classList.add(formData.inactiveButtonClass);
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove(formData.inactiveButtonClass);
    button.removeAttribute("disabled", "");
  }
}
