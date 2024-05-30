"use client";

import { auth, provider } from "@/firebase";
import { signInWithPopup, User } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from 'react'

const Popup = () => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentTab, setCurrentTab] = useState<"save" | "view">("save");
    const [urls, setUrls] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const handleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            setCurrentUser(res.user);
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setCurrentUser(null);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleSaveUrl = async () => {
        // here first check for the input value if yes then push that url to localstorage and seturls if not then save the current tab url
        if (input) {
            const existingUrls = JSON.parse(localStorage.getItem('savedUrls')!) || [];
            const updatedUrls = [...existingUrls, input];
            setUrls(updatedUrls);
            localStorage.setItem('savedUrls', JSON.stringify(updatedUrls));
            setInput("");
            alert("URL saved successfully!");
        } else {
            let url = window.location.href;
            try {
                const existingUrls = JSON.parse(localStorage.getItem('savedUrls')!) || [];
                existingUrls.push(url);
                setUrls(existingUrls);
                localStorage.setItem('savedUrls', JSON.stringify(existingUrls));
                alert("URL saved to local storage successfully!");
            } catch (error) {
                console.error("Error saving URL to local storage:", error);
                alert("Failed to save URL locally!"); // Informative error message
            }
        }
    };

    const handleCopy = async () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert("URL copied successfully!");
    };

    const handleDelete = async (url: string) => {
        // make here function to delete the url from the list
        const existingUrls = JSON.parse(localStorage.getItem('savedUrls')!) || [];
        const updatedUrls = existingUrls.filter((u: string) => u !== url);
        setUrls(updatedUrls);
        localStorage.setItem('savedUrls', JSON.stringify(updatedUrls));
        alert("URL deleted successfully!");
    };

    // using useffect load the urls from localstorage
    useEffect(() => {
        const existingUrls = JSON.parse(localStorage.getItem('savedUrls')!) || [];
        setUrls(existingUrls);
    }, []);

    return (
        <div className="p-8 flex flex-col items-center justify-center w-full rounded-2xl border border-neutral-200 max-w-md">
            <h1 className="text-xl font-semibold text-center">
                Polymath URL Saver
            </h1>
            <div className="flex items-center justify-center mt-4 w-full">
                {currentUser ? (
                    <button className="py-2 rounded-md bg-red-500 text-white font-medium text-base text-center w-full hover:bg-red-600 transition-all duration-300">
                        Sign out
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="py-2 rounded-md bg-blue-500 text-white font-medium text-base text-center w-full hover:bg-blue-600 transition-all duration-300"
                    >
                        Sign in with Google
                    </button>
                )}
            </div>

            <div className="flex justify-between mt-4 w-full p-1 rounded-lg bg-neutral-200/60">
                <button
                    type="button"
                    onClick={() => setCurrentTab("save")}
                    className={`py-1.5 rounded-md font-medium text-sm text-center w-full text-neutral-90 transition-all duration-300 ${currentTab === "save" ? "bg-white" : "bg-transparent"}`}
                >
                    Save URL
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentTab("view")}
                    className={`py-1.5 rounded-md font-medium text-sm text-center w-full text-neutral-90 transition-all duration-300 ${currentTab === "view" ? "bg-white" : "bg-transparent"}`}
                >
                    View URLs
                </button>
            </div>

            {currentTab === "save" && (
                <div className="mt-4 w-full">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter URL"
                        className="py-2 px-4 rounded-md border border-neutral-200 w-full"
                    />
                    <button
                        type="button"
                        onClick={handleSaveUrl}
                        className="py-2 rounded-md bg-blue-100 text-blue-500 font-medium text-base text-center w-full hover:bg-blue-200 transition-all duration-300 mt-4"
                    >
                        Save Current Tab URL
                    </button>
                </div>
            )}

            {currentTab === "view" && (
                <div className="mt-4 w-full">
                    <ul className="flex flex-col items-start w-full gap-3">
                        {urls.map((url, index) => (
                            <li key={index} className="py-2 px-4 rounded-md border border-neutral-200 flex items-center justify-between w-full">
                                <Link href={url} target="_blank">
                                    {url.trim().length > 30 ? `${url.slice(0, 30)}...` : url}
                                </Link>
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-all duration-300"
                                    >
                                        Copy
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(url)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Popup
