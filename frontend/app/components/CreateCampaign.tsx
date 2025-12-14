"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import factoryABI from "../contracts/CampaignFactoryABI";

const FACTORY_ADDRESS = "0x557211E5acF40DD650AE2F47c5164d501E1DAc37";

export default function CreateCampaign() {
  const { isConnected } = useAccount();

  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");

  const { writeContract, isPending, error } = useWriteContract();

  const createCampaign = () => {
    if (!isConnected) {
      alert("Connect wallet first");
      return;
    }

    if (!goal || !duration) {
      alert("Fill all fields");
      return;
    }

    writeContract({
      address: FACTORY_ADDRESS,
      abi: factoryABI,
      functionName: "createCampaign",
      args: [
        parseEther(goal),                 // ✅ correct
        BigInt(Number(duration) * 86400), // days → seconds
      ],
    });
  };

  return (
    <div>
      <h3>Create Campaign</h3>

      <input
        placeholder="Goal (ETH)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <input
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <button onClick={createCampaign} disabled={isPending}>
        {isPending ? "Creating..." : "Create Campaign"}
      </button>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}
