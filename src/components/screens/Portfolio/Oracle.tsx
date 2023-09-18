"use client"

import {useEffect, useState} from 'react';
import "../ZVaults/ZVaults.css"
import {useAccount, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {chainId} from "@/contract/web3";
import Link from "next/link";

const Oracle = () => {
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
            <h3 className="holding-title"> Oracle <span className="holding-profit">5</span>
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
                  <td>LINK</td>
                  <td>$6.74</td>
                  <td>18</td>
                  <td>8.03%</td>
                  <td>13.93%</td>
                  <td>7.83%</td>
                  <td>28.45%</td>
                  <td>$3.75 B</td>
                  <td>$6.74 B</td>
                  <td>$183.08 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>13 /100</td>
                  <td>2129</td>
                  <td>0.13</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <td>API3</td>
                  <td>$1.07</td>
                  <td>234</td>
                  <td>-0.05%</td>
                  <td>6.52%</td>
                  <td>12.25%</td>
                  <td>12.79%</td>
                  <td>$93.16 M</td>
                  <td>$135.10 M</td>
                  <td>$4.21 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>14 /100</td>
                  <td>926</td>
                  <td>0.14</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <td>BAND</td>
                  <td>$1.07</td>
                  <td>185</td>
                  <td>3.67%</td>
                  <td>8.43%</td>
                  <td>7.97%</td>
                  <td>-6.69%</td>
                  <td>$143.73 M</td>
                  <td>$148.45 M</td>
                  <td>$4.13 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>14 /100</td>
                  <td>989</td>
                  <td>0.14</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <td>CTSI</td>
                  <td>$0.1288</td>
                  <td>227</td>
                  <td>0.41%</td>
                  <td>7.88%</td>
                  <td>6.02%</td>
                  <td>0.70%</td>
                  <td>$95.79 M</td>
                  <td>$129.00 M</td>
                  <td>$2.65 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>17 /100</td>
                  <td>630</td>
                  <td>0.17</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <td>TRB</td>
                  <td>$29.36</td>
                  <td>272</td>
                  <td>-24.57%</td>
                  <td>23.21%</td>
                  <td>192.84%</td>
                  <td>226.04%</td>
                  <td>$74.46 M</td>
                  <td>$74.78 M</td>
                  <td>$127.62 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>29 /100</td>
                  <td>755</td>
                  <td>0.29</td>
                  <td>0.5</td>
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

export default Oracle;