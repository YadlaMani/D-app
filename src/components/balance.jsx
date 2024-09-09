import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { motion } from "framer-motion";

const Balance = () => {
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const wallet = useWallet();

  async function getBalance() {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  }

  useEffect(() => {
    getBalance();
  }, [wallet.publicKey]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center"
    >
      <div>
        {balance !== null ? (
          <h1 className="text-2xl font-semibold text-gray-800">
            Balance: {balance} SOL
          </h1>
        ) : (
          <p className="text-gray-500">No account linked yet</p>
        )}
      </div>
    </motion.div>
  );
};

export default Balance;
