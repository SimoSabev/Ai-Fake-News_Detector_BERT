"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, Loader2, Newspaper } from "lucide-react"

export default function Home() {
    const [text, setText] = useState("")
    const [result, setResult] = useState<{ prediction: string; confidence: string } | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!text.trim()) return
        setLoading(true)
        setResult(null)

        const res = await fetch("/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        })

        const data = await res.json()
        setResult(data)
        setLoading(false)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 to-purple-600/8"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.08) 1px, transparent 0)",
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            {/* Subtle floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative w-full max-w-3xl z-10">
                {/* Main Card */}
                <div className="bg-white/8 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Enhanced Header */}
                    <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border-b border-white/10 p-10 text-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl relative">
                                <Shield className="w-10 h-10 text-white drop-shadow-lg" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3 tracking-tight">
                                Fake News Detector
                            </h1>
                            <p className="text-xl text-gray-300/90 font-medium">Advanced AI-powered news verification system</p>
                        </div>
                    </div>

                    <div className="p-10">
                        {/* Input Section */}
                        <div className="space-y-8">
                            <div className="relative">
                                <label className="block text-lg font-semibold text-gray-200 mb-4 flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                        <Newspaper className="w-5 h-5 text-blue-400" />
                                    </div>
                                    News Article Text
                                </label>
                                <div className="relative group">
                  <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your news article text here for comprehensive analysis..."
                      className="w-full h-48 p-6 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/50 resize-none backdrop-blur-sm transition-all duration-300 text-lg leading-relaxed group-hover:border-white/20"
                  />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                        {text.length} characters
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !text.trim()}
                                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-2xl hover:shadow-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-lg relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <div className="relative flex items-center gap-4">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span>Analyzing Article...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="w-6 h-6" />
                                            <span>Verify News Authenticity</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Enhanced Results Section */}
                        {result && (
                            <div className="mt-10 animate-in slide-in-from-bottom-8 duration-700">
                                <div
                                    className={`p-8 rounded-3xl border-2 backdrop-blur-xl relative overflow-hidden ${
                                        result.prediction === "Real"
                                            ? "bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-green-500/40"
                                            : "bg-gradient-to-br from-red-500/15 to-orange-500/10 border-red-500/40"
                                    }`}
                                >
                                    {/* Subtle background pattern */}
                                    <div className="absolute inset-0 opacity-30">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage:
                                                    "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0)",
                                                backgroundSize: "40px 40px",
                                            }}
                                        ></div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center justify-center mb-8">
                                            {result.prediction === "Real" ? (
                                                <div className="flex items-center gap-4">
                                                    <div className="p-4 bg-green-500/25 rounded-2xl shadow-xl border border-green-500/30">
                                                        <CheckCircle className="w-12 h-12 text-green-400 drop-shadow-lg" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-green-400 mb-2">Verified Real</h3>
                                                        <p className="text-green-300/90 text-lg">This appears to be legitimate news</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <div className="p-4 bg-red-500/25 rounded-2xl shadow-xl border border-red-500/30">
                                                        <AlertTriangle className="w-12 h-12 text-red-400 drop-shadow-lg" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-red-400 mb-2">Potentially Fake</h3>
                                                        <p className="text-red-300/90 text-lg">This content may be misleading</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enhanced Confidence Meter */}
                                        <div className="mt-8">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-lg font-semibold text-gray-200">Confidence Level</span>
                                                <span className="text-2xl font-bold text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                          {result.confidence}
                        </span>
                                            </div>
                                            <div className="relative">
                                                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden shadow-inner border border-white/20">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-2000 ease-out relative ${
                                                            result.prediction === "Real"
                                                                ? "bg-gradient-to-r from-green-500 via-green-400 to-emerald-400"
                                                                : "bg-gradient-to-r from-red-500 via-red-400 to-orange-400"
                                                        }`}
                                                        style={{ width: result.confidence }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-full"></div>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-400 mt-3">
                                                    <span>Low</span>
                                                    <span>High</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced Additional Info */}
                                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                                                    <Shield className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-300 leading-relaxed">
                                                        This analysis is based on AI pattern recognition and should be used as a guide alongside
                                                        critical thinking and fact-checking.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-400 text-lg font-medium">Powered by advanced machine learning algorithms</p>
                </div>
            </div>
        </main>
    )
}
