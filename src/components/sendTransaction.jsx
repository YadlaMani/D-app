import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Buffer } from "buffer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const SendTokens = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    setIsLoading(true);

    try {
      if (!wallet.publicKey) {
        toast.error("Wallet not connected!");
        setIsLoading(false);
        return;
      }

      if (!address || !amount) {
        toast.error("Please enter a valid address and amount.");
        setIsLoading(false);
        return;
      }

      let toPublicKey;
      try {
        toPublicKey = new PublicKey(address);
        if (!PublicKey.isOnCurve(toPublicKey)) {
          throw new Error("Invalid public key");
        }
      } catch (err) {
        console.error("Invalid recipient address:", err);
        toast.error("Invalid recipient address");
        setIsLoading(false);
        return;
      }

      console.log("Recipient address:", toPublicKey.toBase58());

      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: toPublicKey,
          lamports,
        })
      );

      console.log("Sending transaction...", transaction);

      const signature = await wallet.sendTransaction(transaction, connection);

      console.log("Transaction sent, signature:", signature);

      await connection.confirmTransaction(signature, "processed");

      console.log("Transaction confirmed");

      setAddress("");
      setAmount("");
      toast.success("Sent " + amount + " SOL to " + address);
    } catch (err) {
      console.error("Transaction failed:", err);
      toast.error("Transaction failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Send SOL Tokens
      </h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-4 p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mt-4 p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={sendTokens}
        className={`mt-6 w-full py-3 rounded-md text-lg text-white ${
          isLoading ? "bg-gray-500" : "bg-emerald-600 hover:bg-emerald-500"
        } transition-all`}
      >
        {isLoading ? "Processing..." : "Send"}
      </button>
    </motion.div>
  );
};

export default SendTokens;
