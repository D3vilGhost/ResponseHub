import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function EditFixedResponse({ onCancel, onSave }) {
    const [formData, setFormData] = useState({
        endpoint: '',
        method: 'GET',
        response: '{\n\tyourResponse : "goesHere"\n}'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center p-4 overflow-auto">
            <div className="from-orange-300 to-pink-300 bg-gradient-to-r rounded-lg p-6 w-full max-w-md border-1">
                <h2 className="text-2xl font-bold mb-4">Edit Fixed Response</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium pb-2">Endpoint</label>
                            <input
                                type="text"
                                required
                                className="p-2 block w-full rounded-md  bg-orange-100 shadow-sm"
                                value={formData.endpoint}
                                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                                placeholder='/enter/your/endpoint/here'

                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium pb-2">Method</label>
                            <select
                                className="p-2 block w-full rounded-md bg-orange-100 shadow-sm "
                                value={formData.method}
                                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                            >
                                <option value="GET" className=''>GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>

                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium pb-2">Response</label>
                            <code>
                                <textarea
                                    required
                                    className="p-2 block w-full rounded-md  bg-orange-100 shadow-sm"
                                    rows={4}
                                    value={formData.response}
                                    onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                                />
                            </code>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium bg-neutral-100 rounded-md hover:bg-neutral-300 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 text-sm font-medium text-black bg-gradient-to-r from-green-300 to-green-500 rounded-md hover:from-green-500 hover:to-green-700 hover:cursor-pointer"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}