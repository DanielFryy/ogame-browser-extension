document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.getElementById("status") as HTMLDivElement;
  const actionButton = document.getElementById("actionButton") as HTMLButtonElement;

  actionButton.addEventListener("click", async () => {
    try {
      // Example of sending a message to the background script
      const response = await chrome.runtime.sendMessage({ type: "REFRESH_DATA" });
      console.log("Response from background:", response);

      statusElement.textContent = "Data refreshed successfully!";
      statusElement.style.backgroundColor = "#e8f5e9";
    } catch (error) {
      statusElement.textContent = "Error refreshing data";
      statusElement.style.backgroundColor = "#ffebee";
      console.error("Error:", error);
    }
  });
});

export {};
