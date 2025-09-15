# Vercel Deployment Guide for Sealed Offer Drive

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

### Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Find and select `antonperez33/sealed-offer-drive`
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `sealed-offer-drive` (or your preferred name)
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Environment Variables Setup**
   Click "Environment Variables" and add the following:

   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
   NEXT_PUBLIC_CONTRACT_ADDRESS=
   ```

   **Important**: 
   - Set `NEXT_PUBLIC_CONTRACT_ADDRESS` after deploying your smart contract
   - All variables should be set for Production, Preview, and Development environments

### Step 3: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete (usually 2-3 minutes)
   - Vercel will automatically assign a domain like `sealed-offer-drive-xxx.vercel.app`

2. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Step 4: Post-Deployment Configuration

1. **Smart Contract Deployment**
   - Deploy the `SealedOfferContract.sol` to Ethereum Sepolia testnet
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the application

2. **Verify Deployment**
   - Test wallet connection functionality
   - Verify all environment variables are working
   - Test the application form submission

### Step 5: Continuous Deployment

- **Automatic Deployments**: Vercel will automatically deploy when you push to the main branch
- **Preview Deployments**: Each pull request gets its own preview URL
- **Manual Deployments**: You can trigger manual deployments from the Vercel dashboard

### Important Configuration Notes

1. **Build Settings**
   - Framework: Vite
   - Node.js Version: 18.x (recommended)
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Environment Variables**
   - All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
   - Keep sensitive data (like private keys) in server-side only variables
   - Update contract address after smart contract deployment

3. **Performance Optimization**
   - Vercel automatically optimizes static assets
   - CDN distribution is included
   - Edge functions available for serverless functionality

### Troubleshooting

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL accessibility
   - Ensure contract address is set correctly

### Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys and tokens

2. **Smart Contract Security**
   - Audit smart contract before mainnet deployment
   - Test thoroughly on testnets
   - Implement proper access controls

### Monitoring and Analytics

1. **Vercel Analytics**
   - Enable Vercel Analytics for performance monitoring
   - Monitor Core Web Vitals
   - Track user engagement

2. **Error Tracking**
   - Consider integrating error tracking services
   - Monitor smart contract interactions
   - Set up alerts for critical failures

### Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

---

**Deployment Checklist:**
- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Initial deployment successful
- [ ] Smart contract deployed and address updated
- [ ] Wallet connection tested
- [ ] Application form functionality verified
- [ ] Custom domain configured (if applicable)
- [ ] Analytics and monitoring set up
