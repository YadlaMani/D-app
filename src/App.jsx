import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Buffer } from "buffer";
window.Buffer = Buffer;

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import AirDrop from "./components/airdrop";
import Balance from "./components/balance";
import SignMessage from "./components/signMessage";
import SendTokens from "./components/sendTransaction";

function App() {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const endpoint = "https://api.devnet.solana.com";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <Toaster position="top-right" />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                Solana Wallet Adapter
              </h1>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <WalletMultiButton
                  onClick={() => setShowDisconnect(true)}
                  className="bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out shadow-md"
                />
                {showDisconnect && (
                  <WalletDisconnectButton className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out shadow-md" />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Airdrop
                  </h2>
                  <AirDrop />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Balance
                  </h2>
                  <Balance />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Sign Message
                  </h2>
                  <SignMessage />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Send Tokens
                  </h2>
                  <SendTokens />
                </div>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
