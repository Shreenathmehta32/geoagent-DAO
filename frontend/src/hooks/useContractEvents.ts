import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/contracts/config';
import { DAOConstitutionABI } from '@/contracts/abi';
import type { ContractEvent } from '@/types';

export function useContractEvents(eventNames?: string[], limit = 50) {
    const [events, setEvents] = useState<ContractEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const publicClient = usePublicClient();

    useEffect(() => {
        if (!publicClient) return;

        const fetchEvents = async () => {
            try {
                setIsLoading(true);

                // Get current block
                const currentBlock = await publicClient.getBlockNumber();
                const fromBlock = currentBlock - 10000n; // Last ~10000 blocks

                // Fetch logs
                const logs = await publicClient.getLogs({
                    address: CONTRACT_ADDRESS,
                    fromBlock,
                    toBlock: 'latest',
                });

                // Parse and format events
                const formattedEvents: ContractEvent[] = await Promise.all(
                    logs.slice(-limit).map(async (log) => {
                        const block = await publicClient.getBlock({ blockNumber: log.blockNumber! });

                        return {
                            id: `${log.transactionHash}-${log.logIndex}`,
                            type: getEventType(log.topics[0] || ''),
                            timestamp: Number(block.timestamp),
                            data: parseEventData(log),
                            txHash: log.transactionHash!,
                            blockNumber: Number(log.blockNumber),
                        };
                    })
                );

                setEvents(formattedEvents.reverse());
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();

        // Refresh every 10 seconds
        const interval = setInterval(fetchEvents, 10000);
        return () => clearInterval(interval);
    }, [publicClient, limit]);

    return { events, isLoading };
}

function getEventType(topic: string): ContractEvent['type'] {
    const eventSignatures: Record<string, ContractEvent['type']> = {
        '0x': 'EnergyPurchased', // Add actual event signatures
    };
    return eventSignatures[topic] || 'EnergyPurchased';
}

function parseEventData(log: any): Record<string, any> {
    // Parse event data based on topics and data
    return {
        raw: log.data,
    };
}
