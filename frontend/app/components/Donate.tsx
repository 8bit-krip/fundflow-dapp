"use client";

import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import CampaignABI from "../contracts/CampaignABI";

export default function Donate({ campaignAddress }: { campaignAddress: string }) {
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [amount, setAmount] = useState("");

  const donate = () => {
    if (!isConnected) {
      alert("Connect wallet first");
      return;
    }

    writeContract({
      address: campaignAddress as `0x${string}`,
      abi: CampaignABI,
      functionName: "fund",
      value: parseEther(amount), // ETH sent here
    });
  };

  return (
    <div>
      <input
        placeholder="ETH amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={donate} disabled={isPending}>
        {isPending ? "Sending..." : "Donate"}
      </button>
    </div>
  );
}
