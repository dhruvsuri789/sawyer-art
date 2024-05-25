("use strict");

import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextHttpBackend from "i18next-http-backend";

// Theme selection
const htmlEl = document.documentElement;
const themesWrapperEl = document.querySelector(".nav__themes-wrapper");
const mobileThemesWrapperEl = document.querySelector(
  ".nav__mobile-themes-wrapper"
);
const childrenEl = themesWrapperEl.querySelectorAll("label");
const mobileChildrenEl = mobileThemesWrapperEl.querySelectorAll("label");

const setTheme = function (theme) {
  localStorage.setItem("theme", theme);
  htmlEl.dataset.theme = theme;
};

const setChecked = function (selectedEl, selectedMobileEl) {
  childrenEl?.forEach((el) => el.classList.remove("is-radio-checked"));
  mobileChildrenEl?.forEach((el) => el.classList.remove("is-radio-checked"));
  selectedEl?.classList.add("is-radio-checked");
  selectedMobileEl?.classList.add("is-radio-checked");
};

const initTheme = function () {
  const themeValue = localStorage.getItem("theme");
  const value = themeValue ? themeValue : "brown";
  setTheme(value);

  const selectedEl = themesWrapperEl.querySelector(
    `label[data-theme="${value}"]`
  );
  const selectedMobileEl = mobileThemesWrapperEl.querySelector(
    `label[data-theme="${value}"]`
  );
  setChecked(selectedEl, selectedMobileEl);
};
initTheme();

const setSiteTheme = function (e) {
  e.preventDefault();

  const labelEl = e.target.closest("label");
  if (!labelEl) return;
  setTheme(labelEl.dataset.theme);
  initTheme();
};

themesWrapperEl?.addEventListener("click", setSiteTheme);
mobileThemesWrapperEl?.addEventListener("click", setSiteTheme);

// Accordian Animation
const accordianEl = document.querySelector(".accordian");

accordianEl?.addEventListener("click", function (e) {
  e.preventDefault();
  const containertEl = e.target.closest(".accordian_container");
  containertEl?.classList.toggle("is-active");
});

// Mobile nav menu
const hamburgerEl = document.querySelector(".nav__hamburger");
const mobileNavEl = document.querySelector(".nav__mobile");
const navEl = document.querySelector("nav");
const navLinksEl = document.querySelector(".nav__links-wrapper");
hamburgerEl.addEventListener("click", function (e) {
  e.preventDefault();
  mobileNavEl.classList.toggle("is-mobile-showing");
  navEl.classList.toggle("is-mobile-showing");
  hamburgerEl.classList.toggle("is-clicked");
  navLinksEl.classList.toggle("hide");
});

// Lazy loading Images
/**
 * Event listener for DOMContentLoaded to initialize lazy loading of images.
 */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Select all images with the class 'lazyload'.
   * @type {NodeListOf<Element>}
   */
  const lazyLoadImages = document.querySelectorAll("img.lazyload");
  // const lazyLoadImages = document.querySelectorAll(".lazyload");

  /**
   * IntersectionObserver to observe when images come into the viewport.
   * @type {IntersectionObserver}
   */
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyLoadImages.forEach((img) => {
    imageObserver.observe(img);
  });
});

// Adding scrollIn animations
document.addEventListener("DOMContentLoaded", function () {
  // const header = document.querySelector("header");
  // const footer = document.querySelector("footer");
  const sectionEls = document.querySelectorAll("section");

  // const elementsArray = [header, footer, ...sectionEls];

  const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("fadeIn");
        observer.unobserve(el);
      }
    });
  });

  sectionEls.forEach((el) => elementObserver.observe(el));
});

// Translation Service

/**
 * Retrieves an array of all text nodes under a given element.
 *
 * @param { Node } el - The element under which to search for text nodes.
 * @returns { Node[] } An array of text nodes found under the given element.
 */
// function textNodesUnder(el) {
//   const children = []; // Type: Node[]
//   const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
//   while (walker.nextNode()) {
//     children.push(walker.currentNode);
//   }
//   return children;
// }

// console.log(
//   textNodesUnder(document.body).filter(
//     (el) => el.textContent.replace(/\s+/g, " ").trim() !== ""
//   )
// );

// el.textContent.replace(/\s+/g, " ").trim() !== "";

// const getText = function () {
//   const textEls = document.querySelectorAll(`[data-lng]`);
//   const textObject = {};
//   textEls.forEach((el) => {
//     textObject[el.getAttribute(`data-lng`)] = el.textContent
//       .replace(/\s+/g, " ")
//       .trim();
//   });
//   console.log(JSON.stringify(textObject));
// };

// getText();
// setTimeout(getText, 3000);

// app.js
i18next
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init(
    {
      fallbackLng: "en",
      debug: true,
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    },
    function (err, t) {
      // init set content
      updateContent();
    }
  );

function updateContent() {
  // document.querySelector("h1").innerHTML = i18next.t("welcome_message");
  const textEls = document.querySelectorAll(`[data-lng]`);
  textEls.forEach((el) => {
    el.innerHTML = i18next.t(`${el.getAttribute("data-lng")}`);
  });
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

const translateWrapperEl = document.querySelector(".translate-wrapper");
const translateLangsEl = document.querySelector(".translate-langs");

const navMobLngWrapper = document.querySelector(".nav__mobile-lang-wrapper");
const navChildLngEl = navMobLngWrapper.querySelectorAll(".translate-lang");

const changeInNav = function (lang) {
  const selectedEl = navMobLngWrapper.querySelector(`[data-lang="${lang}"]`);
  navChildLngEl.forEach((el) => {
    el.classList.remove("is-selected");
  });
  selectedEl.classList.add("is-selected");
};

const changeInBody = function (lang) {
  const selectedEl = translateWrapperEl.querySelector(`[data-lang="${lang}"]`);
  // Change in body nodes
  const firstChild = translateWrapperEl.firstElementChild;
  firstChild.replaceWith(selectedEl);
  translateLangsEl.appendChild(firstChild);
};

const setLangInStorage = function (e) {
  const selectedEl = e.target.closest(".translate-lang");
  const lang = selectedEl.getAttribute("data-lang");
  const storageLang = localStorage.getItem("lang");

  if (lang === storageLang) return;

  localStorage.setItem("lang", lang);
  changeLanguage(lang);

  changeInNav(lang);
  changeInBody(lang);
};

translateWrapperEl.addEventListener("click", setLangInStorage);
navMobLngWrapper.addEventListener("click", setLangInStorage);

const langInit = function () {
  let lang = localStorage.getItem("lang");

  if (!lang) {
    lang = "en";
    localStorage.setItem("lang", lang);
  }

  const selectedEl = translateWrapperEl.querySelector(`[data-lang="${lang}"`);
  const firstChild = translateWrapperEl.firstElementChild;

  if (firstChild.getAttribute("data-lang") !== lang) {
    firstChild.replaceWith(selectedEl);
    translateLangsEl.appendChild(firstChild);
  }

  changeInNav(lang);
};

langInit();
