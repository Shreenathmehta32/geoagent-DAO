const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting DAOConstitution deployment to Base Sepolia...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check deployer balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Constructor parameters
  const maxSpendPerTransaction = hre.ethers.parseEther("0.1"); // 0.1 ETH max spend
  const buyThresholdPrice = 30; // Buy when price <= 30
  const sellThresholdPrice = 80; // Sell when price >= 80

  console.log("⚙️  Constructor Parameters:");
  console.log("   - Max Spend Per Transaction:", hre.ethers.formatEther(maxSpendPerTransaction), "ETH");
  console.log("   - Buy Threshold Price:", buyThresholdPrice);
  console.log("   - Sell Threshold Price:", sellThresholdPrice);
  console.log("");

  // Deploy contract
  console.log("📦 Deploying DAOConstitution contract...");
  const DAOConstitution = await hre.ethers.getContractFactory("DAOConstitution");
  const dao = await DAOConstitution.deploy(
    maxSpendPerTransaction,
    buyThresholdPrice,
    sellThresholdPrice
  );

  await dao.waitForDeployment();
  const daoAddress = await dao.getAddress();

  console.log("✅ DAOConstitution deployed to:", daoAddress);
  console.log("");

  // Get deployment transaction
  const deployTx = dao.deploymentTransaction();
  if (deployTx) {
    const receipt = await deployTx.wait();
    console.log("⛽ Gas used for deployment:", receipt.gasUsed.toString());
    console.log("💵 Deployment cost:", hre.ethers.formatEther(receipt.gasUsed * deployTx.gasPrice), "ETH");
    console.log("🔗 Transaction hash:", deployTx.hash);
    console.log("");
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: daoAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    constructorArgs: {
      maxSpendPerTransaction: maxSpendPerTransaction.toString(),
      buyThresholdPrice: buyThresholdPrice,
      sellThresholdPrice: sellThresholdPrice
    },
    transactionHash: deployTx ? deployTx.hash : null
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save to deployments.json
  const deploymentsFile = path.join(deploymentsDir, "deployments.json");
  let deployments = {};
  
  if (fs.existsSync(deploymentsFile)) {
    deployments = JSON.parse(fs.readFileSync(deploymentsFile, "utf8"));
  }
  
  deployments[hre.network.name] = deploymentInfo;
  fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));

  console.log("💾 Deployment info saved to:", deploymentsFile);
  console.log("");

  // Wait for block confirmations before verification
  console.log("⏳ Waiting for 5 block confirmations...");
  await dao.deploymentTransaction().wait(5);
  console.log("✅ Confirmations complete!");
  console.log("");

  // Verify contract on BaseScan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("🔍 Verifying contract on BaseScan...");
    try {
      await hre.run("verify:verify", {
        address: daoAddress,
        constructorArguments: [
          maxSpendPerTransaction,
          buyThresholdPrice,
          sellThresholdPrice
        ],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
      console.log("You can verify manually later with:");
      console.log(`npx hardhat verify --network ${hre.network.name} ${daoAddress} ${maxSpendPerTransaction} ${buyThresholdPrice} ${sellThresholdPrice}`);
    }
  }

  console.log("");
  console.log("🎉 Deployment complete!");
  console.log("");
  console.log("📋 Next Steps:");
  console.log("1. Set AI Agent address: dao.setAIAgent(agentAddress)");
  console.log("2. Fund treasury: dao.fundTreasury({ value: amount })");
  console.log("3. Add DAO members: dao.addMember(memberAddress, shares)");
  console.log("4. Update frontend with contract address:", daoAddress);
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
