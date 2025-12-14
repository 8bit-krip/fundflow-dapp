import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// Campaign schema (inline, no src folder)
const campaignSchema = new mongoose.Schema({
  campaignAddress: { type: String, unique: true },
  creator: String,
  goal: String,
  deadline: String,
  txHash: String,
  createdAt: { type: Date, default: Date.now }
});

const Campaign = mongoose.model("Campaign", campaignSchema);

// Blockchain listener
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// 👉 ABI MUST BE ARRAY ONLY
const factoryABI = [
  {
    "type": "event",
    "name": "CampaignCreated",
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "campaign", "type": "address" },
      { "indexed": true, "name": "creator", "type": "address" },
      { "indexed": false, "name": "goal", "type": "uint256" },
      { "indexed": false, "name": "deadline", "type": "uint256" }
    ]
  }
];

const factory = new ethers.Contract(
  process.env.FACTORY_ADDRESS,
  factoryABI,
  provider
);

// Listen to events
factory.on("CampaignCreated", async (campaign, creator, goal, deadline, event) => {
  console.log("New campaign:", campaign);

  try {
    await Campaign.create({
      campaignAddress: campaign,
      creator,
      goal: goal.toString(),
      deadline: deadline.toString(),
      txHash: event.transactionHash
    });
  } catch (err) {
    // Ignore duplicate events
    if (err.code !== 11000) {
      console.error(err);
    }
  }
});

// API endpoint
app.get("/campaigns", async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
