import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signMessageUser() {
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }
    if (!signMessage) {
      alert("Wallet doesn't support message signing");
      return;
    }

    const encodedMessage = new TextEncoder().encode(message);
    setLoading(true);

    try {
      const signature = await signMessage(encodedMessage);

      if (ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        alert("Successfully signed message");
      } else {
        alert("Failed to verify signature");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
      setMessage("");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-md rounded-md bg-white">
      <input
        type="text"
        placeholder="Enter a message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={signMessageUser}
        disabled={message === "" || loading}
        className={`mt-4 w-full p-2 rounded-md text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {loading ? "Signing..." : "Sign Message"}
      </button>
    </div>
  );
};

export default SignMessage;
