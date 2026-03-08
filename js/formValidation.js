(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput = document.getElementById("contact-name");
  var emailInput = document.getElementById("contact-email");
  var subjectInput = document.getElementById("contact-subject");
  var messageInput = document.getElementById("contact-message");
  var successEl = document.getElementById("form-success");

  var minMessageLength = 10;

  function getErrorEl(fieldId) {
    return document.getElementById(fieldId + "-error") || document.querySelector("#" + fieldId + "[aria-describedby]")?.getAttribute("aria-describedby");
  }

  function showError(input, message) {
    var id = input.id;
    var errorEl = document.getElementById(id + "-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    var errorEl = document.getElementById(input.id + "-error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
    input.classList.remove("invalid");
    input.setAttribute("aria-invalid", "false");
  }

  function clearAllErrors() {
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
      if (input) clearError(input);
    });
  }

  function hideSuccess() {
    if (successEl) {
      successEl.hidden = true;
    }
  }

  function showSuccess() {
    if (successEl) {
      successEl.hidden = false;
      successEl.focus();
    }
  }

  function isValidEmail(value) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  function validateName() {
    var value = nameInput.value.trim();
    if (value.length === 0) {
      showError(nameInput, "Name is required.");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    var value = emailInput.value.trim();
    if (value.length === 0) {
      showError(emailInput, "Email is required.");
      return false;
    }
    if (!isValidEmail(value)) {
      showError(emailInput, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validateSubject() {
    var value = subjectInput.value.trim();
    if (value.length === 0) {
      showError(subjectInput, "Subject is required.");
      return false;
    }
    clearError(subjectInput);
    return true;
  }

  function validateMessage() {
    var value = messageInput.value.trim();
    if (value.length === 0) {
      showError(messageInput, "Message is required.");
      return false;
    }
    if (value.length < minMessageLength) {
      showError(messageInput, "Message must be at least " + minMessageLength + " characters.");
      return false;
    }
    clearError(messageInput);
    return true;
  }

  function validateForm() {
    clearAllErrors();
    hideSuccess();

    var nameOk = validateName();
    var emailOk = validateEmail();
    var subjectOk = validateSubject();
    var messageOk = validateMessage();

    if (nameOk && emailOk && subjectOk && messageOk) {
      showSuccess();
      form.reset();
      clearAllErrors();
      return false;
    }

    var firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
  });

  // Clear field error on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener("input", function () {
      clearError(input);
    });
    input.addEventListener("blur", function () {
      if (input === nameInput) validateName();
      if (input === emailInput) validateEmail();
      if (input === subjectInput) validateSubject();
      if (input === messageInput) validateMessage();
    });
  });
})();
