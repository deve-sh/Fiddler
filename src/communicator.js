// Script to check for Local Storage.
// And to also set the local storage.

function checkForSB() {
  let listofsandboxes = [];

  if (localStorage.getItem("sandboxes")) {
    listofsandboxes = JSON.parse(localStorage.getItem("sandboxes"));

    if (!Array.isArray(listofsandboxes)) {
      // If the local storage was tampered with.
      listofsandboxes = [];

      localStorage.setItem("sandboxes", JSON.stringify(listofsandboxes));
    }
  } else {
    // Otherwise, there is no data stored.
    // Create an empty local storage data item.

    localStorage.setItem("sandboxes", JSON.stringify(listofsandboxes));
  }

  return listofsandboxes.slice(0, 10); // A user is allowed to have a max of 10 sandboxes. To reduce the change of them filling up the localStorage.
}

// Function to validate if a sandbox with a given SID exists in the database.

function validateSID(sid) {
  if (!sid || typeof sid !== "string") {
    throw new Error("Bad Request");
  } else {
    let sandBoxes = checkForSB();
    if (sandBoxes.length === 0) {
      return false; // SID not found in the local Storage.
    } else {
      for (let i in sandBoxes) {
        if (sandBoxes[i].sid === sid) return true;
      }
    }

    return false; // SID not found in the local Storage. After all iterations.
  }
}

function retreiveData(sid) {
  if (!sid || typeof sid !== "string") {
    throw new Error("Bad Request");
  } else {
    if (checkForSB().length === 0) {
      return {}; // Return an empty object if the localStorage is empty.
    } else {
      let sandBoxes = checkForSB();
      for (let i in sandBoxes) {
        if (sandBoxes[i].sid === sid) {
          return sandBoxes[i]; // Return the entry in the localhost.
        }
      }
    }

    return {};
  }
}

function getSid() {
  // Function to get a unique sid.

  let chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$!";
  let uniqueSid = "";

  for (let i = 0; i < 32; i++) {
    uniqueSid += chars[Math.floor(Math.random() * chars.length)];
  }

  if (validateSID(uniqueSid)) {
    // Checking if the localstorage object already has an sid as such.
    return getSid();
  } else {
    return uniqueSid; // Return it if the sid doesn't exist already.
  }
}

function getQueryP() {
  // Function to get a query parameter from the URL.

  let currentUrl = window.location;

  currentUrl = new URL(currentUrl);

  let sid = currentUrl.searchParams.get("sid");

  if (sid) return sid;

  return "";
}

export {
  checkForSB,
  retreiveData,
  getSid,
  getQueryP,
  validateSID
};
