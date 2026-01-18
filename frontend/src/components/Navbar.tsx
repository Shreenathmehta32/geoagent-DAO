import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Home, LayoutDashboard, Settings, Users, Activity, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Activity', href: '/activity', icon: Activity },
    { name: 'Member', href: '/member', icon: Users },
    { name: 'Admin', href: '/admin', icon: Settings },
];

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="glass-card border-b border-slate-700/50 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <Zap className="w-6 h-6" />
                        <span>GeoAgent DAO</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                                        isActive
                                            ? 'bg-primary/20 text-primary'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Wallet Connect */}
                    <div>
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
