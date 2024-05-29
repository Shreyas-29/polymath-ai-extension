"use client";

import { auth, provider } from "@/firebase";
import { signInWithPopup, User } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from 'react'

const Popup = () => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentTab, setCurrentTab] = useState<"save" | "view">("save");
    const [urls, setUrls] = useState<string[]>([]);

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

    const handleSaveUrl = async () => { };
    const handleDelete = async () => { };
    const handleCopy = async () => { };

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
                    <button className="py-2 rounded-md bg-blue-100 text-blue-500 font-medium text-base text-center w-full hover:bg-blue-200 transition-all duration-300 mt-2">
                        Save Current Tab URL
                    </button>
                </div>
            )}

            {currentTab === "view" && (
                <div className="mt-4 w-full">
                    <ul className="flex flex-col items-start w-full">
                        <li className="py-2 px-4 rounded-md border border-neutral-200 flex items-center justify-between w-full">
                            <Link href="https://www.google.com" target="_blank">
                                Google
                            </Link>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-all duration-300"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-all duration-300"
                                >
                                    Copy
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Popup
