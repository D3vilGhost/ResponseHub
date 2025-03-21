import React from 'react';
import { AlertTriangle } from 'lucide-react';


export default function ConfirmDelete({
    onConfirm,
    onCancel
}) {

    return (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="from-orange-300 to-pink-300 bg-gradient-to-r rounded-lg p-6 w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Confirm Deletion</h3>
                <p className="text-sm text-black text-center mb-6">
                    Are you sure you want to delete this fixed response? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium bg-neutral-100 rounded-md hover:bg-neutral-300 hover:cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}