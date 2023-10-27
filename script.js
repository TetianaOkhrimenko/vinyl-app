"use strict";

//VARIABLES

//DOM ELEMENTS
const footer = document.querySelector(".footer");
const favouriteIcons = document.querySelectorAll(".hero__favourite-box");
const collection = document.querySelector(".hero__collection");
const footerPages = document.querySelectorAll(".footer__btn");

//FUNCTIONS

function handleFavouriteIcon(event) {
  if (event.target.className === "hero__favourite-box") {
    event.target.classList.add("favourite-box--active");
  }
}

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
    event.target.classList.remove("btn--hover");
  }
}

//EVENT LISTENERS
collection.addEventListener("click", handleFavouriteIcon);
footer.addEventListener("click", handleActivePagination);
