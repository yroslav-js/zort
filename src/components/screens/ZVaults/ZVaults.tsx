"use client"

import "./ZVaults.css"
import Link from "next/link";
import {useAccount, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect, useState} from "react";
import {chainId} from "@/contract/web3";

const ZVaults = () => {
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
                  <th>24h volume</th>
                  <th>Category</th>
                  <th>Performance</th>
                  <th>Twitter performance</th>
                  <th>AI Score</th>
                  <th>Allocation</th>
                </tr>
                <tr>
                  <td>OGN</td>
                  <td>$0.08997</td>
                  <td>347</td>
                  <td>-0.81%</td>
                  <td>18.31%</td>
                  <td>-6.92%</td>
                  <td>27.23%</td>
                  <td>$50.05 M</td>
                  <td>$34.79 M</td>
                  <td>Ethereum Ecosystem</td>
                  <td>Bullish</td>
                  <td>1608</td>
                  <td>0.12</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>OAX</td>
                  <td>$0.1594</td>
                  <td>880</td>
                  <td>4.77%</td>
                  <td>23.58%</td>
                  <td>5.96%</td>
                  <td>2.22%</td>
                  <td>$8.97 M</td>
                  <td>$53.83 M</td>
                  <td>Ethereum Ecosystem</td>
                  <td>Bullish</td>
                  <td>342</td>
                  <td>0.19</td>
                  <td>0.2</td>
                </tr>
              </table>
            </div>
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
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> IDO <span className="holding-profit">2</span>
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
                  <td>BBANK</td>
                  <td>$0.0194</td>
                  <td>953</td>
                  <td>10.38%</td>
                  <td>13.12%</td>
                  <td>93.09%</td>
                  <td>633.02%</td>
                  <td>$7.40 M</td>
                  <td>$368,697.58</td>
                  <td>Ignition IDO</td>
                  <td>Bullish</td>
                  <td>412</td>
                  <td>0.3</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>CAPS</td>
                  <td>$0.0164</td>
                  <td>561</td>
                  <td>8.19%</td>
                  <td>21.95%</td>
                  <td>12.03%</td>
                  <td>14.91%</td>
                  <td>$22.01 M</td>
                  <td>$462,801.71</td>
                  <td>Ignition IDO</td>
                  <td>Bullish</td>
                  <td>448</td>
                  <td>0.15</td>
                  <td>0.2</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> DeFi <span className="holding-profit">3</span>
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
                  <td>TENET</td>
                  <td>$0.1558</td>
                  <td>603</td>
                  <td>7.48%</td>
                  <td>8.88%</td>
                  <td>41.80%</td>
                  <td>28.16%</td>
                  <td>$18.51 M</td>
                  <td>$1.66 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>511</td>
                  <td>0.23</td>
                  <td>0.3</td>
                </tr>
                <tr>
                  <td>DFI</td>
                  <td>$0.3372</td>
                  <td>118</td>
                  <td>2.93%</td>
                  <td>9.61%</td>
                  <td>21.87%</td>
                  <td>2.28%</td>
                  <td>$251.62 M</td>
                  <td>$16.87 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>455</td>
                  <td>0.1</td>
                  <td>0.3</td>
                </tr>
                <tr>
                  <td>XVS</td>
                  <td>$4.30</td>
                  <td>279</td>
                  <td>1.20%</td>
                  <td>19.57%</td>
                  <td>-0.31%</td>
                  <td>26.11%</td>
                  <td>$66.88 M</td>
                  <td>$10.05 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>742</td>
                  <td>0.12</td>
                  <td>0.3</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Polkadot Ecosystem <span className="holding-profit">1</span>
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
                  <td>PHA</td>
                  <td>$0.093969</td>
                  <td>313</td>
                  <td>8.76%</td>
                  <td>6.17%</td>
                  <td>3.46%</td>
                  <td>-0.08%</td>
                  <td>$57.06 M</td>
                  <td>$10.71 M</td>
                  <td>Polkadot Ecosystem</td>
                  <td>Bullish</td>
                  <td>706</td>
                  <td>0.15</td>
                  <td>0.1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Oracle <span className="holding-profit">1</span>
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
                  <td>TRB</td>
                  <td>$26.22</td>
                  <td>283</td>
                  <td>12.06%</td>
                  <td>59.33%</td>
                  <td>126.93%</td>
                  <td>195.43%</td>
                  <td>$65.98 M</td>
                  <td>$29.86 M</td>
                  <td>Oracle</td>
                  <td>Bullish</td>
                  <td>755</td>
                  <td>0.26</td>
                  <td>0.1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Web 3.0 <span className="holding-profit">1</span>
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
                  <td>PRIME</td>
                  <td>$4.20</td>
                  <td>208</td>
                  <td>4.15%</td>
                  <td>23.86%</td>
                  <td>50.53%</td>
                  <td>184.41%</td>
                  <td>$109.60 M</td>
                  <td>$2.43 M</td>
                  <td>Web 3.0</td>
                  <td>Bullish</td>
                  <td>748</td>
                  <td>0.27</td>
                  <td>0.1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Wallet <span className="holding-profit">1</span>
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
                  <td>MTL</td>
                  <td>$1.33</td>
                  <td>233</td>
                  <td>2.99%</td>
                  <td>15.38%</td>
                  <td>1.95%</td>
                  <td>29.95%</td>
                  <td>$88.96 M</td>
                  <td>$15.67 M</td>
                  <td>Wallet</td>
                  <td>Bullish</td>
                  <td>741</td>
                  <td>0.23</td>
                  <td>0.1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Yield Farming <span className="holding-profit">1</span>
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
                  <td>SPELL</td>
                  <td>$0.00052133</td>
                  <td>331</td>
                  <td>32.12%</td>
                  <td>28.94%</td>
                  <td>5.14%</td>
                  <td>16.18%</td>
                  <td>$53.92 M</td>
                  <td>$56.22 M</td>
                  <td>Yield Farming</td>
                  <td>Bullish</td>
                  <td>1289</td>
                  <td>0.08</td>
                  <td>0.1</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Fan Token <span className="holding-profit">1</span>
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
                  <td>OG</td>
                  <td>$4.54</td>
                  <td>632</td>
                  <td>0.56%</td>
                  <td>5.70%</td>
                  <td>21.58%</td>
                  <td>-1.91%</td>
                  <td>$17.49 M</td>
                  <td>$18.96 M</td>
                  <td>Fan Token</td>
                  <td>Bullish</td>
                  <td>462</td>
                  <td>0.13</td>
                  <td>0.1</td>
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

export default ZVaults;