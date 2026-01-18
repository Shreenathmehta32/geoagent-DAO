const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("DAOConstitution", function () {
    // Fixture to deploy contract before each test
    async function deployDAOFixture() {
        const [owner, aiAgent, member1, member2, nonMember] = await ethers.getSigners();

        const maxSpend = ethers.parseEther("0.1");
        const buyThreshold = 30;
        const sellThreshold = 80;

        const DAOConstitution = await ethers.getContractFactory("DAOConstitution");
        const dao = await DAOConstitution.deploy(maxSpend, buyThreshold, sellThreshold);

        return { dao, owner, aiAgent, member1, member2, nonMember, maxSpend, buyThreshold, sellThreshold };
    }

    describe("Deployment", function () {
        it("Should deploy with correct initial parameters", async function () {
            const { dao, maxSpend, buyThreshold, sellThreshold } = await loadFixture(deployDAOFixture);

            expect(await dao.maxSpendPerTransaction()).to.equal(maxSpend);
            expect(await dao.buyThresholdPrice()).to.equal(buyThreshold);
            expect(await dao.sellThresholdPrice()).to.equal(sellThreshold);
            expect(await dao.treasuryBalance()).to.equal(0);
            expect(await dao.totalMembers()).to.equal(0);
            expect(await dao.totalShares()).to.equal(0);
        });

        it("Should set deployer as owner", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);
            expect(await dao.owner()).to.equal(owner.address);
        });

        it("Should reject deployment with invalid thresholds", async function () {
            const DAOConstitution = await ethers.getContractFactory("DAOConstitution");

            await expect(
                DAOConstitution.deploy(ethers.parseEther("0.1"), 80, 30)
            ).to.be.revertedWith("Sell threshold must be higher than buy threshold");
        });
    });

    describe("AI Agent Management", function () {
        it("Should allow owner to set AI agent address", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await expect(dao.connect(owner).setAIAgent(aiAgent.address))
                .to.emit(dao, "AIAgentUpdated")
                .withArgs(ethers.ZeroAddress, aiAgent.address, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            expect(await dao.aiAgent()).to.equal(aiAgent.address);
        });

        it("Should reject setting zero address as AI agent", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            await expect(
                dao.connect(owner).setAIAgent(ethers.ZeroAddress)
            ).to.be.revertedWith("AI agent cannot be zero address");
        });

        it("Should reject non-owner setting AI agent", async function () {
            const { dao, aiAgent, nonMember } = await loadFixture(deployDAOFixture);

            await expect(
                dao.connect(nonMember).setAIAgent(aiAgent.address)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Energy Trading - Buy", function () {
        it("Should allow AI agent to buy energy when conditions met", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            // Setup: Set AI agent and fund treasury
            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            const amount = ethers.parseEther("0.05");
            const price = 25; // Below buy threshold of 30

            await expect(dao.connect(aiAgent).buyEnergy(amount, price))
                .to.emit(dao, "EnergyPurchased")
                .withArgs(amount, price, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1), aiAgent.address);

            // Check treasury was deducted
            expect(await dao.treasuryBalance()).to.equal(ethers.parseEther("0.95"));
        });

        it("Should reject buyEnergy when not called by AI agent", async function () {
            const { dao, owner, nonMember } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            await expect(
                dao.connect(nonMember).buyEnergy(ethers.parseEther("0.05"), 25)
            ).to.be.revertedWith("Only AI agent can execute trades");
        });

        it("Should reject buyEnergy when price above threshold", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            const price = 35; // Above buy threshold of 30

            await expect(
                dao.connect(aiAgent).buyEnergy(ethers.parseEther("0.05"), price)
            ).to.be.revertedWith("Price above buy threshold");
        });

        it("Should reject buyEnergy when amount exceeds spending limit", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            const amount = ethers.parseEther("0.2"); // Exceeds 0.1 ETH limit

            await expect(
                dao.connect(aiAgent).buyEnergy(amount, 25)
            ).to.be.revertedWith("Amount exceeds spending limit");
        });

        it("Should reject buyEnergy when insufficient treasury funds", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            // No treasury funding

            await expect(
                dao.connect(aiAgent).buyEnergy(ethers.parseEther("0.05"), 25)
            ).to.be.revertedWith("Insufficient treasury funds");
        });
    });

    describe("Energy Trading - Sell", function () {
        it("Should allow AI agent to sell energy when price above threshold", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            // Setup: Set AI agent, fund treasury, and buy energy first
            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });
            await dao.connect(aiAgent).buyEnergy(ethers.parseEther("0.05"), 25);

            const initialTreasury = await dao.treasuryBalance();
            const sellAmount = 100; // Energy units
            const sellPrice = 85; // Above sell threshold of 80

            await expect(dao.connect(aiAgent).sellEnergy(sellAmount, sellPrice))
                .to.emit(dao, "EnergySold")
                .withArgs(sellAmount, sellPrice, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1), aiAgent.address);

            // Check treasury increased
            const finalTreasury = await dao.treasuryBalance();
            expect(finalTreasury).to.be.gt(initialTreasury);
        });

        it("Should reject sellEnergy when price below threshold", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });
            await dao.connect(aiAgent).buyEnergy(ethers.parseEther("0.05"), 25);

            const sellPrice = 70; // Below sell threshold of 80

            await expect(
                dao.connect(aiAgent).sellEnergy(100, sellPrice)
            ).to.be.revertedWith("Price below sell threshold");
        });

        it("Should reject sellEnergy when insufficient energy", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);

            await expect(
                dao.connect(aiAgent).sellEnergy(100, 85)
            ).to.be.revertedWith("Insufficient energy to sell");
        });
    });

    describe("Member Management", function () {
        it("Should add members correctly and update shares", async function () {
            const { dao, owner, member1 } = await loadFixture(deployDAOFixture);

            const shares = 100;

            await expect(dao.connect(owner).addMember(member1.address, shares))
                .to.emit(dao, "MemberAdded")
                .withArgs(member1.address, shares, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            expect(await dao.isMember(member1.address)).to.equal(true);
            expect(await dao.memberShares(member1.address)).to.equal(shares);
            expect(await dao.totalMembers()).to.equal(1);
            expect(await dao.totalShares()).to.equal(shares);
        });

        it("Should reject adding member with zero shares", async function () {
            const { dao, owner, member1 } = await loadFixture(deployDAOFixture);

            await expect(
                dao.connect(owner).addMember(member1.address, 0)
            ).to.be.revertedWith("Shares must be greater than 0");
        });

        it("Should reject adding duplicate member", async function () {
            const { dao, owner, member1 } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).addMember(member1.address, 100);

            await expect(
                dao.connect(owner).addMember(member1.address, 50)
            ).to.be.revertedWith("Member already registered");
        });

        it("Should return correct member shares", async function () {
            const { dao, owner, member1 } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).addMember(member1.address, 150);

            expect(await dao.getMemberShares(member1.address)).to.equal(150);
        });
    });

    describe("Profit Distribution", function () {
        it("Should distribute profits proportionally", async function () {
            const { dao, owner, aiAgent, member1, member2 } = await loadFixture(deployDAOFixture);

            // Setup: Add members and fund treasury
            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).addMember(member1.address, 100);
            await dao.connect(owner).addMember(member2.address, 100);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            const treasuryBefore = await dao.treasuryBalance();
            const totalShares = await dao.totalShares();
            const expectedPerShare = treasuryBefore / totalShares;

            await expect(dao.connect(aiAgent).distributeProfits())
                .to.emit(dao, "ProfitsDistributed")
                .withArgs(treasuryBefore, expectedPerShare, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            // Treasury should be reset to 0
            expect(await dao.treasuryBalance()).to.equal(0);
        });

        it("Should reject distribution when no profits", async function () {
            const { dao, owner, aiAgent, member1 } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).addMember(member1.address, 100);

            await expect(
                dao.connect(aiAgent).distributeProfits()
            ).to.be.revertedWith("No profits to distribute");
        });

        it("Should reject distribution when no members", async function () {
            const { dao, owner, aiAgent } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });

            await expect(
                dao.connect(aiAgent).distributeProfits()
            ).to.be.revertedWith("No members to distribute to");
        });
    });

    describe("Treasury Management", function () {
        it("Should fund treasury via payable function", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            const fundAmount = ethers.parseEther("0.5");

            await expect(dao.connect(owner).fundTreasury({ value: fundAmount }))
                .to.emit(dao, "TreasuryFunded")
                .withArgs(owner.address, fundAmount, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            expect(await dao.treasuryBalance()).to.equal(fundAmount);
        });

        it("Should receive ETH via receive function", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            const sendAmount = ethers.parseEther("0.3");

            await expect(
                owner.sendTransaction({ to: await dao.getAddress(), value: sendAmount })
            ).to.emit(dao, "TreasuryFunded");

            expect(await dao.treasuryBalance()).to.equal(sendAmount);
        });
    });

    describe("Governance Updates", function () {
        it("Should update buy threshold", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            const newThreshold = 40;

            await expect(dao.connect(owner).updateBuyThreshold(newThreshold))
                .to.emit(dao, "ConstitutionUpdated")
                .withArgs("buyThresholdPrice", 30, newThreshold, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            expect(await dao.buyThresholdPrice()).to.equal(newThreshold);
        });

        it("Should update sell threshold", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            const newThreshold = 100;

            await expect(dao.connect(owner).updateSellThreshold(newThreshold))
                .to.emit(dao, "ConstitutionUpdated")
                .withArgs("sellThresholdPrice", 80, newThreshold, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

            expect(await dao.sellThresholdPrice()).to.equal(newThreshold);
        });

        it("Should update max spend limit", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            const newLimit = ethers.parseEther("0.2");

            await expect(dao.connect(owner).updateMaxSpend(newLimit))
                .to.emit(dao, "ConstitutionUpdated");

            expect(await dao.maxSpendPerTransaction()).to.equal(newLimit);
        });

        it("Should reject invalid threshold updates", async function () {
            const { dao, owner } = await loadFixture(deployDAOFixture);

            // Buy threshold >= sell threshold
            await expect(
                dao.connect(owner).updateBuyThreshold(85)
            ).to.be.revertedWith("Buy threshold must be less than sell threshold");

            // Sell threshold <= buy threshold
            await expect(
                dao.connect(owner).updateSellThreshold(25)
            ).to.be.revertedWith("Sell threshold must be greater than buy threshold");
        });
    });

    describe("View Functions", function () {
        it("Should return correct DAO statistics", async function () {
            const { dao, owner, aiAgent, member1 } = await loadFixture(deployDAOFixture);

            await dao.connect(owner).setAIAgent(aiAgent.address);
            await dao.connect(owner).addMember(member1.address, 100);
            await dao.connect(owner).fundTreasury({ value: ethers.parseEther("1") });
            await dao.connect(aiAgent).buyEnergy(ethers.parseEther("0.05"), 25);

            const stats = await dao.getDAOStats();

            expect(stats.treasury).to.equal(ethers.parseEther("0.95"));
            expect(stats.members).to.equal(1);
            expect(stats.shares).to.equal(100);
            expect(stats.energyBought).to.be.gt(0);
            expect(stats.energySold).to.equal(0);
        });
    });
});
