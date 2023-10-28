"use strict";

//VARIABLES
const STORAGE_KEY = "isActive";
let results = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  [],
  [],
  [],
  [],
  [],
  [],
];

//DOM ELEMENTS
const backButton = document.querySelector(".header__btn-back");
const input = document.querySelector(".hero__name-input");
const errorMessage = document.querySelector(".hero__error-message");
const collection = document.querySelector(".hero__collection");
const favouriteIcons = document.querySelectorAll(".hero__favourite-box");
const footer = document.querySelector(".footer");
const footerPages = document.querySelectorAll(".footer__btn");

//LOCAL STORAGE

favouriteIcons.forEach((icon, i) => {
  // results.push([]);

  // let lastElement = [...results][i].pop();
  let lastElement = results[i][results[i].length - 1];
  if (lastElement === true) {
    icon.classList.add("favourite-box--active");
  } else {
    icon.classList.remove("favourite-box--active");
  }
});

if (!localStorage.getItem("pageNumber")) {
  footerPages[0].classList.add("btn--active");
  footerPages[0].classList.remove("btn--hover");
}

footerPages.forEach((page, i) => {
  if (page.textContent === localStorage.getItem("pageNumber")) {
    page.classList.add("btn--active");
    page.classList.remove("btn--hover");
  }
});

//FUNCTIONS

//Кнопка «назад» повертає на попередню сторінку в історії браузера.
function handleBackButton() {
  window.history.back();
}

function showErrorMessage(event) {
  const maxLength = 10;
  if (event.target.value.trim().length > maxLength) {
    errorMessage.style.display = "block";
    errorMessage.style.animation = "fadeIn ease 5s";
    errorMessage.style.animationFillMode = "forwards";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  }
}

//Додавання платівки в колекцію
/*function handleFavouriteIcon(event) {
  if (event.target.nodeName === "DIV") {
    event.target.classList.toggle("favourite-box--active");
    if (event.target.className.includes("favourite-box--active")) {
      results[i].push(true);
    } else {
      results[i].push(false);
    }
    localStorage.setItem("isActive", JSON.stringify(results));
  }
}*/

function handleActivePagination(event) {
  event.preventDefault();

  if (event.target.nodeName === "BUTTON") {
    footerPages.forEach((page) => {
      if (page !== event.target) {
        page.classList.remove("btn--active");
        page.classList.add("btn--hover");
      }
    });
    event.target.classList.add("btn--active");
    localStorage.setItem("pageNumber", event.target.textContent);
    event.target.classList.remove("btn--hover");
  }
}

//EVENT LISTENERS
backButton.addEventListener("click", handleBackButton);

input.addEventListener("input", showErrorMessage);

//collection.addEventListener("click", handleFavouriteIcon);
favouriteIcons.forEach((icon, i) => {
  icon.addEventListener("click", function (event) {
    if (event.target.nodeName === "DIV") {
      event.target.classList.toggle("favourite-box--active");
      if (event.target.className.includes("favourite-box--active")) {
        results[i].push(true);
      } else {
        results[i].push(false);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }
  });
});

footer.addEventListener("click", handleActivePagination);
