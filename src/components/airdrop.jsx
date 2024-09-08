import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

const AirDrop = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function requestAirdrop() {
    setisLoading(true);
    if (!publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const signature = await connection.requestAirdrop(
        publicKey,
        amountInLamports
      );
      await connection.confirmTransaction(signature);
      alert(`Airdropped ${amount} SOL to ${publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed", error);
      alert("Airdrop failed: " + error.message);
    } finally {
      setisLoading(false);
      setAmount("");
    }
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        onClick={requestAirdrop}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {isLoading ? "Getting u some Sol" : "Request Airdrop"}
      </button>
    </div>
  );
};

export default AirDrop;
