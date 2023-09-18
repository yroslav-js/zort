"use client"

import {useAccount, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import "../ZVaults/ZVaults.css"
import {useEffect, useState} from "react";
import {chainId} from "@/contract/web3";
import Link from "next/link";

const EthereumEcosystem = () => {
  const {isConnected} = useAccount()
  const {connect, connectors} = useConnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()

  useEffect(() => {
    if (isConnected && chain?.id !== chainId) switchNetwork?.(chainId)
  }, [isConnected])
  return (
    <>
      <div className="modal-bg" style={{display: isModalOpen ? 'block' : 'none'}} onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          {connectors.map(connector => (
            <div className="connect-button" key={connector.name} onClick={() => {
              setIsModalOpen(false)
              connect({connector})
            }}>{connector.name}</div>
          ))}
        </div>
      </div>
      <div className="holdings">
        <div className="group-container">
          <div className="group-556">
            <img className="group-1200" src="img/group-1200@4x.png" alt="Group 1200"/>
            <div className="group-552 inter-normal-black-haze-14px">
              <Link href='/' className="fourth-link-13">
                Home
              </Link>
              <div className="overlap-group-3">
                <div className="fourth-link-14">ZVaults</div>
              </div>
              <div className="fourth-link-15 not-now">Analytics</div>
              <div className="fourth-link-16 not-now">Settings</div>
            </div>
          </div>
          <div className="group-705">
            <div className="fourth-link-17 inter-semi-bold-white-12px not-now" onClick={() => {
              !isConnected && setIsModalOpen(true)
            }}>{isConnected ? "Connected" : "Connect Wallet"}</div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Ethereum Ecosystem <span className="holding-profit">2</span>
            </h3>
            <div className="holding-table defi">
              <table>
                <tr className="holdings-table-title">
                  <th>Asset Name</th>
                  <th>Price</th>
                  <th>#</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>1m</th>
                  <th>3m</th>
                  <th>MCap</th>
                  <th>FDV</th>
                  <th>24h volume</th>
                  <th>Category</th>
                  <th>Performance</th>
                  <th>Bullishperiod</th>
                  <th>Twitter performance</th>
                  <th>AI Score</th>
                  <th>Allocation</th>
                </tr>
                <tr>
                  <td>OGN</td>
                  <td>$0.0984</td>
                  <td>330</td>
                  <td>11.51%</td>
                  <td>16.66%</td>
                  <td>29.59%</td>
                  <td>36.34%</td>
                  <td>$55.03 M</td>
                  <td>$98.40 M</td>
                  <td>$34.03 M</td>
                  <td>Ethereum Ecosystem</td>
                  <td>Bullish</td>
                  <td>13 /100</td>
                  <td>1608</td>
                  <td>0.13</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>OAX</td>
                  <td>$0.177</td>
                  <td>855</td>
                  <td>15.92%</td>
                  <td>8.03%</td>
                  <td>59.80%</td>
                  <td>11.58%</td>
                  <td>$9.85 M</td>
                  <td>$17.65 M</td>
                  <td>$17.51 M</td>
                  <td>Ethereum Ecosystem</td>
                  <td>Bullish</td>
                  <td>21 /100</td>
                  <td>342</td>
                  <td>0.21</td>
                  <td>0.2</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="group-627">
          <p className="zort-inc-2023-all-rights-reserved inter-normal-quick-silver-10px"> © ZORT Inc. 2023. Last
            update <span
              className="date-update"></span></p>
          <div className="frame-604 inter-normal-white-10px">
            <div className="frame-604-item">News</div>
            <div className="ellipse"></div>
            <div className="frame-604-item">Terms and Conditions</div>
            <div className="ellipse"></div>
            <div className="frame-604-item">Privacy Policy</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EthereumEcosystem;