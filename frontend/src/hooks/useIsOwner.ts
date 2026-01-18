import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';

export function useIsOwner() {
    const { address } = useAccount();

    const { data: owner } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: DAOConstitutionABI,
        functionName: 'owner',
    });

    return {
        isOwner: address && owner ? address.toLowerCase() === owner.toLowerCase() : false,
        owner,
    };
}
