"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import ConnectWallet from "./components/ConnectWallet";
import CreateCampaign from "./components/CreateCampaign";
import Donate from "./components/Donate";
import factoryABI from "./contracts/CampaignFactoryABI";

const FACTORY_ADDRESS = "0x557211E5acF40DD650AE2F47c5164d501E1DAc37";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryABI,
    functionName: "getCampaigns",
  });

  if (!mounted) return null;

  const campaigns = (data as string[]) || [];

  return (
    <main>
      <h1>FundFlow</h1>

      <ConnectWallet />
      <CreateCampaign />

      <h3>Campaigns</h3>
      {campaigns.length === 0 && <p>No campaigns yet</p>}

      {campaigns.map((address) => (
        <div key={address}>
          <p>{address}</p>
          <Donate campaignAddress={address} />
        </div>
      ))}
    </main>
  );
}
