import React from 'react';
import { useAccount } from 'wagmi';
import { useTreasuryData } from '@/hooks/useTreasuryData';
import { useGovernanceParams } from '@/hooks/useGovernanceParams';
import { StatCard } from '@/components/StatCard';
import { LoadingSpinner, LoadingSkeleton } from '@/components/LoadingSpinner';
import { TransactionRow } from '@/components/TransactionRow';
import { Wallet, Users, TrendingUp, TrendingDown, DollarSign, Bot, RefreshCw } from 'lucide-react';
import { formatWeiToEther, formatNumber, shortenAddress } from '@/lib/utils';

export function Dashboard() {
    const { isConnected } = useAccount();
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useTreasuryData();
    const { params, isLoading: paramsLoading, refetch: refetchParams } = useGovernanceParams();

    if (!isConnected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="glass-card p-12 text-center">
                    <Wallet className="w-16 h-16 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                    <p className="text-slate-400">
                        Please connect your wallet to view the DAO dashboard.
                    </p>
                </div>
            </div>
        );
    }

    const handleRefresh = () => {
        refetchStats();
        refetchParams();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">DAO Dashboard</h1>
                    <p className="text-slate-400">Real-time treasury and AI agent activity</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="btn-secondary flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Treasury Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsLoading ? (
                    <>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                    </>
                ) : stats ? (
                    <>
                        <StatCard
                            title="Treasury Balance"
                            value={`${formatWeiToEther(stats.treasury)} ETH`}
                            icon={Wallet}
                            trend="up"
                        />
                        <StatCard
                            title="Total Members"
                            value={formatNumber(stats.members)}
                            icon={Users}
                        />
                        <StatCard
                            title="Energy Bought"
                            value={formatNumber(stats.energyBought)}
                            icon={TrendingDown}
                            subtitle="units"
                        />
                        <StatCard
                            title="Energy Sold"
                            value={formatNumber(stats.energySold)}
                            icon={TrendingUp}
                            subtitle="units"
                        />
                    </>
                ) : (
                    <div className="col-span-4 text-center text-slate-400">
                        Failed to load treasury data
                    </div>
                )}
            </div>

            {/* AI Agent Status */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">AI Agent Status</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                                <span className="text-sm text-slate-400">Active</span>
                            </div>
                        </div>
                    </div>

                    {paramsLoading ? (
                        <LoadingSpinner size="sm" />
                    ) : params ? (
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Agent Address:</span>
                                <span className="font-mono text-primary">
                                    {params.aiAgent ? shortenAddress(params.aiAgent) : 'Not set'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Last Activity:</span>
                                <span className="text-slate-300">2 minutes ago</span>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Trading Parameters</h3>
                            <span className="text-sm text-slate-400">Current thresholds</span>
                        </div>
                    </div>

                    {paramsLoading ? (
                        <LoadingSpinner size="sm" />
                    ) : params ? (
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Buy Threshold:</span>
                                <span className="text-green-400 font-medium">≤ {formatNumber(params.buyThresholdPrice)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Sell Threshold:</span>
                                <span className="text-blue-400 font-medium">≥ {formatNumber(params.sellThresholdPrice)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Max Spend:</span>
                                <span className="text-slate-300">{formatWeiToEther(params.maxSpendPerTransaction)} ETH</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    <p className="text-sm text-slate-400 text-center py-8">
                        No transactions yet. AI agent will start trading when conditions are met.
                    </p>
                    {/* Transaction rows will appear here when events are detected */}
                </div>
            </div>
        </div>
    );
}
