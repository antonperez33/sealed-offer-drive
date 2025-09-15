// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SealedOfferContract is SepoliaConfig {
    using FHE for *;
    
    struct JobApplication {
        euint32 applicationId;
        euint32 salaryExpectation;
        euint32 experienceYears;
        euint32 educationLevel;
        bool isActive;
        bool isVerified;
        string positionTitle;
        string companyName;
        address applicant;
        address employer;
        uint256 timestamp;
        string encryptedResumeHash;
    }
    
    struct Offer {
        euint32 offerId;
        euint32 salaryOffer;
        euint32 benefitsValue;
        euint32 startDate;
        bool isAccepted;
        bool isRejected;
        address employer;
        address applicant;
        uint256 timestamp;
        string offerDetails;
    }
    
    struct Negotiation {
        euint32 negotiationId;
        euint32 counterOffer;
        euint32 negotiationRound;
        bool isActive;
        address initiator;
        address counterpart;
        uint256 timestamp;
        string negotiationMessage;
    }
    
    mapping(uint256 => JobApplication) public applications;
    mapping(uint256 => Offer) public offers;
    mapping(uint256 => Negotiation) public negotiations;
    mapping(address => euint32) public applicantReputation;
    mapping(address => euint32) public employerReputation;
    
    uint256 public applicationCounter;
    uint256 public offerCounter;
    uint256 public negotiationCounter;
    
    address public owner;
    address public verifier;
    
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed applicant, string positionTitle);
    event OfferMade(uint256 indexed offerId, uint256 indexed applicationId, address indexed employer);
    event NegotiationStarted(uint256 indexed negotiationId, uint256 indexed offerId, address indexed initiator);
    event ApplicationVerified(uint256 indexed applicationId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function submitApplication(
        string memory _positionTitle,
        string memory _companyName,
        externalEuint32 _salaryExpectation,
        externalEuint32 _experienceYears,
        externalEuint32 _educationLevel,
        string memory _encryptedResumeHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_positionTitle).length > 0, "Position title cannot be empty");
        require(bytes(_companyName).length > 0, "Company name cannot be empty");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalaryExpectation = FHE.fromExternal(_salaryExpectation, inputProof);
        euint32 internalExperienceYears = FHE.fromExternal(_experienceYears, inputProof);
        euint32 internalEducationLevel = FHE.fromExternal(_educationLevel, inputProof);
        
        applications[applicationId] = JobApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            salaryExpectation: internalSalaryExpectation,
            experienceYears: internalExperienceYears,
            educationLevel: internalEducationLevel,
            isActive: true,
            isVerified: false,
            positionTitle: _positionTitle,
            companyName: _companyName,
            applicant: msg.sender,
            employer: address(0), // Will be set when employer reviews
            timestamp: block.timestamp,
            encryptedResumeHash: _encryptedResumeHash
        });
        
        emit ApplicationSubmitted(applicationId, msg.sender, _positionTitle);
        return applicationId;
    }
    
    function makeOffer(
        uint256 applicationId,
        externalEuint32 _salaryOffer,
        externalEuint32 _benefitsValue,
        externalEuint32 _startDate,
        string memory _offerDetails,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(applications[applicationId].applicant != address(0), "Application does not exist");
        require(applications[applicationId].isActive, "Application is not active");
        require(applications[applicationId].isVerified, "Application must be verified");
        
        uint256 offerId = offerCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalaryOffer = FHE.fromExternal(_salaryOffer, inputProof);
        euint32 internalBenefitsValue = FHE.fromExternal(_benefitsValue, inputProof);
        euint32 internalStartDate = FHE.fromExternal(_startDate, inputProof);
        
        offers[offerId] = Offer({
            offerId: FHE.asEuint32(0), // Will be set properly later
            salaryOffer: internalSalaryOffer,
            benefitsValue: internalBenefitsValue,
            startDate: internalStartDate,
            isAccepted: false,
            isRejected: false,
            employer: msg.sender,
            applicant: applications[applicationId].applicant,
            timestamp: block.timestamp,
            offerDetails: _offerDetails
        });
        
        // Update application with employer
        applications[applicationId].employer = msg.sender;
        
        emit OfferMade(offerId, applicationId, msg.sender);
        return offerId;
    }
    
    function startNegotiation(
        uint256 offerId,
        externalEuint32 _counterOffer,
        string memory _negotiationMessage,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(offers[offerId].employer != address(0), "Offer does not exist");
        require(offers[offerId].isAccepted == false, "Offer already accepted");
        require(offers[offerId].isRejected == false, "Offer already rejected");
        require(
            msg.sender == offers[offerId].applicant || msg.sender == offers[offerId].employer,
            "Only applicant or employer can negotiate"
        );
        
        uint256 negotiationId = negotiationCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCounterOffer = FHE.fromExternal(_counterOffer, inputProof);
        
        negotiations[negotiationId] = Negotiation({
            negotiationId: FHE.asEuint32(0), // Will be set properly later
            counterOffer: internalCounterOffer,
            negotiationRound: FHE.add(negotiations[negotiationId].negotiationRound, FHE.asEuint32(1)),
            isActive: true,
            initiator: msg.sender,
            counterpart: msg.sender == offers[offerId].applicant ? 
                offers[offerId].employer : offers[offerId].applicant,
            timestamp: block.timestamp,
            negotiationMessage: _negotiationMessage
        });
        
        emit NegotiationStarted(negotiationId, offerId, msg.sender);
        return negotiationId;
    }
    
    function acceptOffer(uint256 offerId) public {
        require(offers[offerId].applicant == msg.sender, "Only applicant can accept offer");
        require(offers[offerId].isAccepted == false, "Offer already accepted");
        require(offers[offerId].isRejected == false, "Offer already rejected");
        
        offers[offerId].isAccepted = true;
        
        // Update application status
        uint256 applicationId = findApplicationByOffer(offerId);
        if (applicationId != type(uint256).max) {
            applications[applicationId].isActive = false;
        }
    }
    
    function rejectOffer(uint256 offerId) public {
        require(offers[offerId].applicant == msg.sender, "Only applicant can reject offer");
        require(offers[offerId].isAccepted == false, "Offer already accepted");
        require(offers[offerId].isRejected == false, "Offer already rejected");
        
        offers[offerId].isRejected = true;
    }
    
    function verifyApplication(uint256 applicationId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify applications");
        require(applications[applicationId].applicant != address(0), "Application does not exist");
        
        applications[applicationId].isVerified = isVerified;
        emit ApplicationVerified(applicationId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is applicant or employer based on context
        if (applications[applicationCounter - 1].applicant == user) {
            applicantReputation[user] = reputation;
        } else {
            employerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        string memory positionTitle,
        string memory companyName,
        uint8 salaryExpectation,
        uint8 experienceYears,
        uint8 educationLevel,
        bool isActive,
        bool isVerified,
        address applicant,
        address employer,
        uint256 timestamp,
        string memory encryptedResumeHash
    ) {
        JobApplication storage application = applications[applicationId];
        return (
            application.positionTitle,
            application.companyName,
            0, // FHE.decrypt(application.salaryExpectation) - will be decrypted off-chain
            0, // FHE.decrypt(application.experienceYears) - will be decrypted off-chain
            0, // FHE.decrypt(application.educationLevel) - will be decrypted off-chain
            application.isActive,
            application.isVerified,
            application.applicant,
            application.employer,
            application.timestamp,
            application.encryptedResumeHash
        );
    }
    
    function getOfferInfo(uint256 offerId) public view returns (
        uint8 salaryOffer,
        uint8 benefitsValue,
        uint8 startDate,
        bool isAccepted,
        bool isRejected,
        address employer,
        address applicant,
        uint256 timestamp,
        string memory offerDetails
    ) {
        Offer storage offer = offers[offerId];
        return (
            0, // FHE.decrypt(offer.salaryOffer) - will be decrypted off-chain
            0, // FHE.decrypt(offer.benefitsValue) - will be decrypted off-chain
            0, // FHE.decrypt(offer.startDate) - will be decrypted off-chain
            offer.isAccepted,
            offer.isRejected,
            offer.employer,
            offer.applicant,
            offer.timestamp,
            offer.offerDetails
        );
    }
    
    function getNegotiationInfo(uint256 negotiationId) public view returns (
        uint8 counterOffer,
        uint8 negotiationRound,
        bool isActive,
        address initiator,
        address counterpart,
        uint256 timestamp,
        string memory negotiationMessage
    ) {
        Negotiation storage negotiation = negotiations[negotiationId];
        return (
            0, // FHE.decrypt(negotiation.counterOffer) - will be decrypted off-chain
            0, // FHE.decrypt(negotiation.negotiationRound) - will be decrypted off-chain
            negotiation.isActive,
            negotiation.initiator,
            negotiation.counterpart,
            negotiation.timestamp,
            negotiation.negotiationMessage
        );
    }
    
    function getApplicantReputation(address applicant) public view returns (uint8) {
        return 0; // FHE.decrypt(applicantReputation[applicant]) - will be decrypted off-chain
    }
    
    function getEmployerReputation(address employer) public view returns (uint8) {
        return 0; // FHE.decrypt(employerReputation[employer]) - will be decrypted off-chain
    }
    
    // Helper function to find application by offer
    function findApplicationByOffer(uint256 offerId) internal view returns (uint256) {
        for (uint256 i = 0; i < applicationCounter; i++) {
            if (applications[i].applicant == offers[offerId].applicant) {
                return i;
            }
        }
        return type(uint256).max;
    }
}
