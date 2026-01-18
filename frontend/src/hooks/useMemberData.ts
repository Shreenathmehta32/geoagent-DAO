import { useReadContracts } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';
import type { MemberData } from '@/types';

export function useMemberData(address?: string) {
    const { data, isLoading, error, refetch } = useReadContracts({
        contracts: [
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'getMemberShares',
                args: address ? [address as `0x${string}`] : undefined,
            },
            {
                address: CONTRACT_ADDRESS,
                abi: DAOConstitutionABI,
                functionName: 'isMember',
                args: address ? [address as `0x${string}`] : undefined,
            },
        ],
        query: {
            enabled: !!address,
            refetchInterval: 10000, // Refetch every 10 seconds
        },
    });

    const memberData: MemberData | null =
        data && data.every((d) => d.status === 'success')
            ? {
                shares: data[0].result as bigint,
                isMember: data[1].result as boolean,
            }
            : null;

    return {
        shares: memberData?.shares ?? 0n,
        isMember: memberData?.isMember ?? false,
        isLoading,
        error,
        refetch,
    };
}
