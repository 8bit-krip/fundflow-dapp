"use client";

import { useState } from "react";
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
      alert("Please connect your wallet first");
      return;
    }

    if (!goal || !duration) {
      alert("Please fill in all fields");
      return;
    }

    writeContract({
      address: FACTORY_ADDRESS,
      abi: factoryABI,
      functionName: "createCampaign",
      args: [
        parseEther(goal),                 
        BigInt(Number(duration) * 86400), 
      ],
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Goal Input */}
        <div className="relative">
          <label htmlFor="goal" className="sr-only">Goal Amount</label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="goal"
              id="goal"
              className="block w-full rounded-lg border-0 py-3 pl-4 pr-12 text-slate-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 transition-all"
              placeholder="Goal Amount"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-xs font-medium">ETH</span>
            </div>
          </div>
        </div>

        {/* Duration Input */}
        <div className="relative">
          <label htmlFor="duration" className="sr-only">Duration</label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="duration"
              id="duration"
              className="block w-full rounded-lg border-0 py-3 pl-4 pr-16 text-slate-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 transition-all"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-xs font-medium">Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <button
          onClick={createCampaign}
          disabled={isPending}
          className={`
            w-full flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all
            ${
              isPending
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:scale-[0.99]"
            }
          `}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating on Blockchain...
            </span>
          ) : (
            "Start Campaign"
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
          <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-red-600 break-all">{error.message}</p>
        </div>
      )}
    </div>
  );
}