import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        </div>
    );
}