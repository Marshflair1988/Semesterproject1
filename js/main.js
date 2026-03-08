/**
 * Community Science Museum – Global behaviour
 * Lightweight enhancements (e.g. focus management, optional animations).
 */
(function () {
  "use strict";

  // Ensure skip link target has tabindex for older browsers if needed
  var main = document.getElementById("main-content");
  if (main && !main.getAttribute("tabindex")) {
    main.setAttribute("tabindex", "-1");
  }
})();
