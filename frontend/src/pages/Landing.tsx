import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';

export function Landing() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        <span>Powered by AI & Blockchain</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Autonomous Energy DAO
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                        AI-powered community solar investments. Buy cheap, sell high, distribute profits—all automatically.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/dashboard" className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2">
                            Launch Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/member" className="btn-secondary px-8 py-4 text-lg">
                            Join DAO
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={TrendingUp}
                        title="Autonomous Trading"
                        description="AI agent monitors energy prices 24/7 and executes optimal buy/sell decisions based on constitutional rules."
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Transparent Governance"
                        description="All trades are on-chain and verifiable. Members vote on constitutional amendments and thresholds."
                    />
                    <FeatureCard
                        icon={Users}
                        title="Fair Profit Sharing"
                        description="Profits distributed proportionally to all members based on their share allocation."
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-4 py-20">
                <div className="glass-card p-12 text-center">
                    <h2 className="text-3xl font-bold mb-12">The Problem We Solve</h2>
                    <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-300">
                        <p>
                            <strong className="text-primary">Community solar projects fail</strong> because manual governance is slow and members don't trust treasurers.
                        </p>
                        <p>
                            <strong className="text-primary">GeoAgent DAO</strong> lets AI handle operations within constitutional rules—buy cheap, sell high, distribute profits automatically.
                        </p>
                        <p className="text-2xl font-bold text-primary mt-8">
                            Zero trust. Maximum efficiency. 100% transparent.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
    return (
        <div className="glass-card p-8 hover:bg-card-hover transition-all hover:scale-105">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}
