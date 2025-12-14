## FundFlow

**A Full-Stack Web3 Crowdfunding Platform**

FundFlow is a decentralized crowdfunding application built on Ethereum that allows users to create fundraising campaigns and receive ETH donations directly through smart contracts, without relying on centralized intermediaries.

The application is designed to showcase a real-world, production-style Web3 architecture, combining on-chain logic with a modern frontend and an off-chain backend indexer for scalability and performance.

---

## Overview

FundFlow enables anyone with a crypto wallet to:
- Launch a crowdfunding campaign on-chain
- Donate ETH to existing campaigns
- Interact directly with smart contracts using MetaMask
- Verify all activity transparently on the blockchain

All funds are handled by smart contracts, ensuring trustless execution and full transparency.

---

## User Interface Walkthrough

### Launch a Campaign

The **Launch a Campaign** section allows users to create a new crowdfunding campaign by providing:

- **Goal Amount (ETH):** The total amount of ETH the campaign aims to raise  
- **Duration (Days):** The campaign’s active period, after which it either succeeds or fails  

When the user clicks **Start Campaign**:
1. A transaction is sent to the `CampaignFactory` smart contract
2. A new `Campaign` contract is deployed on-chain
3. The campaign address is emitted via an event
4. The frontend automatically updates the active campaigns list

This flow ensures that each campaign is fully independent and trustlessly deployed.

---

### Active Campaigns

The **Active Campaigns** section displays all campaigns created through the factory contract.

For each campaign, the UI shows:
- **Contract Address:** The unique Ethereum address of the campaign smart contract
- **Donation Input:** Amount of ETH the user wants to donate
- **Donate Button:** Sends ETH directly to the campaign contract

Each campaign card represents a real smart contract deployed on Ethereum, not an off-chain record.

---

## Donation Flow

1. User connects their wallet (MetaMask or compatible wallet)
2. User enters an ETH amount
3. User clicks **Donate**
4. Wallet prompts for transaction confirmation
5. ETH is sent directly to the campaign smart contract
6. Campaign state updates immediately on-chain

There is no backend custody of funds.  
All donations are peer-to-contract and fully verifiable on Ethereum.

---

## Smart Contract Architecture

### CampaignFactory.sol
- Uses the **Factory Pattern**
- Deploys new `Campaign` contracts
- Stores all deployed campaign addresses
- Emits `CampaignCreated` events for indexing

### Campaign.sol
Each campaign contract:
- Accepts ETH donations via a payable `fund()` function
- Tracks total funds raised
- Stores contributor balances
- Enforces campaign deadlines and funding goals
- Supports withdrawals and refunds based on outcome

This design ensures modularity, scalability, and security.

---

## Frontend Architecture

- Built with **Next.js (App Router)**
- Styled using **Tailwind CSS**
- Web3 interactions handled using **wagmi** and **viem**
- Wallet connections managed through MetaMask
- Client-side rendering safeguards prevent hydration issues

The UI is designed to be clean, responsive, and intuitive while remaining transparent about on-chain activity.

---

## Backend & Indexing

To make the application scalable and performant, an off-chain backend is used.

### Backend Responsibilities
- Listen to blockchain events (e.g. `CampaignCreated`)
- Index campaign metadata into MongoDB
- Prevent duplicate entries
- Expose APIs for fast frontend access

### Why a Backend?
- Blockchain reads are slow
- On-chain data is hard to query efficiently
- Indexed data enables faster UI updates and analytics

This results in a **hybrid Web2 + Web3 architecture**, commonly used in production dApps.

---

## Tech Stack

### Blockchain
- Solidity
- Foundry
- Ethereum (Sepolia Testnet)

### Frontend
- Next.js
- React
- Tailwind CSS
- wagmi
- viem
- MetaMask

### Backend
- Node.js
- Express
- ethers.js
- MongoDB

---

## Key Highlights

- Fully trustless crowdfunding logic
- Factory-based smart contract deployment
- Direct ETH donations with no intermediaries
- Real blockchain transactions and confirmations
- Clean and production-ready UI
- Scalable backend indexing architecture

---

## Project Status

FundFlow is actively developed and serves as a strong foundation for building production-grade decentralized applications.

Future improvements include:
- Campaign detail pages with progress tracking
- Donation history and analytics
- Withdraw and refund UI
- Multi-wallet support
- Mainnet deployment
- Smart contract audits

---
![Alt Text Description](/Users/kishan/Desktop/fund.jpeg)
