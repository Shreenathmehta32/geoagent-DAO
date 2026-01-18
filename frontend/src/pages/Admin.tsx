import React, { useState } from 'react';
import { AdminGuard } from '@/components/AdminGuard';
import { useAdminActions } from '@/hooks/useAdminActions';
import { useGovernanceParams } from '@/hooks/useGovernanceParams';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Settings, Users, DollarSign, Bot, CheckCircle, AlertCircle } from 'lucide-react';
import { getExplorerLink } from '@/contracts/config';

export function Admin() {
    const {
        setAIAgent,
        addMember,
        updateBuyThreshold,
        updateSellThreshold,
        fundTreasury,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
        lastAction,
    } = useAdminActions();

    const { params } = useGovernanceParams();

    const [agentAddress, setAgentAddressInput] = useState('');
    const [memberAddress, setMemberAddress] = useState('');
    const [memberShares, setMemberShares] = useState('100');
    const [buyThreshold, setBuyThreshold] = useState('30');
    const [sellThreshold, setSellThreshold] = useState('80');
    const [fundAmount, setFundAmount] = useState('0.1');

    const handleSetAgent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agentAddress) return;
        try {
            await setAIAgent(agentAddress);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!memberAddress || !memberShares) return;
        try {
            await addMember(memberAddress, parseInt(memberShares));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateThresholds = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBuyThreshold(parseInt(buyThreshold));
            await updateSellThreshold(parseInt(sellThreshold));
        } catch (err) {
            console.error(err);
        }
    };

    const handleFundTreasury = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fundAmount) return;
        try {
            await fundTreasury(fundAmount);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminGuard>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
                    <p className="text-slate-400">Manage DAO configuration and members</p>
                </div>

                {/* Transaction Status */}
                {(isPending || isConfirming || isSuccess || error) && (
                    <div className="mb-6">
                        {isPending && (
                            <div className="glass-card p-4 flex items-center gap-3 border-yellow-500/30">
                                <LoadingSpinner size="sm" />
                                <span className="text-yellow-400">Waiting for wallet confirmation...</span>
                            </div>
                        )}
                        {isConfirming && (
                            <div className="glass-card p-4 flex items-center gap-3 border-blue-500/30">
                                <LoadingSpinner size="sm" />
                                <span className="text-blue-400">Transaction confirming...</span>
                            </div>
                        )}
                        {isSuccess && hash && (
                            <div className="glass-card p-4 flex items-center gap-3 border-primary/30">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                    <span className="text-primary font-medium">Transaction successful!</span>
                                    <a
                                        href={getExplorerLink(hash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-sm text-slate-400 hover:text-primary"
                                    >
                                        View on explorer →
                                    </a>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="glass-card p-4 flex items-center gap-3 border-red-500/30">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <span className="text-red-400">Transaction failed: {error.message}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Set AI Agent */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bot className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">Set AI Agent</h3>
                        </div>
                        <form onSubmit={handleSetAgent} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Agent Wallet Address</label>
                                <input
                                    type="text"
                                    value={agentAddress}
                                    onChange={(e) => setAgentAddressInput(e.target.value)}
                                    placeholder="0x..."
                                    className="input-field w-full"
                                />
                                {params?.aiAgent && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        Current: {params.aiAgent}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className="btn-primary w-full" disabled={isPending || isConfirming}>
                                {isPending || isConfirming ? 'Processing...' : 'Update AI Agent'}
                            </button>
                        </form>
                    </div>

                    {/* Add Member */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">Add Member</h3>
                        </div>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Member Address</label>
                                <input
                                    type="text"
                                    value={memberAddress}
                                    onChange={(e) => setMemberAddress(e.target.value)}
                                    placeholder="0x..."
                                    className="input-field w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Shares</label>
                                <input
                                    type="number"
                                    value={memberShares}
                                    onChange={(e) => setMemberShares(e.target.value)}
                                    placeholder="100"
                                    className="input-field w-full"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full" disabled={isPending || isConfirming}>
                                {isPending || isConfirming ? 'Processing...' : 'Add Member'}
                            </button>
                        </form>
                    </div>

                    {/* Update Thresholds */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">Update Thresholds</h3>
                        </div>
                        <form onSubmit={handleUpdateThresholds} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Buy Threshold</label>
                                <input
                                    type="number"
                                    value={buyThreshold}
                                    onChange={(e) => setBuyThreshold(e.target.value)}
                                    className="input-field w-full"
                                />
                                <p className="text-xs text-slate-500 mt-1">AI buys when price ≤ this value</p>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Sell Threshold</label>
                                <input
                                    type="number"
                                    value={sellThreshold}
                                    onChange={(e) => setSellThreshold(e.target.value)}
                                    className="input-field w-full"
                                />
                                <p className="text-xs text-slate-500 mt-1">AI sells when price ≥ this value</p>
                            </div>
                            <button type="submit" className="btn-primary w-full" disabled={isPending || isConfirming}>
                                {isPending || isConfirming ? 'Processing...' : 'Update Thresholds'}
                            </button>
                        </form>
                    </div>

                    {/* Fund Treasury */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">Fund Treasury</h3>
                        </div>
                        <form onSubmit={handleFundTreasury} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Amount (ETH)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={fundAmount}
                                    onChange={(e) => setFundAmount(e.target.value)}
                                    placeholder="0.1"
                                    className="input-field w-full"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full" disabled={isPending || isConfirming}>
                                {isPending || isConfirming ? 'Processing...' : 'Fund Treasury'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminGuard>
    );
}
