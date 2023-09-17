"use client"

import "../ZVaults/ZVaults.css"
import Link from "next/link";
import {useAccount, useConnect, useContractWrite, useNetwork, useSwitchNetwork, useWaitForTransaction} from "wagmi";
import {useEffect, useState} from "react";
import {chainId} from "@/contract/web3";

const Portfolio = () => {
  const {isConnected} = useAccount()
  const {connect, connectors} = useConnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()

  // const {data: hashData, write: approve, isError: err1} = useContractWrite({
  //   address: '',
  //   abi: {},
  //   functionName: 'approve',
  //   args: [],
  //   chainId: 97
  // })
  //
  // const {isSuccess: isFinish, data: d, isError: err4} = useWaitForTransaction({
  //   hash: hashData?.hash,
  // })
  //
  // const {data, isLoading, write, isError: err2} = useContractWrite({
  //   address: '',
  //   abi: {},
  //   functionName: '',
  //   args: [],
  //   chainId: 97
  // })

  useEffect(() => {
    if (isConnected && chain?.id !== chainId) switchNetwork?.(chainId)
  }, [isConnected])
  return (
    <>
      <div className="modal-bg" style={{display: isModalOpen ? 'block' : 'none'}} onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          {connectors.map(connector => (
            <div className="modal-button" key={connector.name} onClick={() => {
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
            <h3 className="holding-title"> NFT <span className="holding-profit">2</span>
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
                  <th>24h volume</th>
                  <th>Category</th>
                  <th>Performance</th>
                  <th>Twitter performance</th>
                  <th>AI Score</th>
                  <th>Allocation</th>
                </tr>
                <tr>
                  <td>RARI</td>
                  <td>$0.9938</td>
                  <td>787</td>
                  <td>11.87%</td>
                  <td>9.06%</td>
                  <td>-2.28%</td>
                  <td>-1.55%</td>
                  <td>$11.51 M</td>
                  <td>$561,445.26</td>
                  <td>NFT</td>
                  <td>Bullish</td>
                  <td>64</td>
                  <td>0.11</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>BOSON</td>
                  <td>$0.1465</td>
                  <td>666</td>
                  <td>16.79%</td>
                  <td>11.98%</td>
                  <td>20.16%</td>
                  <td>-6.10%</td>
                  <td>$15.71 M</td>
                  <td>$275,225.55</td>
                  <td>NFT</td>
                  <td>Bullish</td>
                  <td>1058</td>
                  <td>0.12</td>
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

export default Portfolio;