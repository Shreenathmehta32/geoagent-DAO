import React from 'react';
import { formatTimestamp, shortenAddress } from '@/lib/utils';
import { getExplorerLink } from '@/contracts/config';
import { ExternalLink, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';

interface TransactionRowProps {
    type: 'BUY' | 'SELL' | 'DISTRIBUTE' | 'MEMBER_ADDED' | 'FUNDED';
    amount: string;
    price?: string;
    timestamp: number;
    txHash: string;
    executor?: string;
}

export function TransactionRow({ type, amount, price, timestamp, txHash, executor }: TransactionRowProps) {
    const getTypeColor = () => {
        switch (type) {
            case 'BUY':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'SELL':
                return 'bg-primary/20 text-primary border-primary/30';
            case 'DISTRIBUTE':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'MEMBER_ADDED':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'FUNDED':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'BUY':
                return <TrendingDown className="w-4 h-4" />;
            case 'SELL':
                return <TrendingUp className="w-4 h-4" />;
            case 'DISTRIBUTE':
                return <DollarSign className="w-4 h-4" />;
            case 'MEMBER_ADDED':
                return <Users className="w-4 h-4" />;
            default:
                return <DollarSign className="w-4 h-4" />;
        }
    };

    return (
        <div className="glass-card p-4 hover:bg-card-hover transition-colors">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getTypeColor()}`}>
                        {getIcon()}
                        {type.replace('_', ' ')}
                    </span>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">{amount}</p>
                        {price && <p className="text-xs text-slate-400">Price: {price}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="hidden sm:block">{formatTimestamp(timestamp)}</span>
                    <a
                        href={getExplorerLink(txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                        <span className="hidden md:inline">{shortenAddress(txHash)}</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
