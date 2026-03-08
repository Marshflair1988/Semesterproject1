/**
 * Community Science Museum – Mobile navigation
 * Toggles nav visibility and aria-expanded for accessibility.
 */
(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (!navToggle || !mainNav) return;

  function openNav() {
    mainNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  function closeNav() {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function toggleNav() {
    var isOpen = mainNav.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  navToggle.addEventListener("click", function () {
    toggleNav();
  });

  // Close when clicking a nav link (mobile)
  mainNav.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) {
      closeNav();
    }
  });

  // Close on escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  // Close when focus moves outside nav (optional, keeps behaviour simple)
  document.addEventListener("focusin", function (e) {
    if (mainNav.classList.contains("is-open") && !mainNav.contains(e.target) && e.target !== navToggle) {
      closeNav();
    }
  });
})();
