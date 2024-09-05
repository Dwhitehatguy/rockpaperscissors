import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const wallets = [new PetraWallet()]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%" appearance="dark">
      <AptosWalletAdapterProvider optInWallets={["Petra", "Nightly", "T wallet"]} autoConnect={true} plugins={[new PetraWallet()]}>
        <App />
       </AptosWalletAdapterProvider> 
    </Theme>
  </React.StrictMode>,
)
