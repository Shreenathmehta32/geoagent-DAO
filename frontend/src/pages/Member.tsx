import React from 'react';
import { useAccount } from 'wagmi';
import { useMemberData } from '@/hooks/useMemberData';
import { useTreasuryData } from '@/hooks/useTreasuryData';
import { StatCard } from '@/components/StatCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Users, Award, DollarSign, Lock, Wallet } from 'lucide-react';
import { formatNumber, formatWeiToEther } from '@/lib/utils';

export function Member() {
    const { address, isConnected } = useAccount();
    const { shares, isMember, isLoading } = useMemberData(address);
    const { data: stats } = useTreasuryData();

    if (!isConnected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="glass-card p-12 text-center">
                    <Wallet className="w-16 h-16 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                    <p className="text-slate-400">
                        Please connect your wallet to view your membership status.
                    </p>
                </div>
            </div>
        );
    }

    const estimatedEarnings = stats && shares > 0n
        ? (stats.treasury * shares) / (stats.shares || 1n)
        : 0n;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Member Portal</h1>
                <p className="text-slate-400">Your DAO membership and earnings</p>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : isMember ? (
                <>
                    {/* Membership Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Your Shares"
                            value={formatNumber(shares)}
                            icon={Award}
                            trend="up"
                        />
                        <StatCard
                            title="Estimated Earnings"
                            value={`${formatWeiToEther(estimatedEarnings)} ETH`}
                            icon={DollarSign}
                            subtitle="Based on current treasury"
                        />
                        <StatCard
                            title="Membership Status"
                            value="Active"
                            icon={Users}
                        />
                    </div>

                    {/* Membership Details */}
                    <div className="glass-card p-6 mb-8">
                        <h3 className="font-bold text-lg mb-4">Membership Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Your Address:</span>
                                <span className="font-mono text-sm text-slate-300">{address}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Share Allocation:</span>
                                <span className="text-primary font-medium">{formatNumber(shares)} shares</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Ownership Percentage:</span>
                                <span className="text-slate-300">
                                    {stats?.shares ? ((Number(shares) / Number(stats.shares)) * 100).toFixed(2) : '0'}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Earnings Calculator */}
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-lg mb-4">Earnings Calculator</h3>
                        <p className="text-slate-400 mb-4">
                            When profits are distributed, you will receive a proportional share based on your ownership.
                        </p>
                        <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Current Treasury:</span>
                                <span className="text-slate-300">{formatWeiToEther(stats?.treasury || 0n)} ETH</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Your Estimated Share:</span>
                                <span className="text-primary font-medium">{formatWeiToEther(estimatedEarnings)} ETH</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="glass-card p-12 text-center">
                    <Lock className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Not a Member</h2>
                    <p className="text-slate-400 mb-6">
                        You are not currently a member of this DAO. Contact the admin to join.
                    </p>
                    <div className="glass-card p-6 max-w-md mx-auto">
                        <h3 className="font-bold mb-3">Join DAO (Coming Soon)</h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Zero-knowledge location proof verification will be available soon.
                            Prove you're within the community radius without revealing your exact location.
                        </p>
                        <button className="btn-secondary w-full" disabled>
                            ZK Proof Interface (MVP)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
