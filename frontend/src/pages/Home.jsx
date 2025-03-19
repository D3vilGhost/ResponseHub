import { Key, BarChart, Zap } from 'lucide-react';

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
                            & Real-Time Analytics
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Get instant access to powerful API keys and start making calls right away.
                        Our platform not only lets you integrate with ease but also offers detailed analytics to track and optimize every call you make.
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
                            Obtain your personalized API key immediately and start integrating without any delays, making your setup effortless and quick.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                            <BarChart className="text-pink-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Real-Time Insights</h3>
                        <p className="text-gray-600">
                            Track every API call in real-time with detailed analytics to optimize performance and gain valuable usage insights.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                            <Zap className="text-purple-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Optimize Usage</h3>
                        <p className="text-gray-600">
                            Analyze usage patterns to optimize API calls, reduce unnecessary costs, and ensure the most efficient performance possible.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}