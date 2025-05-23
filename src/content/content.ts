import { addItemToDom, getPlayerClass, getUnitItems } from "./content.helpers";

// Add content.css to the page
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = browser.runtime.getURL("content/content.css");
document.head.appendChild(link);

// Add counters to ship/defense structures
const updateUnitCounters = () => {
  const playerClass = getPlayerClass();
  const unitItems = getUnitItems(playerClass);
  unitItems.forEach(addItemToDom);
};

// Initial update - wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateUnitCounters);
} else {
  updateUnitCounters();
}

export {};
