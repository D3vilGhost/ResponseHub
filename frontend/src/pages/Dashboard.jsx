import React, { useState } from 'react';
import { Wrench, KeySquare, Copy, Check } from 'lucide-react';
import CallRecords from '../components/dashboard/CallRecords';
export default function Dashboard() {
    const [copied, setCopied] = useState(false);
    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">API Usage Dashboard</h1>
                <p className="text-gray-600 text-center mb-12">
                    Overview of API Call Activity and Performance Insights
                </p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Calls Made */}
                <div className="bg-white p-4 rounded-xl shadow-md col-span-1 flex items-center gap-4 ">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Total Calls</p>
                        <code className="text-lg">25</code>
                    </div>
                </div>
                {/* API Key */}
                <div className="bg-white p-4 rounded-xl shadow-md col-span-1 lg:col-span-3
                flex items-center w-full gap-4 ">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <KeySquare className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className='flex-grow'>
                        <p className="text-lg font-semibold">API Key</p>
                        <div className='grid grid-cols-1 rounded-md overflow-x-auto'>
                            <code className='bg-neutral-200 p-2 rounded-md w-max' id="key">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, suscipit.</code>
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
                        }}>
                        <div className='bg-gradient-to-r from-orange-400 to-pink-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            '>

                            {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />} {copied ? "Copied" : "Copy"}
                        </div>

                    </div>
                </div>

            </div>
            {/* API Call Records Table */}
            <CallRecords />
        </div >
    );
}
