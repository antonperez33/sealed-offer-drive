import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { parseEther, formatEther } from 'viem';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_positionTitle", "type": "string"},
      {"internalType": "string", "name": "_companyName", "type": "string"},
      {"internalType": "bytes", "name": "_salaryExpectation", "type": "bytes"},
      {"internalType": "bytes", "name": "_experienceYears", "type": "bytes"},
      {"internalType": "bytes", "name": "_educationLevel", "type": "bytes"},
      {"internalType": "string", "name": "_encryptedResumeHash", "type": "string"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "submitApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"internalType": "bytes", "name": "_salaryOffer", "type": "bytes"},
      {"internalType": "bytes", "name": "_benefitsValue", "type": "bytes"},
      {"internalType": "bytes", "name": "_startDate", "type": "bytes"},
      {"internalType": "string", "name": "_offerDetails", "type": "string"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "makeOffer",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "offerId", "type": "uint256"},
      {"internalType": "bytes", "name": "_counterOffer", "type": "bytes"},
      {"internalType": "string", "name": "_negotiationMessage", "type": "string"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "startNegotiation",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "offerId", "type": "uint256"}],
    "name": "acceptOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "offerId", "type": "uint256"}],
    "name": "rejectOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "applicationId", "type": "uint256"}],
    "name": "getApplicationInfo",
    "outputs": [
      {"internalType": "string", "name": "positionTitle", "type": "string"},
      {"internalType": "string", "name": "companyName", "type": "string"},
      {"internalType": "uint8", "name": "salaryExpectation", "type": "uint8"},
      {"internalType": "uint8", "name": "experienceYears", "type": "uint8"},
      {"internalType": "uint8", "name": "educationLevel", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "applicant", "type": "address"},
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "string", "name": "encryptedResumeHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "offerId", "type": "uint256"}],
    "name": "getOfferInfo",
    "outputs": [
      {"internalType": "uint8", "name": "salaryOffer", "type": "uint8"},
      {"internalType": "uint8", "name": "benefitsValue", "type": "uint8"},
      {"internalType": "uint8", "name": "startDate", "type": "uint8"},
      {"internalType": "bool", "name": "isAccepted", "type": "bool"},
      {"internalType": "bool", "name": "isRejected", "type": "bool"},
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "address", "name": "applicant", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "string", "name": "offerDetails", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be set after deployment
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export function useSealedOfferContract() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const submitApplication = async (
    positionTitle: string,
    companyName: string,
    salaryExpectation: string,
    experienceYears: string,
    educationLevel: string,
    encryptedResumeHash: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'submitApplication',
        args: [
          positionTitle,
          companyName,
          salaryExpectation as `0x${string}`,
          experienceYears as `0x${string}`,
          educationLevel as `0x${string}`,
          encryptedResumeHash,
          inputProof as `0x${string}`
        ],
        chainId: sepolia.id,
      });
      return hash;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  const makeOffer = async (
    applicationId: number,
    salaryOffer: string,
    benefitsValue: string,
    startDate: string,
    offerDetails: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'makeOffer',
        args: [
          BigInt(applicationId),
          salaryOffer as `0x${string}`,
          benefitsValue as `0x${string}`,
          startDate as `0x${string}`,
          offerDetails,
          inputProof as `0x${string}`
        ],
        chainId: sepolia.id,
      });
      return hash;
    } catch (error) {
      console.error('Error making offer:', error);
      throw error;
    }
  };

  const startNegotiation = async (
    offerId: number,
    counterOffer: string,
    negotiationMessage: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'startNegotiation',
        args: [
          BigInt(offerId),
          counterOffer as `0x${string}`,
          negotiationMessage,
          inputProof as `0x${string}`
        ],
        chainId: sepolia.id,
      });
      return hash;
    } catch (error) {
      console.error('Error starting negotiation:', error);
      throw error;
    }
  };

  const acceptOffer = async (offerId: number) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'acceptOffer',
        args: [BigInt(offerId)],
        chainId: sepolia.id,
      });
      return hash;
    } catch (error) {
      console.error('Error accepting offer:', error);
      throw error;
    }
  };

  const rejectOffer = async (offerId: number) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'rejectOffer',
        args: [BigInt(offerId)],
        chainId: sepolia.id,
      });
      return hash;
    } catch (error) {
      console.error('Error rejecting offer:', error);
      throw error;
    }
  };

  return {
    submitApplication,
    makeOffer,
    startNegotiation,
    acceptOffer,
    rejectOffer,
    contractAddress: CONTRACT_ADDRESS,
    isConnected: !!address,
  };
}

export function useApplicationInfo(applicationId: number) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getApplicationInfo',
    args: [BigInt(applicationId)],
    chainId: sepolia.id,
  });

  return {
    data,
    error,
    isLoading,
  };
}

export function useOfferInfo(offerId: number) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getOfferInfo',
    args: [BigInt(offerId)],
    chainId: sepolia.id,
  });

  return {
    data,
    error,
    isLoading,
  };
}
