import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
import { formatEther, formatUnits } from 'ethers';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatWeiToEther(wei: bigint | string): string {
    try {
        return parseFloat(formatEther(wei)).toFixed(4);
    } catch {
        return '0.0000';
    }
}

export function formatNumber(num: bigint | number): string {
    return Number(num).toLocaleString();
}

export function formatTimestamp(timestamp: number | bigint): string {
    const date = new Date(Number(timestamp) * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
}

export function formatFullDate(timestamp: number | bigint): string {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
}

export function shortenAddress(address: string, chars = 4): string {
    if (!address) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
}
