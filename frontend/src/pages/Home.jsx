import { Key, PencilRuler, History } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-6 py-16">
                {/* Hero Section */}
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-8">
                        Seamless API Access
                        <br />
                        <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                            & Real-Time Response
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Skip the hassle of setting up multiple services for testing. Our platform provides
                        seamless API access with real-time responses, offering both flexible and fixed formats
                        to fit your needs.Simplify your testing process and get results faster, all in one place.
                    </p>
                </div>
                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                            <Key className="text-orange-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Instant Access</h3>
                        <p className="text-gray-600">
                            Easily generate and manage your APIs with a straightforward process. Access all the tools you need to integrate quickly and efficiently into your applications.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                            <PencilRuler className="text-pink-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Customizable Formats</h3>
                        <p className="text-gray-600">
                            Choose from a variety of APIs to suit your specific needs — whether you need a fixed structure for consistency or a flexible format for dynamic solutions.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                            <History className="text-purple-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Track & Maintain API History</h3>
                        <p className="text-gray-600">
                            Stay on top of your API usage with detailed records of all interactions. Our platform ensures you can easily access past activity whenever needed.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}