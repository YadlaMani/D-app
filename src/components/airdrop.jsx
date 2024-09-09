import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // Import toast

const AirDrop = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function requestAirdrop() {
    setIsLoading(true);
    if (!publicKey) {
      toast.error("Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    try {
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const signature = await connection.requestAirdrop(
        publicKey,
        amountInLamports
      );
      await connection.confirmTransaction(signature);
      toast.success(`Airdropped ${amount} SOL to ${publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed", error);
      toast.error("Airdrop failed reached limit try after 24hr ");
    } finally {
      setIsLoading(false);
      setAmount("");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={requestAirdrop}
        className={`mt-6 px-4 py-2 rounded-md text-white ${
          isLoading ? "bg-gray-500" : "bg-emerald-600 hover:bg-emerald-500"
        } transition-all`}
      >
        {isLoading ? "Getting you some Sol..." : "Request Airdrop"}
      </button>
    </motion.div>
  );
};

export default AirDrop;
