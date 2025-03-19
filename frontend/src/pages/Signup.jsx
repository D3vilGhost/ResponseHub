import React from 'react';
import { Link } from 'react-router';
import { Mail, Lock, User } from 'lucide-react';

function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center">
                    <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                        API Monitor
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>

                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault() }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Create account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;