import { useReadContracts } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';
import type { GovernanceParams } from '@/types';

export function useGovernanceParams() {
    const { data, isLoading, error, refetch } = useReadContracts({
        contracts: [
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'buyThresholdPrice',
            },
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'sellThresholdPrice',
            },
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'maxSpendPerTransaction',
            },
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'aiAgent',
            },
        ],
        query: {
            refetchInterval: 30000, // Refetch every 30 seconds
        },
    });

    const params: GovernanceParams | null =
        data && data.every((d) => d.status === 'success')
            ? {
                buyThresholdPrice: data[0].result as bigint,
                sellThresholdPrice: data[1].result as bigint,
                maxSpendPerTransaction: data[2].result as bigint,
                aiAgent: data[3].result as string,
            }
            : null;

    return {
        params,
        isLoading,
        error,
        refetch,
    };
}
