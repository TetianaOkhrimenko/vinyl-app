"use strict";

//VARIABLES
const STORAGE_KEY = "isActive";
let favouriteIconsArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
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
  let lastElement = favouriteIconsArray[i][favouriteIconsArray[i].length - 1];
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

footerPages.forEach((page) => {
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
      event.target.value = "";
    }, 5000);
  }
}

function handleDotsButton(button) {
  const pages = [5, 6, 7];
  pages.forEach((p) => {
    const page = document.createElement("button");
    page.className = "footer__btn btn--hover";
    page.setAttribute("data-page", p);
    page.textContent = p;
    button.before(page);
  });
  button.style.display = "none";
}

function handleActivePagination(event) {
  if (event.target.nodeName === "BUTTON") {
    if (event.target.className.includes("btn--dots")) {
      handleDotsButton(event.target);
    }

    const footerPages = document.querySelectorAll(".footer__btn");

    footerPages.forEach((page) => {
      if (page !== event.target) {
        page.classList.remove("btn--active");
        page.classList.add("btn--hover");
      }
    });
    event.target.classList.add("btn--active");
    localStorage.setItem("pageNumber", event.target.textContent);
    event.target.classList.remove("btn--hover");

    const dataPage = event.target.getAttribute("data-page");

    if (dataPage !== "dots") {
      const newUrl =
        dataPage !== null ? `index.html?page=${dataPage}` : "index.html";
      window.location.href = newUrl;
    }
  }
}

//EVENT LISTENERS
backButton.addEventListener("click", handleBackButton);

input.addEventListener("input", showErrorMessage);

favouriteIcons.forEach((icon, i) => {
  icon.addEventListener("click", function (event) {
    if (event.target.nodeName === "DIV") {
      event.target.classList.toggle("favourite-box--active");
      if (event.target.className.includes("favourite-box--active")) {
        favouriteIconsArray[i].push(true);
      } else {
        favouriteIconsArray[i].push(false);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIconsArray));
    }
  });
});

footer.addEventListener("click", handleActivePagination);
