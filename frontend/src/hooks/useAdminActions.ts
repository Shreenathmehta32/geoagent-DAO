import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'ethers';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';
import { useState } from 'react';

export function useAdminActions() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const [lastAction, setLastAction] = useState<string>('');

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const setAIAgent = async (agentAddress: string) => {
        setLastAction('setAIAgent');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'setAIAgent',
            args: [agentAddress as `0x${string}`],
        });
    };

    const addMember = async (memberAddress: string, shares: number) => {
        setLastAction('addMember');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'addMember',
            args: [memberAddress as `0x${string}`, BigInt(shares)],
        });
    };

    const updateBuyThreshold = async (threshold: number) => {
        setLastAction('updateBuyThreshold');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'updateBuyThreshold',
            args: [BigInt(threshold)],
        });
    };

    const updateSellThreshold = async (threshold: number) => {
        setLastAction('updateSellThreshold');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'updateSellThreshold',
            args: [BigInt(threshold)],
        });
    };

    const updateMaxSpend = async (amount: string) => {
        setLastAction('updateMaxSpend');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'updateMaxSpend',
            args: [parseEther(amount)],
        });
    };

    const fundTreasury = async (amount: string) => {
        setLastAction('fundTreasury');
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: DAOConstitutionABI,
            functionName: 'fundTreasury',
            value: parseEther(amount),
        });
    };

    return {
        setAIAgent,
        addMember,
        updateBuyThreshold,
        updateSellThreshold,
        updateMaxSpend,
        fundTreasury,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
        lastAction,
    };
}
