<img src="https://github.com/Shreyas-29/polymath-ai-extension/assets/111555846/bb23c90f-b279-429e-a666-01b9a86dd520" alt="Logo" width="60px"> 

# Polymath AI Chrome Extension

## Description
This Chrome extension allows users to save the URL of the current page they are visiting with a single click. Users can also view all saved URLs in a separate tab. The extension uses Manifest V3, Node.js, Next.js, and Firebase as the backend database.

## Tech Stack
- HTML
- CSS
- JavaScript
- Next.js
- Firebase
- Chrome Extensions API

## Features
- **Save Current Page URL:** Users can save the URL of the page they are currently on.
- **View Saved URLs:** Users can view all the URLs they have saved in a list format.
- **Copy URL:** Users can copy any saved URL to the clipboard.
- **Delete URL:** Users can delete any saved URL from the list.

## Assumptions
- Each user will have their own list of URLs.
- Users must be authenticated to save and view their URLs.
- Basic familiarity with Chrome Extensions and Firebase setup.

## Pain Points
1. **Integration of Firebase in Plain JS:**
   - Error encountered: `Uncaught SyntaxError: Cannot use import statement outside a module`.
   - Solution: Firebase integration is straightforward in Next.js, but integrating Firebase in plain JavaScript for a Chrome extension proved challenging due to module system differences.

2. **Google Auth Authentication:**
   - Error encountered during Google Auth: Issues with integrating Firebase Auth with plain JS.
   - Solution: Using Firebase Authentication in a plain JS environment requires additional configurations and handling that are natively supported in Next.js.

## Error Screenshots
![Save URL Tab](https://github.com/Shreyas-29/polymath-ai-extension/assets/111555846/f8b07370-53f5-407c-800d-0535ebda7dd0)

## Conclusion
I have developed a Chrome extension that allows users to save and view URLs using HTML, CSS, JavaScript, and Next.js, with Firebase as the backend. This project provided a valuable learning experience, especially in terms of integrating Firebase and handling Google Authentication within a plain JavaScript environment. I have gained a deeper understanding of using Firebase with Chrome Extension APIs and Next.js. While there were challenges, particularly with the module system and authentication, I have been able to overcome many of them and build a functional extension. I am confident in my ability to tackle similar challenges in future projects and am excited to continue learning and improving.
