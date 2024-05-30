document.addEventListener("DOMContentLoaded", function() {
  const saveUrlButton = document.getElementById("saveUrlButton");
  const saveUrlTab = document.getElementById("saveUrlTab");
  const viewUrlsTab = document.getElementById("viewUrlsTab");
  const saveUrlContent = document.getElementById("saveUrlContent");
  const viewUrlsContent = document.getElementById("viewUrlsContent");
  const urlList = document.getElementById("urlList");

  function saveUrl(url) {
    chrome.storage.sync.get(["savedUrls"], function(result) {
      const savedUrls = result.savedUrls ? result.savedUrls : [];
      savedUrls.push(url);
      chrome.storage.sync.set({ savedUrls: savedUrls }, function() {
        alert("URL saved!");
      });
    });
  }

  function deleteUrl(url) {
    chrome.storage.sync.get(["savedUrls"], function(result) {
      const savedUrls = result.savedUrls ? result.savedUrls : [];
      const updatedUrls = savedUrls.filter(savedUrl => savedUrl !== url);
      chrome.storage.sync.set({ savedUrls: updatedUrls }, function() {
        displayUrls(updatedUrls);
      });
    });
  }

  function displayUrls(urls) {
    urlList.innerHTML = "";
    urls.forEach(url => {
      const li = document.createElement("li");

      // Create anchor element
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.textContent = url;
      anchor.classList.add("url-link");

      // Create copy button
      const copyBtn = document.createElement("button");
      copyBtn.innerHTML = "Copy";
      copyBtn.classList.add("copy-btn");
      copyBtn.addEventListener("click", function() {
        navigator.clipboard.writeText(url).then(() => {
          alert("URL copied to clipboard!");
        });
      });

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function() {
        deleteUrl(url);
      });

      li.appendChild(anchor);
      li.appendChild(copyBtn);
      li.appendChild(deleteBtn);
      urlList.appendChild(li);
    });
  }

  saveUrlButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      saveUrl(activeTab.url);
    });
  });

  saveUrlTab.addEventListener("click", function() {
    saveUrlTab.classList.add("active");
    viewUrlsTab.classList.remove("active");
    saveUrlContent.classList.add("active");
    viewUrlsContent.classList.remove("active");
  });

  viewUrlsTab.addEventListener("click", function() {
    saveUrlTab.classList.remove("active");
    viewUrlsTab.classList.add("active");
    saveUrlContent.classList.remove("active");
    viewUrlsContent.classList.add("active");

    chrome.storage.sync.get(["savedUrls"], function(result) {
      const savedUrls = result.savedUrls ? result.savedUrls : [];
      displayUrls(savedUrls);
    });
  });
});

// ---with firebase---

// import { signInWithPopup, signOut } from "firebase/auth";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { getFirestore } from "@firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// import { getAuth, initializeApp } from "firebase/auth";

// document.addEventListener("DOMContentLoaded", function() {
//   // Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyADkHESO7_7uRgU_9Oc2OY06aA73ypQhRA",
//     authDomain: "polymath-url-saver.firebaseapp.com",
//     projectId: "polymath-url-saver",
//     storageBucket: "polymath-url-saver.appspot.com",
//     messagingSenderId: "585097778496",
//     appId: "1:585097778496:web:455c1d127cdcf47338d6a5",
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();

//   const saveUrlButton = document.getElementById("saveUrlButton");
//   const signInButton = document.getElementById("signInButton");
//   const signOutButton = document.getElementById("signOutButton");
//   const saveUrlTab = document.getElementById("saveUrlTab");
//   const viewUrlsTab = document.getElementById("viewUrlsTab");
//   const saveUrlContent = document.getElementById("saveUrlContent");
//   const viewUrlsContent = document.getElementById("viewUrlsContent");
//   const urlList = document.getElementById("urlList");
//   const tabs = document.querySelector(".tabs");

//   let currentUser = null;

//   signInButton.addEventListener("click", async function() {
//     try {
//       const result = await auth.signInWithPopup(provider);
//       currentUser = result.user;
//       signInButton.style.display = "none";
//       signOutButton.style.display = "block";
//       tabs.style.display = "flex";
//     } catch (error) {
//       console.error("Error signing in: ", error);
//     }
//   });

//   signOutButton.addEventListener("click", async function() {
//     try {
//       await auth.signOut();
//       currentUser = null;
//       signInButton.style.display = "block";
//       signOutButton.style.display = "none";
//       tabs.style.display = "none";
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   });

//   saveUrlButton.addEventListener("click", async function() {
//     if (currentUser) {
//       chrome.tabs.query({ active: true, currentWindow: true }, async function(
//         tabs
//       ) {
//         const activeTab = tabs[0];
//         try {
//           await db.collection("urls").add({
//             uid: currentUser.uid,
//             url: activeTab.url,
//           });
//           alert("URL saved!");
//         } catch (error) {
//           console.error("Error saving URL: ", error);
//         }
//       });
//     } else {
//       alert("Please sign in to save URLs.");
//     }
//   });

//   saveUrlTab.addEventListener("click", function() {
//     saveUrlTab.classList.add("active");
//     viewUrlsTab.classList.remove("active");
//     saveUrlContent.classList.add("active");
//     viewUrlsContent.classList.remove("active");
//   });

//   viewUrlsTab.addEventListener("click", async function() {
//     saveUrlTab.classList.remove("active");
//     viewUrlsTab.classList.add("active");
//     saveUrlContent.classList.remove("active");
//     viewUrlsContent.classList.add("active");

//     if (currentUser) {
//       try {
//         const querySnapshot = await db
//           .collection("urls")
//           .where("uid", "==", currentUser.uid)
//           .get();
//         urlList.innerHTML = "";
//         querySnapshot.forEach(doc => {
//           const url = doc.data().url;
//           const li = document.createElement("li");
//           const span = document.createElement("span");
//           span.textContent = url;
//           const copyBtn = document.createElement("button");
//           copyBtn.textContent = "Copy";
//           copyBtn.classList.add("copy-btn");
//           copyBtn.addEventListener("click", function() {
//             navigator.clipboard.writeText(url).then(() => {
//               alert("URL copied to clipboard!");
//             });
//           });
//           li.appendChild(span);
//           li.appendChild(copyBtn);
//           urlList.appendChild(li);
//         });
//       } catch (error) {
//         console.error("Error retrieving URLs: ", error);
//       }
//     } else {
//       alert("Please sign in to view saved URLs.");
//     }
//   });
// });
