// JS Goes here - ES6 supported

import "./css/main.scss";
import "./js/app.js";

// Import Splide and PhotoSwipe libraries
import { Splide } from '@splidejs/splide';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';

// Make libraries available globally for shortcodes
window.Splide = Splide;
window.PhotoSwipe = PhotoSwipe;
window.PhotoSwipeLightbox = PhotoSwipeLightbox;
window.PhotoSwipeDynamicCaption = PhotoSwipeDynamicCaption;

const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", toggleMobileMenu);
}

