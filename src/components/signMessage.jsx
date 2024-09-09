import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signMessageUser() {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }
    if (!signMessage) {
      toast.error("Wallet doesn't support message signing");
      return;
    }

    const encodedMessage = new TextEncoder().encode(message);
    setLoading(true);

    try {
      const signature = await signMessage(encodedMessage);

      if (ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        toast.success("Successfully signed message");
      } else {
        toast.error("Failed to verify signature");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setMessage("");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8 p-4 shadow-md rounded-md bg-white"
    >
      <input
        type="text"
        placeholder="Enter a message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={signMessageUser}
        disabled={message === "" || loading}
        className={`mt-4 w-full p-2 rounded-md text-white ${
          loading ? "bg-gray-500" : "bg-emerald-600 hover:bg-emerald-500"
        } transition-all`}
      >
        {loading ? "Signing..." : "Sign Message"}
      </button>
    </motion.div>
  );
};

export default SignMessage;
