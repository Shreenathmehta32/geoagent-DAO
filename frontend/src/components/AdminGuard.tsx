import React, { ReactNode } from 'react';
import { useIsOwner } from '@/hooks/useIsOwner';
import { ShieldAlert } from 'lucide-react';

interface AdminGuardProps {
    children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
    const { isOwner } = useIsOwner();

    if (!isOwner) {
        return (
            <div className="glass-card p-12 text-center">
                <ShieldAlert className="w-16 h-16 mx-auto text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Access Denied</h2>
                <p className="text-slate-400">
                    Only the contract owner can access this page.
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
