# Smart Contract Deployment Guide

## SealedOfferContract.sol Deployment Instructions

### Prerequisites
- Node.js and npm installed
- Hardhat or Foundry development environment
- Ethereum Sepolia testnet ETH for gas fees
- Private key or wallet for deployment

### Step 1: Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @fhevm/solidity
```

### Step 2: Hardhat Configuration

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("@fhevm/solidity");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: ["YOUR_PRIVATE_KEY"],
      chainId: 11155111,
    },
  },
  fhevm: {
    network: "sepolia",
  },
};
```

### Step 3: Deployment Script

Create `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  // Deploy the contract
  const SealedOfferContract = await hre.ethers.getContractFactory("SealedOfferContract");
  
  // Set verifier address (you can use your own address for testing)
  const verifier = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual verifier address
  
  const sealedOffer = await SealedOfferContract.deploy(verifier);
  await sealedOffer.waitForDeployment();

  const contractAddress = await sealedOffer.getAddress();
  
  console.log("SealedOfferContract deployed to:", contractAddress);
  console.log("Verifier address:", verifier);
  
  // Verify contract on Etherscan (optional)
  if (hre.network.name === "sepolia") {
    console.log("Waiting for block confirmations...");
    await sealedOffer.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [verifier],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Step 4: Deploy to Sepolia

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 5: Update Frontend Configuration

After successful deployment:

1. Copy the contract address from the deployment output
2. Update the environment variable in Vercel:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
   ```
3. Redeploy the frontend application

### Step 6: Contract Interaction Testing

Create a test script to verify contract functionality:

```javascript
const hre = require("hardhat");

async function testContract() {
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const SealedOfferContract = await hre.ethers.getContractFactory("SealedOfferContract");
  const contract = SealedOfferContract.attach(contractAddress);
  
  // Test basic contract functions
  const applicationCounter = await contract.applicationCounter();
  console.log("Application counter:", applicationCounter.toString());
  
  // Test with a sample application (you'll need FHE encryption for real data)
  console.log("Contract is working correctly!");
}

testContract().catch(console.error);
```

### Important Notes

1. **FHE Integration**: The contract uses Zama's FHE technology. Ensure you have the proper FHE setup and encryption keys.

2. **Gas Optimization**: The contract includes FHE operations which may require higher gas limits.

3. **Verifier Role**: The verifier address has special permissions to verify applications and update reputations.

4. **Security**: Never commit private keys to version control. Use environment variables or secure key management.

### Environment Variables for Deployment

```bash
# .env file (never commit this)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Contract Functions Overview

- `submitApplication()`: Submit encrypted job application
- `makeOffer()`: Employer makes encrypted offer
- `startNegotiation()`: Start encrypted salary negotiation
- `acceptOffer()`: Accept an offer
- `rejectOffer()`: Reject an offer
- `verifyApplication()`: Verifier verifies application
- `updateReputation()`: Update user reputation

### Testing Checklist

- [ ] Contract deploys successfully
- [ ] Contract is verified on Etherscan
- [ ] Basic read functions work
- [ ] FHE encryption/decryption works
- [ ] Frontend can connect to contract
- [ ] Application submission works
- [ ] Offer creation works
- [ ] Negotiation flow works

### Support Resources

- [Zama FHE Documentation](https://docs.zama.ai/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethereum Sepolia Faucet](https://sepoliafaucet.com/)
- [Etherscan Sepolia](https://sepolia.etherscan.io/)
