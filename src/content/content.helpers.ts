// Content helper functions and data
const getShipItems = (playerClass: PlayerClassType | null): Element[] => {
  if (!playerClass) return [];
  const container = document.getElementById("technologies_battle");
  if (!container) return [];
  const lightFighterItem = container.querySelector(".fighterLight");
  const heavyFighterItem = container.querySelector(".fighterHeavy");
  const cruiserItem = container.querySelector(".cruiser");
  const battleshipItem = container.querySelector(".battleship");
  const battlecruiserItem = container.querySelector(".interceptor");
  const bomberItem = container.querySelector(".bomber");
  const destroyerItem = container.querySelector(".destroyer");
  const deathstarItem = container.querySelector(".deathstar");
  const reaperItem = container.querySelector(".reaper");
  const pathfinderItem = container.querySelector(".explorer");
  const items = [
    lightFighterItem,
    heavyFighterItem,
    cruiserItem,
    battleshipItem,
    battlecruiserItem,
    bomberItem,
    destroyerItem,
    deathstarItem
  ];
  switch (playerClass) {
    case "General":
      return [...items, reaperItem].filter(Boolean);
    case "Discoverer":
      return [...items, pathfinderItem].filter(Boolean);
    default:
      return [...items].filter(Boolean);
  }
};

const getDefenseItems = (): Element[] => {
  const container = document.getElementById("defense");
  if (!container) return [];
  const rocketLauncherItem = container.querySelector(".rocketLauncher");
  const lightLaserItem = container.querySelector(".laserCannonLight");
  const heavyLaserItem = container.querySelector(".laserCannonHeavy");
  const gaussCannonItem = container.querySelector(".gaussCannon");
  const ionCannonItem = container.querySelector(".ionCannon");
  const plasmaTurretItem = container.querySelector(".plasmaCannon");
  const items = [
    rocketLauncherItem,
    lightLaserItem,
    heavyLaserItem,
    gaussCannonItem,
    ionCannonItem,
    plasmaTurretItem
  ].filter(Boolean);
  return items;
};

export const getUnitItems = (playerClass: PlayerClassType | null) => {
  const shipItems = getShipItems(playerClass);
  const defenseItems = getDefenseItems();
  const unitItems = [...shipItems, ...defenseItems];
  return unitItems;
};

export const getPlayerClass = () => {
  const playerClassElement = document.getElementById("characterclass");
  const tooltipElement = playerClassElement?.querySelector("[data-tooltip-title]");
  const tooltipText = tooltipElement?.getAttribute("data-tooltip-title");
  if (!tooltipText) return null;
  const classMatch = tooltipText.match(/Your class:\s*([^<]+)<br>/);
  if (!classMatch?.[1]) return null;
  const playerClass = classMatch[1].trim().split("|")[0] as PlayerClassType;
  return playerClass;
};

export const addItemToDom = (item: Element) => {
  const amountElement = item.querySelector(".amount");
  if (!amountElement) return;

  // Remove existing counter if any
  const existingCounter = item.querySelector(".unit-container");
  if (existingCounter) {
    existingCounter.remove();
  }

  const amount = amountElement.getAttribute("data-value") ?? "0";
  const counterContainer = document.createElement("div");
  counterContainer.className = "unit-container";
  const counter = document.createElement("span");
  counter.className = "unit-counter";
  counter.textContent = Number(amount).toLocaleString();
  counterContainer.appendChild(counter);
  item.appendChild(counterContainer);
};
