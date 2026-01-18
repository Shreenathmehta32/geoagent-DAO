// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DAOConstitution
 * @notice A DAO governance contract that allows an AI agent to autonomously buy and sell energy
 * based on price thresholds, manage treasury, and distribute profits to members
 * @dev Implements autonomous trading with configurable thresholds and member-based profit sharing
 */
contract DAOConstitution is Ownable, ReentrancyGuard {
    
    // ============ State Variables ============
    
    /// @notice Wallet address of the autonomous AI agent authorized to execute trades
    address public aiAgent;
    
    /// @notice Maximum amount in wei the AI agent can spend in a single transaction
    uint256 public maxSpendPerTransaction;
    
    /// @notice Energy price below which AI agent should buy (default: 30)
    uint256 public buyThresholdPrice;
    
    /// @notice Energy price above which AI agent should sell (default: 80)
    uint256 public sellThresholdPrice;
    
    /// @notice Total DAO treasury balance in wei
    uint256 public treasuryBalance;
    
    /// @notice Total number of DAO members
    uint256 public totalMembers;
    
    /// @notice Total shares distributed across all members
    uint256 public totalShares;
    
    /// @notice Cumulative energy units purchased
    uint256 public totalEnergyBought;
    
    /// @notice Cumulative energy units sold
    uint256 public totalEnergySold;
    
    /// @notice Mapping of member addresses to their share amounts
    mapping(address => uint256) public memberShares;
    
    /// @notice Mapping to check if address is a DAO member
    mapping(address => bool) public isMember;
    
    // ============ Events ============
    
    /// @notice Emitted when AI agent purchases energy
    event EnergyPurchased(
        uint256 indexed amount,
        uint256 price,
        uint256 timestamp,
        address executor
    );
    
    /// @notice Emitted when AI agent sells energy surplus
    event EnergySold(
        uint256 indexed amount,
        uint256 price,
        uint256 timestamp,
        address executor
    );
    
    /// @notice Emitted when profits are distributed to members
    event ProfitsDistributed(
        uint256 totalAmount,
        uint256 perShare,
        uint256 timestamp
    );
    
    /// @notice Emitted when new member joins DAO
    event MemberAdded(
        address indexed member,
        uint256 shares,
        uint256 timestamp
    );
    
    /// @notice Emitted when AI agent address is changed
    event AIAgentUpdated(
        address indexed oldAgent,
        address indexed newAgent,
        uint256 timestamp
    );
    
    /// @notice Emitted when governance parameters are modified
    event ConstitutionUpdated(
        string parameter,
        uint256 oldValue,
        uint256 newValue,
        uint256 timestamp
    );
    
    /// @notice Emitted when treasury receives funding
    event TreasuryFunded(
        address indexed funder,
        uint256 amount,
        uint256 timestamp
    );
    
    // ============ Constructor ============
    
    /**
     * @notice Initialize DAO with governance parameters
     * @param _maxSpend Maximum amount AI agent can spend per transaction (suggested: 0.1 ether)
     * @param _buyThreshold Energy price below which to buy (suggested: 30)
     * @param _sellThreshold Energy price above which to sell (suggested: 80)
     */
    constructor(
        uint256 _maxSpend,
        uint256 _buyThreshold,
        uint256 _sellThreshold
    ) {
        require(_maxSpend > 0, "Max spend must be greater than 0");
        require(_buyThreshold > 0, "Buy threshold must be greater than 0");
        require(_sellThreshold > _buyThreshold, "Sell threshold must be higher than buy threshold");
        
        maxSpendPerTransaction = _maxSpend;
        buyThresholdPrice = _buyThreshold;
        sellThresholdPrice = _sellThreshold;
        treasuryBalance = 0;
        totalMembers = 0;
        totalShares = 0;
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Set or update the AI agent wallet address
     * @dev Only owner can set the AI agent. This is a critical security function.
     * @param _agent Address of the AI agent wallet
     */
    function setAIAgent(address _agent) external onlyOwner {
        require(_agent != address(0), "AI agent cannot be zero address");
        
        address oldAgent = aiAgent;
        aiAgent = _agent;
        
        emit AIAgentUpdated(oldAgent, _agent, block.timestamp);
    }
    
    /**
     * @notice AI agent buys energy when price is below threshold
     * @dev Only callable by authorized AI agent. Implements safety checks for spending limits.
     * @param _amount Amount in wei to spend on energy purchase
     * @param _price Current energy price (must be below buy threshold)
     */
    function buyEnergy(uint256 _amount, uint256 _price) external nonReentrant {
        require(msg.sender == aiAgent, "Only AI agent can execute trades");
        require(_amount <= maxSpendPerTransaction, "Amount exceeds spending limit");
        require(_price <= buyThresholdPrice, "Price above buy threshold");
        require(treasuryBalance >= _amount, "Insufficient treasury funds");
        
        // Deduct from treasury
        treasuryBalance -= _amount;
        
        // Calculate energy units purchased (simplified: amount / price)
        uint256 energyUnits = _price > 0 ? (_amount * 100) / _price : 0;
        totalEnergyBought += energyUnits;
        
        emit EnergyPurchased(_amount, _price, block.timestamp, msg.sender);
    }
    
    /**
     * @notice AI agent sells energy surplus when price is above threshold
     * @dev Only callable by authorized AI agent. Revenue is added to treasury.
     * @param _amount Amount of energy units to sell
     * @param _price Current energy price (must be above sell threshold)
     */
    function sellEnergy(uint256 _amount, uint256 _price) external nonReentrant {
        require(msg.sender == aiAgent, "Only AI agent can execute trades");
        require(_price >= sellThresholdPrice, "Price below sell threshold");
        require(totalEnergyBought >= _amount, "Insufficient energy to sell");
        
        // Calculate revenue
        uint256 revenue = (_amount * _price) / 100;
        treasuryBalance += revenue;
        totalEnergySold += _amount;
        
        emit EnergySold(_amount, _price, block.timestamp, msg.sender);
    }
    
    /**
     * @notice Distribute treasury profits proportionally to all members
     * @dev For hackathon MVP, emits event only. Production would use pull-payment pattern.
     * Only callable by AI agent to automate profit distribution.
     */
    function distributeProfits() external nonReentrant {
        require(msg.sender == aiAgent, "Only AI agent can distribute profits");
        require(treasuryBalance > 0, "No profits to distribute");
        require(totalShares > 0, "No members to distribute to");
        
        uint256 profitPerShare = treasuryBalance / totalShares;
        uint256 totalDistributed = treasuryBalance;
        
        // Reset treasury (in production, implement pull-payment pattern)
        treasuryBalance = 0;
        
        emit ProfitsDistributed(totalDistributed, profitPerShare, block.timestamp);
    }
    
    /**
     * @notice Add new member to DAO with allocated shares
     * @dev Only owner can add members. In production, integrate with ZK proof verification.
     * @param _member Address of the new member
     * @param _shares Number of shares to allocate to the member
     */
    function addMember(address _member, uint256 _shares) external onlyOwner {
        require(_member != address(0), "Member cannot be zero address");
        require(_shares > 0, "Shares must be greater than 0");
        require(!isMember[_member], "Member already registered");
        
        memberShares[_member] = _shares;
        isMember[_member] = true;
        totalMembers++;
        totalShares += _shares;
        
        emit MemberAdded(_member, _shares, block.timestamp);
    }
    
    /**
     * @notice Update the price threshold for buying energy
     * @dev Only owner can modify governance parameters
     * @param _newThreshold New buy threshold price
     */
    function updateBuyThreshold(uint256 _newThreshold) external onlyOwner {
        require(_newThreshold > 0, "Threshold must be greater than 0");
        require(_newThreshold < sellThresholdPrice, "Buy threshold must be less than sell threshold");
        
        uint256 oldValue = buyThresholdPrice;
        buyThresholdPrice = _newThreshold;
        
        emit ConstitutionUpdated("buyThresholdPrice", oldValue, _newThreshold, block.timestamp);
    }
    
    /**
     * @notice Update the price threshold for selling energy
     * @dev Only owner can modify governance parameters
     * @param _newThreshold New sell threshold price
     */
    function updateSellThreshold(uint256 _newThreshold) external onlyOwner {
        require(_newThreshold > 0, "Threshold must be greater than 0");
        require(_newThreshold > buyThresholdPrice, "Sell threshold must be greater than buy threshold");
        
        uint256 oldValue = sellThresholdPrice;
        sellThresholdPrice = _newThreshold;
        
        emit ConstitutionUpdated("sellThresholdPrice", oldValue, _newThreshold, block.timestamp);
    }
    
    /**
     * @notice Update maximum spending limit per transaction
     * @dev Only owner can modify governance parameters
     * @param _newLimit New maximum spend limit
     */
    function updateMaxSpend(uint256 _newLimit) external onlyOwner {
        require(_newLimit > 0, "Limit must be greater than 0");
        
        uint256 oldValue = maxSpendPerTransaction;
        maxSpendPerTransaction = _newLimit;
        
        emit ConstitutionUpdated("maxSpendPerTransaction", oldValue, _newLimit, block.timestamp);
    }
    
    /**
     * @notice Allow members or owner to deposit funds into treasury
     * @dev Payable function to fund the DAO treasury
     */
    function fundTreasury() external payable {
        require(msg.value > 0, "Must send funds to treasury");
        
        treasuryBalance += msg.value;
        
        emit TreasuryFunded(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @notice Get share amount for specific member
     * @param _member Address of the member to query
     * @return Number of shares owned by the member
     */
    function getMemberShares(address _member) external view returns (uint256) {
        return memberShares[_member];
    }
    
    /**
     * @notice Get current DAO statistics
     * @return treasury Current treasury balance
     * @return members Total number of members
     * @return shares Total shares distributed
     * @return energyBought Total energy units purchased
     * @return energySold Total energy units sold
     */
    function getDAOStats() external view returns (
        uint256 treasury,
        uint256 members,
        uint256 shares,
        uint256 energyBought,
        uint256 energySold
    ) {
        return (
            treasuryBalance,
            totalMembers,
            totalShares,
            totalEnergyBought,
            totalEnergySold
        );
    }
    
    /**
     * @notice Emergency withdrawal function for owner
     * @dev Only use in case of emergency. Transfers entire treasury to owner.
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 amount = treasuryBalance;
        treasuryBalance = 0;
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Emergency withdrawal failed");
    }
    
    /**
     * @notice Fallback function to receive ETH
     */
    receive() external payable {
        treasuryBalance += msg.value;
        emit TreasuryFunded(msg.sender, msg.value, block.timestamp);
    }
}
