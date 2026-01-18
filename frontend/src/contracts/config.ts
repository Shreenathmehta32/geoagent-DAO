import { baseSepolia } from 'wagmi/chains';

export const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS || '') as `0x${string}`;
export const CHAIN_ID = 84532; // Base Sepolia
export const BLOCK_EXPLORER = 'https://sepolia.basescan.org';

export const SUPPORTED_CHAIN = baseSepolia;

export const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getExplorerLink = (txHash: string): string => {
    return `${BLOCK_EXPLORER}/tx/${txHash}`;
};

export const getAddressLink = (address: string): string => {
    return `${BLOCK_EXPLORER}/address/${address}`;
};
