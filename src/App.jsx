import { useState } from "react";
import "./App.css";
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

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import "@solana/wallet-adapter-react-ui/styles.css";
import AirDrop from "./components/airdrop";
import Balance from "./components/balance";
import SignMessage from "./components/signMessage";
function App() {
  const [showDisconnect, setShowDisconnect] = useState(false);

  const endpoint = "https://api.devnet.solana.com";

  return (
    <>
      <div className="p-4">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton onClick={() => setShowDisconnect(true)} />

              {showDisconnect && <WalletDisconnectButton />}

              <AirDrop />
              <Balance />
              <SignMessage />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </>
  );
}

export default App;
