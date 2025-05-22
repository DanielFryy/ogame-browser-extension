import { saveOptions, loadOptions } from "../utils/helpers";

document.addEventListener("DOMContentLoaded", () => {
  // Load saved options
  loadOptions();

  // Add event listeners for options changes
  const form = document.getElementById("options-form");
  if (form) {
    form.addEventListener("change", saveOptions);
  }
});

export {};
