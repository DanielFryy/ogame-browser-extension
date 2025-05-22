// Background script implementation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  sendResponse({ status: "received" });
});

export {};
