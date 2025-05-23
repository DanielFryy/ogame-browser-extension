// Add content.css to the page
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = browser.runtime.getURL("content/content.css");
document.head.appendChild(link);

const getShipItems = (): Element[] => {
  const container = document.getElementById("technologies_battle");
  if (!container) return [];
  const shipsItems = container.querySelectorAll(".technology[data-technology]");
  return [...shipsItems];
};

const getDefenseItems = (): Element[] => {
  const container = document.getElementById("defense");
  if (!container) return [];
  const rocketLauncherItem = container.querySelector(".rocketLauncher");
  const laserCannonLightItem = container.querySelector(".laserCannonLight");
  const laserCannonHeavyItem = container.querySelector(".laserCannonHeavy");
  const gaussCannonItem = container.querySelector(".gaussCannon");
  const ionCannonItem = container.querySelector(".ionCannon");
  const plasmaCannonItem = container.querySelector(".plasmaCannon");
  const items = [
    rocketLauncherItem,
    laserCannonLightItem,
    laserCannonHeavyItem,
    gaussCannonItem,
    ionCannonItem,
    plasmaCannonItem
  ].filter(Boolean);
  return items;
};

const getUnitItems = () => {
  const shipItems = getShipItems();
  const defenseItems = getDefenseItems();
  const unitItems = [...shipItems, ...defenseItems];
  return unitItems;
};

// Add counters to defense structures
const updateUnitCounters = () => {
  const unitItems = getUnitItems();
  unitItems.forEach(item => {
    const amountElement = item.querySelector(".stockAmount");
    if (!amountElement) return;

    // Remove existing counter if any
    const existingCounter = item.querySelector(".unit-container");
    if (existingCounter) {
      existingCounter.remove();
    }

    const amount = amountElement.textContent ? amountElement.textContent.trim() : "0";
    const counterContainer = document.createElement("div");
    counterContainer.className = "unit-container";
    const counter = document.createElement("span");
    counter.className = "unit-counter";
    counter.textContent = amount;
    counterContainer.appendChild(counter);
    item.appendChild(counterContainer);
  });
};

// Initial update - wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateUnitCounters);
} else {
  updateUnitCounters();
}

export {};
