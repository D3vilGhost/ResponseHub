import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader() {
    return (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center">
            <div className="bg-orange-100 border-1 shadow-lg rounded-lg p-6">
                <Loader2 className="w-10 h-10 text-orange-500  animate-spin" />
            </div>
        </div>
    );
}