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
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> DeFi <span className="holding-profit">6</span>
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
                  <td>INJ</td>
                  <td>$7.41</td>
                  <td>59</td>
                  <td>4.08%</td>
                  <td>13.94%</td>
                  <td>-3.56%</td>
                  <td>20.87%</td>
                  <td>$620.63 M</td>
                  <td>$741.00 M</td>
                  <td>$14.45 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>14 /100</td>
                  <td>1114</td>
                  <td>0.14</td>
                  <td>3.4</td>
                </tr>
                <tr>
                  <td>PENDLE</td>
                  <td>$0.6159</td>
                  <td>184</td>
                  <td>0.87%</td>
                  <td>11.12%</td>
                  <td>13.89%</td>
                  <td>16.86%</td>
                  <td>$144.54 M</td>
                  <td>$159.18 M</td>
                  <td>$5.72 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>27 /100</td>
                  <td>985</td>
                  <td>0.27</td>
                  <td>3.4</td>
                </tr>
                <tr>
                  <td>TRU</td>
                  <td>$0.0376</td>
                  <td>398</td>
                  <td>4.51%</td>
                  <td>24.93%</td>
                  <td>27.69%</td>
                  <td>-2.34%</td>
                  <td>$40.13 M</td>
                  <td>$45.06 M</td>
                  <td>$4.35 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>25 /100</td>
                  <td>1011</td>
                  <td>0.25</td>
                  <td>3.4</td>
                </tr>
                <tr>
                  <td>BICO</td>
                  <td>$0.2081</td>
                  <td>192</td>
                  <td>1.63%</td>
                  <td>7.98%</td>
                  <td>-2.74%</td>
                  <td>-9.78%</td>
                  <td>$136.85 M</td>
                  <td>$208.10 M</td>
                  <td>$1.35 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>14 /100</td>
                  <td>962</td>
                  <td>0.14</td>
                  <td>3.4</td>
                </tr>
                <tr>
                  <td>LQTY</td>
                  <td>$0.823</td>
                  <td>266</td>
                  <td>1.04%</td>
                  <td>8.39%</td>
                  <td>2.82%</td>
                  <td>-2.30%</td>
                  <td>$76.77 M</td>
                  <td>$82.15 M</td>
                  <td>$8.22 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>13 /100</td>
                  <td>1319</td>
                  <td>0.13</td>
                  <td>3.4</td>
                </tr>
                <tr>
                  <td>LEVER</td>
                  <td>$0.001387</td>
                  <td>446</td>
                  <td>1.69%</td>
                  <td>11.10%</td>
                  <td>28.23%</td>
                  <td>16.81%</td>
                  <td>$33.74 M</td>
                  <td>$49.00 M</td>
                  <td>$8.98 M</td>
                  <td>DeFi</td>
                  <td>Bullish</td>
                  <td>21 /100</td>
                  <td>121</td>
                  <td>0.21</td>
                  <td>3.4</td>
                </tr>
              </table>
            </div>
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
                  <td>RARE</td>
                  <td>$0.062803</td>
                  <td>479</td>
                  <td>3.03%</td>
                  <td>8.24%</td>
                  <td>4.96%</td>
                  <td>-4.80%</td>
                  <td>$29.61 M</td>
                  <td>$62.60 M</td>
                  <td>$808,567.53</td>
                  <td>NFT</td>
                  <td>Bullish</td>
                  <td>11 /100</td>
                  <td>3404</td>
                  <td>0.11</td>
                  <td>0.2</td>
                </tr>

                <tr>
                  <td>DEGO</td>
                  <td>$1.36</td>
                  <td>969</td>
                  <td>1.28%</td>
                  <td>7.96%</td>
                  <td>1.35%</td>
                  <td>-1.39%</td>
                  <td>$7.39 M</td>
                  <td>$16.29 M</td>
                  <td>$1.71 M</td>
                  <td>NFT</td>
                  <td>Bullish</td>
                  <td>10 /100</td>
                  <td>540</td>
                  <td>0.1</td>
                  <td>0.2</td>
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
                  <td>SPELL</td>
                  <td>$0.00047953</td>
                  <td>346</td>
                  <td>1.47%</td>
                  <td>26.82%</td>
                  <td>24.43%</td>
                  <td>8.62%</td>
                  <td>$51.77 M</td>
                  <td>$94.48 M</td>
                  <td>$5.48 M</td>
                  <td>Yield Farming</td>
                  <td>Bullish</td>
                  <td>11 /100</td>
                  <td>1289</td>
                  <td>0.11</td>
                  <td>0.2</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="holding-tables">
          <div className="holding-table-box">
            <h3 className="holding-title"> Gaming <span className="holding-profit">2</span>
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
                  <td>TLM</td>
                  <td>$0.01007</td>
                  <td>422</td>
                  <td>-0.30%</td>
                  <td>5.38%</td>
                  <td>0.14%</td>
                  <td>-3.93%</td>
                  <td>$36.81 M</td>
                  <td>$61.27 M</td>
                  <td>$3.80 M</td>
                  <td>Gaming</td>
                  <td>Bullish</td>
                  <td>13 /100</td>
                  <td>814</td>
                  <td>0.13</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>HELLO</td>
                  <td>$0.0437</td>
                  <td>560</td>
                  <td>1.99%</td>
                  <td>5.51%</td>
                  <td>0.76%</td>
                  <td>27.23%</td>
                  <td>$23.22 M</td>
                  <td>$43.70 M</td>
                  <td>$902,272.08</td>
                  <td>Gaming</td>
                  <td>Bullish</td>
                  <td>21 /100</td>
                  <td>451</td>
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

export default ZVaults;