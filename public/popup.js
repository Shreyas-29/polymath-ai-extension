// document.addEventListener("DOMContentLoaded", function ()
// {
//     chrome.storage.sync.get(["savedUrls"], function (result)
//     {
//         const savedUrls = result.savedUrls ? result.savedUrls : [];
//         const urlList = document.getElementById("url-list");

//         savedUrls.forEach((url) =>
//         {
//             const li = document.createElement("li");
//             li.textContent = url;
//             urlList.appendChild(li);
//         });
//     });
// });
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../components/Popup';

ReactDOM.render(<Popup />, document.getElementById('root'));