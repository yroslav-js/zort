"use client"

import {configureChains, createConfig, mainnet, WagmiConfig} from 'wagmi';
import {w3mProvider} from "@web3modal/ethereum";
import {ReactNode} from "react";
import {WalletConnectConnector} from "@wagmi/connectors/walletConnect";
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import 'react-toastify/dist/ReactToastify.css'
import {goerli} from "viem/chains";

const chains = [mainnet]
const projectId = '076b09ffd10c89c5ba6f6be50cfa13b2'

const {publicClient} = configureChains(chains, [w3mProvider({projectId})])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      }
    })
  ],
  publicClient
})

export function WagmiAppConfig({children}: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
    </>
  );
}