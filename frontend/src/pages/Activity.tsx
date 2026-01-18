import React from 'react';
import { useAccount } from 'wagmi';
import { useContractEvents } from '@/hooks/useContractEvents';
import { TransactionRow } from '@/components/TransactionRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Activity as ActivityIcon, Wallet } from 'lucide-react';

export function Activity() {
    const { isConnected } = useAccount();
    const { events, isLoading } = useContractEvents();

    if (!isConnected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="glass-card p-12 text-center">
                    <Wallet className="w-16 h-16 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                    <p className="text-slate-400">
                        Please connect your wallet to view DAO activity.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <ActivityIcon className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold">Live Activity</h1>
                </div>
                <p className="text-slate-400">Real-time AI agent decisions and DAO events</p>
            </div>

            {/* AI Status Indicator */}
            <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse-slow" />
                        <div>
                            <p className="font-medium">AI Agent Monitoring</p>
                            <p className="text-sm text-slate-400">Checking energy prices every 60 seconds</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-400">Last Check</p>
                        <p className="font-medium">Just now</p>
                    </div>
                </div>
            </div>

            {/* Transaction Feed */}
            <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4">Transaction History</h3>

                {isLoading ? (
                    <LoadingSpinner />
                ) : events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((event) => (
                            <TransactionRow
                                key={event.id}
                                type={event.type === 'EnergyPurchased' ? 'BUY' :
                                    event.type === 'EnergySold' ? 'SELL' :
                                        event.type === 'ProfitsDistributed' ? 'DISTRIBUTE' :
                                            event.type === 'MemberAdded' ? 'MEMBER_ADDED' : 'FUNDED'}
                                amount={event.data.amount || 'N/A'}
                                price={event.data.price}
                                timestamp={event.timestamp}
                                txHash={event.txHash}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <ActivityIcon className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                        <p className="text-slate-400">No transactions yet</p>
                        <p className="text-sm text-slate-500 mt-1">
                            AI agent will start trading when energy prices meet threshold conditions
                        </p>
                    </div>
                )}
            </div>

            {/* Mock Energy Price Chart Placeholder */}
            <div className="glass-card p-6 mt-8">
                <h3 className="font-bold text-lg mb-4">Energy Price Monitor</h3>
                <div className="bg-slate-800/50 rounded-lg p-8 text-center">
                    <p className="text-slate-400">Price chart visualization coming soon</p>
                    <p className="text-sm text-slate-500 mt-2">
                        Real-time energy price tracking with buy/sell threshold indicators
                    </p>
                </div>
            </div>
        </div>
    );
}
