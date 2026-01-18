import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon?: LucideIcon;
    trend?: 'up' | 'down';
    subtitle?: string;
    className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, subtitle, className }: StatCardProps) {
    return (
        <div className={cn('glass-card p-6 hover:bg-card-hover transition-colors', className)}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-slate-400 font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-2 text-slate-100">{value}</p>
                    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
                </div>
                {Icon && (
                    <div className={cn(
                        'p-3 rounded-lg',
                        trend === 'up' ? 'bg-primary/20 text-primary' :
                            trend === 'down' ? 'bg-red-500/20 text-red-400' :
                                'bg-slate-700 text-slate-300'
                    )}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
        </div>
    );
}
