import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Member } from './pages/Member';
import { Activity } from './pages/Activity';

// Configure wagmi
const config = getDefaultConfig({
    appName: 'GeoAgent DAO',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    chains: [baseSepolia],
    ssr: false,
});

// Create React Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <BrowserRouter>
                        <div className="min-h-screen bg-background">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/member" element={<Member />} />
                                <Route path="/activity" element={<Activity />} />
                            </Routes>
                        </div>
                    </BrowserRouter>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
