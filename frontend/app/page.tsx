"use client";

import { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import { useReadContract } from "wagmi";
import factoryABI from "./contracts/CampaignFactoryABI";

const FACTORY_ADDRESS = "0x557211E5acF40DD650AE2F47c5164d501E1DAc37";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryABI,
    functionName: "getCampaigns",
  });

  if (!mounted) return null;

  return (
    <main>
      <h1>FundFlow</h1>
      <ConnectWallet />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
