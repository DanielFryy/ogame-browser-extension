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

// Add new option to the menu table
const addOptionToMenu = () => {
  const menuTableElement = document.getElementById("menuTable");
  if (!menuTableElement) return;

  const menuListItem = document.createElement("li");
  const menuItem = document.createElement("a");
  menuItem.className = "menubutton ipiHintable";
  menuItem.href = "#";
  menuItem.accessKey = "";
  menuItem.target = "_self";
  menuItem.setAttribute("data-ipi-hint", "ipiToolbarOverview");
  const menuItemText = document.createElement("span");
  menuItemText.className = "textlabel";
  menuItemText.textContent = "OG-Tools";
  menuItem.appendChild(menuItemText);
  menuListItem.appendChild(menuItem);
  menuTableElement.appendChild(menuListItem);
};

// Initial update - wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    updateUnitCounters();
    addOptionToMenu();
  });
} else {
  updateUnitCounters();
  addOptionToMenu();
}

export {};
