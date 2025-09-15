# Sealed Offer Drive

A privacy-preserving job application platform built with FHE (Fully Homomorphic Encryption) technology, ensuring complete confidentiality of job applications and salary negotiations.

## Features

- **Privacy-First Design**: All sensitive data is encrypted using FHE technology
- **Secure Job Applications**: Submit applications without revealing personal information
- **Confidential Salary Negotiations**: Negotiate offers while keeping details private
- **Blockchain Integration**: Built on Ethereum Sepolia testnet with smart contract integration
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Blockchain**: Ethereum Sepolia, Wagmi, RainbowKit
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/antonperez33/sealed-offer-drive.git
cd sealed-offer-drive
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contract

The platform uses FHE-enabled smart contracts to ensure data privacy:

- **SealedOfferContract**: Manages encrypted job applications and offers
- **FHE Integration**: All sensitive data is encrypted using Zama's FHE technology
- **Privacy Preservation**: Data remains encrypted even during processing

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.