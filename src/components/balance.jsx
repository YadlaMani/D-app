import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

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
    <div>
      <div>
        {balance !== null ? (
          <h1>Balance:{balance} SOL</h1>
        ) : (
          "No account linked yet"
        )}
      </div>
    </div>
  );
};

export default Balance;
