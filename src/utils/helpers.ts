export async function saveOptions(options: Record<string, any>): Promise<void> {
  return new Promise(resolve => {
    chrome.storage.sync.set(options, () => {
      resolve();
    });
  });
}

export async function loadOptions(): Promise<Record<string, any>> {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, items => {
      resolve(items);
    });
  });
}

export function sendMessage(message: any): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}
