import React from 'react';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className={`${sizeClasses[size]} border-4 border-slate-700 border-t-primary rounded-full animate-spin`} />
        </div>
    );
}

export function LoadingSkeleton() {
    return (
        <div className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-1/2"></div>
        </div>
    );
}
