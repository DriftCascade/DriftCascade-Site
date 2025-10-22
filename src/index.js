// JS Goes here - ES6 supported

import "./css/main.scss";
import "./js/app.js";

const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", toggleMobileMenu);
}

