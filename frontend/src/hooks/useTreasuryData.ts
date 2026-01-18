import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';
import type { DAOStats } from '@/types';

export function useTreasuryData() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: DAOConstitutionABI,
        functionName: 'getDAOStats',
        query: {
            refetchInterval: 5000, // Refetch every 5 seconds
        },
    });

    const stats: DAOStats | null = data
        ? {
            treasury: data[0],
            members: data[1],
            shares: data[2],
            energyBought: data[3],
            energySold: data[4],
        }
        : null;

    return {
        data: stats,
        isLoading,
        error,
        refetch,
    };
}
