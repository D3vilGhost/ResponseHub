import React, { useState } from "react";
import { KeySquare, Copy, Check } from "lucide-react";

export default function ApiKey({
    API_KEY = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, suscipit.",
}) {
    const [copied, setCopied] = useState(false); // to change content of copy button

    return (
        <div className="mb-6 bg-white p-4 rounded-xl shadow-md col-span-1 flex items-center w-full gap-4 ">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <KeySquare className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex-grow">
                <p className="text-lg font-semibold">Your API Key</p>
                <div className="grid  rounded-md overflow-x-auto">
                    <code className="bg-neutral-200 p-2 rounded-md" id="key">
                        {API_KEY}
                    </code>
                </div>
            </div>
            <div
                className="flex-shrink-0 content-center items-center justify-center gap-2 w-fit"
                onClick={(e) => {
                    e.preventDefault();
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                    navigator.clipboard.writeText(API_KEY);
                }}
            >
                <div
                    className="bg-gradient-to-r from-orange-400 to-pink-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            "
                >
                    {copied ? (
                        <Check className="h-6 w-6" />
                    ) : (
                        <Copy className="h-6 w-6" />
                    )}{" "}
                    {copied ? "Copied" : "Copy"}
                </div>
            </div>
        </div>
    );
}
