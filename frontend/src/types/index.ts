export interface DAOStats {
    treasury: bigint;
    members: bigint;
    shares: bigint;
    energyBought: bigint;
    energySold: bigint;
}

export interface GovernanceParams {
    buyThresholdPrice: bigint;
    sellThresholdPrice: bigint;
    maxSpendPerTransaction: bigint;
    aiAgent: string;
}

export interface MemberData {
    shares: bigint;
    isMember: boolean;
}

export interface ContractEvent {
    id: string;
    type: 'EnergyPurchased' | 'EnergySold' | 'ProfitsDistributed' | 'MemberAdded' | 'TreasuryFunded' | 'AIAgentUpdated' | 'ConstitutionUpdated';
    timestamp: number;
    data: Record<string, any>;
    txHash: string;
    blockNumber: number;
}

export interface EnergyPurchasedEvent {
    amount: bigint;
    price: bigint;
    timestamp: bigint;
    executor: string;
}

export interface EnergySoldEvent {
    amount: bigint;
    price: bigint;
    timestamp: bigint;
    executor: string;
}

export interface ProfitsDistributedEvent {
    totalAmount: bigint;
    perShare: bigint;
    timestamp: bigint;
}

export interface MemberAddedEvent {
    member: string;
    shares: bigint;
    timestamp: bigint;
}
