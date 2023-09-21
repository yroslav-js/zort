"use client"

import './Main.css'
import {useAccount, useBalance, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect, useState} from "react";
import {chainId, getCoinContract} from "@/contract/web3";
import {Modal} from "antd";
import userSelectToken from "@/data/userSelectToken";
import {portfolios} from "@/data/portfolios";
import {swap} from "@/contract/functions";
import Link from "next/link";
import {AnimatePresence, motion} from 'framer-motion'
import {USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS} from "@/contract/config";

const Main = () => {
  const {isConnected, address} = useAccount()
  const {connect, connectors} = useConnect()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [select, setSelect] = useState(false)
  const [selectedToken, setSelectedToken] = useState(0)
  const [invest, setInvest] = useState(false)
  const [portfolio, setPortfolio] = useState('')
  const [walletConnect, setWalletConnect] = useState(false)
  const [amount, setAmount] = useState('')
  const [transactionLoading, setTransactionLoading] = useState(false)
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()
  const [balanceUSDT, setBalanceUSDT] = useState(0)
  const [balanceUSDC, setBalanceUSDC] = useState(0)
  const [isEth, setIsEth] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const {data} = useBalance({address})

  useEffect(() => {
    if (selectedToken === 0) setIsEth(true)
    else setIsEth(false)
  }, [selectedToken])

  useEffect(() => {
    if (isConnected && chain?.id !== chainId) switchNetwork?.(chainId)
  }, [isConnected])

  useEffect(() => {
    getCoinContract(USDT_CONTRACT_ADDRESS)?.balanceOf(address).then((data: any) => {
      setBalanceUSDT(Number(data) / 10 ** 6)
    }).catch((e: any) => {
      console.log(e)
    })
    getCoinContract(USDC_CONTRACT_ADDRESS)?.balanceOf(address).then((data: any) => setBalanceUSDC(Number(data) / 10 ** 6)).catch((e: any) => {
      console.log(e)
    })
  }, [transactionLoading])

  const coinsImage = (portfolio: string) => {
    const coins = portfolios.find(p => p.portfolio === portfolio)?.investmentCoins
    return coins?.map((coin, i) => {
      if (i > 5) return null
      if (i === 5) return (
        <div className="group-569" key={coin.name}>
          <div className="overlap-group">
            <div className="text inter-semi-bold-black-10px">
              +{Number(coins.length) - 5}
            </div>
          </div>
        </div>
      )
      return (<img className={i === 0 ? "image-1 image-3" : "image"}
                   src={coin.img} alt={`image ${i + 1}`} key={i}/>)
    })
  }

  useEffect(() => {
    isModalOpen && window.document.querySelector("body")?.classList.add("open")
    !isModalOpen && window.document.querySelector("body")?.classList.remove("open")
  }, [isModalOpen])
  return (
    <>
      <div className="modal-bg" style={{display: isModalOpen ? 'block' : 'none'}} onClick={() => {
        setIsModalOpen(false)
        setWalletConnect(false)
        setInvest(false)
      }}>
        <div className={`modal ${invest && 'invest-modal'}`} onClick={e => e.stopPropagation()}>
          <Modal
            open={select}
            footer={null}
            onCancel={() => {
              setSelect(false)
            }}
            title="Select a token"
          >
            <div className="modalContent">
              {userSelectToken.map((coin, i) => {
                return (
                  <div style={selectedToken === i ? {opacity: .5} : {}} key={coin.name} onClick={() => {
                    setSelect(false)
                    setSelectedToken(i)
                  }} className="modal-button">
                    {coin.name}
                    <img src={`${coin.icon}`} alt=""/>
                  </div>
                );
              })}
            </div>
          </Modal>
          {invest &&
            <div>
              <div className="input-wrapper">
                <input
                  className="modal-input" min={0} type="number" value={amount}
                  onChange={e => {
                    if (e.target.value.includes('-')) return
                    // const num = Math.floor(Number(e.target.value))
                    setAmount(e.target.value)
                  }}/>
                <div className="selected-token" onClick={() => setSelect(true)}>
                  {userSelectToken[selectedToken].name}
                  <img src={`${userSelectToken[selectedToken].icon}`} alt=""/>
                </div>
              </div>
              {selectedToken === 0 &&
                <div className='balance'
                     style={Number(data?.formatted) < Number(amount) ? {color: "red"} : {}}>balance: {Number(data?.formatted || 0).toFixed(5)}</div>
              }
              {selectedToken === 1 &&
                <div className='balance'
                     style={balanceUSDT < Number(amount) ? {color: "red"} : {}}>balance: {balanceUSDT.toFixed(5) || 0}</div>
              }
              {selectedToken === 2 &&
                <div className='balance'
                     style={balanceUSDC < Number(amount) ? {color: "red"} : {}}>balance: {balanceUSDC.toFixed(5) || 0}</div>
              }
              <div className="footer-modal">
                <div className="token-wrapper">
                  {portfolios.find(p => p.portfolio === portfolio)?.investmentCoins.map(token => (
                    <div className="token" key={token.name}>
                      <div style={{display: "flex", alignItems: "center", gap: '5px'}}>
                        <img src={`${token.img}`} alt=""/>
                        {token.name}
                      </div>
                      <div>
                        {Math.floor(100 / (portfolios.find(p => p.portfolio === portfolio)?.investmentCoins.length || 0))}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal-button invest"
                     style={transactionLoading ? {opacity: .5, cursor: "default"} : {}}
                     onClick={async () => {
                       if (!isConnected) {
                         setWalletConnect(true)
                         setInvest(false)
                         return
                       }
                       if (chain?.id !== chainId) return switchNetwork?.(chainId)
                       if (Number(data?.formatted) < Number(amount) && selectedToken === 0) return
                       if (Number(balanceUSDT) < Number(amount) && selectedToken === 1) return
                       if (Number(balanceUSDC) < Number(amount) && selectedToken === 2) return
                       if (Number(amount) > 0) {
                         setTransactionLoading(true)
                         await swap(
                           portfolios.find(p => p.portfolio === portfolio)?.investmentCoins.map(token => token.address) || [''],
                           amount, userSelectToken[selectedToken].address, address || '', isEth)
                         setTransactionLoading(false)
                       }
                     }}>
                  <img className="frame-27" alt="Frame" src="/img/frame-3.svg"/> Join now
                </div>
              </div>
            </div>
          }
          {walletConnect && connectors.map(connector => (
            <div className="connect-button" key={connector.name} onClick={() => {
              setIsModalOpen(false)
              setWalletConnect(false)
              connect({connector})
            }}>{connector.name}</div>
          ))}
        </div>
      </div>
      <div className="container-center-horizontal">
        <div className="home-u47-zero-state screen">
          <div className="group-container">
            <div className="group-556">
              <img
                className="group-1200"
                src="/img/group-1200@4x.png"
                alt="Group 1200"
              />
              <div className="group-552 inter-normal-black-haze-14px">
                <div className="overlap-group-3">
                  <Link href='/' className="fourth-link-13">Home</Link>
                </div>
                <div className="fourth-link-14"><Link href="/zvaults">ZVaults</Link></div>
                {/*<div className="fourth-link-15 not-now">Analytics</div>*/}
                {/*<div className="fourth-link-16 not-now">Settings</div>*/}
              </div>
            </div>
            <div className="group-705">
              <div className="fourth-link-17 inter-semi-bold-white-12px not-now" onClick={() => {
                if (!isConnected) {
                  setIsModalOpen(true)
                  setWalletConnect(true)
                }
              }}>{isConnected ? "Connected" : "Connect Wallet"}
              </div>
            </div>
          </div>
          <div className="filter-container flex-row-3">

            <div className='flex-row-3-header'>
              <div className="flex-row-4">
                <div className="fourth-link-18 inter-semi-bold-white-22px">
                  Trending Zvaults
                </div>
                <div className="frame-569">
                  <button className="filter-button frame-560" data-filter="all" onClick={() => setFilter('ALL')}>
                    <div className="ellipse-21-3 ellipse-21-6"></div>
                    <div className="fourth-link inter-semi-bold-white-12px">All</div>
                  </button>
                  <button onClick={() => setFilter('Fundamental')}
                          className="filter-button frame-564-3 frame-564-4"
                          data-filter=".meme"
                  >
                    <div className="ellipse-21"></div>
                    <div className="fourth-link inter-semi-bold-riptide-12px">
                      Fundamental
                    </div>
                  </button>
                  <button onClick={() => setFilter('Defi')} className="filter-button frame-565" data-filter=".defi">
                    <div className="ellipse-21-1 ellipse-21-6"></div>
                    <div
                      className="fourth-link inter-semi-bold-double-colonial-white-12px"
                    >
                      Defi
                    </div>
                  </button>
                  <button onClick={() => setFilter('NFT')} className="filter-button frame-566" data-filter=".nft">
                    <div className="ellipse-21-4 ellipse-21-6"></div>
                    <div className="fourth-link inter-semi-bold-biloba-flower-12px-2">
                      NFT
                    </div>
                  </button>
                  <button onClick={() => setFilter('Meme')} className="filter-button frame-567" data-filter=".emerging">
                    <div className="ellipse-21-5 ellipse-21-6"></div>
                    <div className="fourth-link-19">Meme</div>
                  </button>
                </div>
              </div>
              <div className="frame-5-1">
                <div className="fourth-link-9 inter-semi-bold-white-12px">
                  <Link href="/zvaults">View All</Link>
                </div>
              </div>
            </div>

            <motion.div className='flex-row-trending'
                        style={filter !== 'ALL' ? {justifyContent: "initial"} : {}}>
              <AnimatePresence>
                {
                  [
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={1}
                                        className="mix nft overlap-group-container-1">
                        <div className="flex-col-5 flex-col-12">
                          <div className="flex-row flex">
                            <div className="flex-col flex">
                              <Link href='/NFT' className="fourth-link-1 inter-semi-bold-white-16px">
                                NFT
                              </Link>
                              <div className="group-5">
                                <div className="frame-564">
                                  <div className="ellipse-21-2 ellipse-21-6"></div>
                                  <div
                                    className="fourth-link inter-semi-bold-biloba-flower-12px"
                                  >
                                    NFT
                                  </div>
                                </div>
                                <div className="frame-426">
                                  {coinsImage("NFT")}
                                </div>
                              </div>
                            </div>
                            <div className="group-5-1">
                              <div className="fourth-link-container">
                                <div
                                  className="fourth-link-2 inter-semi-bold-slimy-green-18px-3"
                                >
                                  9.9
                                </div>
                                <div className="fourth-link-3 inter-normal-white-8px">
                                  AI Score
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-col-1 flex-col-12">
                            <div className="group-598">
                              <div className="fourth-link-container-1">
                                <div className="fourth-link-4 inter-semi-bold-white-18px">
                                  101 Days
                                </div>
                                <div
                                  className="fourth-link-5 inter-normal-quick-silver-10px"
                                >
                                  Active for
                                </div>
                              </div>
                              <div className="fourth-link-container-2">
                                <div
                                  className="fourth-link-4 inter-semi-bold-slimy-green-18px"
                                >
                                  34.4%
                                </div>
                                <div
                                  className="fourth-link-5 inter-normal-quick-silver-10px"
                                >
                                  All Time Profit
                                </div>
                              </div>
                              <div className="group-597 cursor-p" onClick={() => {
                                setPortfolio('NFT')
                                setIsModalOpen(true)
                                setInvest(true)
                              }}>
                                <img
                                  className="frame"
                                  src="/img/frame-5.svg"
                                  alt="Frame"
                                />
                                <div className="fourth-link-6 inter-semi-bold-white-12px">
                                  Join Now
                                </div>
                              </div>
                            </div>
                            <img
                              className="frame-5"
                              src="/img/frame-582.svg"
                              alt="Frame 582"
                            />
                          </div>
                        </div>
                        <div className="overlap-group9">
                          <div className="fourth-link-7 inter-bold-black-10px">NEW</div>
                        </div>
                      </motion.div>,
                      category: 'NFT'
                    },
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={2}
                                        className="mix defi overlap-group-container-3">
                        <div className="flex-col-6 flex-col-12">
                          <div className="flex-row flex">
                            <div className="flex-col flex">
                              <Link href="/YieldFarming" className="fourth-link-1 inter-semi-bold-white-16px">
                                Yield Farming
                              </Link>
                              <div className="group-5">
                                <div className="frame-564-1 frame-564-4">
                                  <div className="ellipse-21-1 ellipse-21-6"></div>
                                  <div
                                    className="fourth-link inter-semi-bold-double-colonial-white-12px"
                                  >
                                    Defi
                                  </div>
                                </div>
                                <div className="frame-426">
                                  {coinsImage("Yield Farming")}
                                </div>
                              </div>
                            </div>
                            <div className="group-5-1">
                              <div className="fourth-link-container-3">
                                <div
                                  className="fourth-link-2 inter-semi-bold-slimy-green-18px"
                                >
                                  9.2
                                </div>
                                <div className="fourth-link-3 inter-normal-white-8px">
                                  AI Score
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-col-1 flex-col-12">
                            <div className="group-598">
                              <div className="fourth-link-container-4">
                                <div className="fourth-link-4 inter-semi-bold-white-18px">
                                  88 Days
                                </div>
                                <div
                                  className="fourth-link-5 inter-normal-quick-silver-10px"
                                >
                                  Active for
                                </div>
                              </div>
                              <div className="fourth-link-container-5">
                                <div
                                  className="fourth-link-4 inter-semi-bold-slimy-green-18px"
                                >
                                  45.17%
                                </div>
                                <div
                                  className="fourth-link-5 inter-normal-quick-silver-10px"
                                >
                                  All Time Profit
                                </div>
                              </div>
                              <div className="group-597-1 cursor-p" onClick={() => {
                                setPortfolio('Yield Farming')
                                setIsModalOpen(true)
                                setInvest(true)
                              }}>
                                <img
                                  className="frame"
                                  src="/img/frame-5.svg"
                                  alt="Frame"
                                />
                                <div className="fourth-link-6 inter-semi-bold-white-12px">
                                  Join Now
                                </div>
                              </div>
                            </div>
                            <img
                              className="frame-5"
                              src="/img/frame-576.svg"
                              alt="Frame 576"
                            />
                          </div>
                        </div>
                        <div className="overlap-group10">
                          <div className="fourth-link-7 inter-bold-black-10px">NEW</div>
                        </div>
                      </motion.div>,
                      category: 'Defi'
                    },
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={3}
                                        className="mix defi flex-col-2 flex-col-12">
                        <div className="flex-row flex">
                          <div className="flex-col flex">
                            <Link href="Defi" className="fourth-link-1 inter-semi-bold-white-16px">
                              Defi
                            </Link>
                            <div className="group-5">
                              <div className="frame-564-1 frame-564-4">
                                <div className="ellipse-21-1 ellipse-21-6"></div>
                                <div
                                  className="fourth-link inter-semi-bold-double-colonial-white-12px"
                                >
                                  Defi
                                </div>
                              </div>
                              <div className="frame-426">
                                {coinsImage("Defi")}
                              </div>
                            </div>
                          </div>
                          <div className="group-5-1">
                            <div className="fourth-link-container-3">
                              <div
                                className="fourth-link-2 inter-semi-bold-slimy-green-18px"
                              >
                                9.2
                              </div>
                              <div className="fourth-link-3 inter-normal-white-8px">
                                AI Score
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col-1 flex-col-12">
                          <div className="group-598">
                            <div className="fourth-link-container-4">
                              <div className="fourth-link-4 inter-semi-bold-white-18px">
                                95 Days
                              </div>
                              <div
                                className="fourth-link-5 inter-normal-quick-silver-10px"
                              >
                                Active for
                              </div>
                            </div>
                            <div className="fourth-link-container-5">
                              <div
                                className="fourth-link-4 inter-semi-bold-slimy-green-18px"
                              >
                                146.7%
                              </div>
                              <div
                                className="fourth-link-5 inter-normal-quick-silver-10px"
                              >
                                All Time Profit
                              </div>
                            </div>
                            <div className="group-597-1 cursor-p" onClick={() => {
                              setPortfolio('Defi')
                              setIsModalOpen(true)
                              setInvest(true)
                            }}>
                              <img className="frame" src="/img/frame-6.svg" alt="Frame"/>
                              <div className="fourth-link-6 inter-semi-bold-white-12px">
                                Join Now
                              </div>
                            </div>
                          </div>
                          <img
                            className="frame-5"
                            src="/img/frame-576-1.svg"
                            alt="Frame 576"
                          />
                        </div>
                      </motion.div>,
                      category: 'Defi'
                    },
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={4}
                                        className="mix meme flex-col-2 flex-col-12">
                        <div className="flex-row-1">
                          <div className="flex-col-3 flex-col-12">
                            <Link href="EthereumEcosystem" className="fourth-link-1 inter-semi-bold-white-16px">
                              Ethereum Ecosystem
                            </Link>
                            <div className="group-573">
                              <div className="frame-564-2 frame-564-4">
                                <div className="ellipse-21"></div>
                                <div className="fourth-link inter-semi-bold-riptide-12px">
                                  Fundamental
                                </div>
                              </div>
                              <div className="frame-426">
                                {coinsImage("Ethereum Ecosystem")}
                              </div>
                            </div>
                          </div>
                          <div className="group-5-1">
                            <div className="fourth-link-container-6">
                              <div
                                className="fourth-link-8 inter-semi-bold-slimy-green-18px-2"
                              >
                                9.1
                              </div>
                              <div className="fourth-link-3 inter-normal-white-8px">
                                AI Score
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col-1 flex-col-12">
                          <div className="group-598">
                            <div className="fourth-link-container-4">
                              <div className="fourth-link-4 inter-semi-bold-white-18px">
                                89 Days
                              </div>
                              <div
                                className="fourth-link-5 inter-normal-quick-silver-10px"
                              >
                                Active for
                              </div>
                            </div>
                            <div className="fourth-link-container-5">
                              <div
                                className="fourth-link-4 inter-semi-bold-slimy-green-18px"
                              >
                                95.7%
                              </div>
                              <div
                                className="fourth-link-5 inter-normal-quick-silver-10px"
                              >
                                All Time Profit
                              </div>
                            </div>
                            <div className="group-597-1 cursor-p" onClick={() => {
                              setPortfolio('Ethereum Ecosystem')
                              setIsModalOpen(true)
                              setInvest(true)
                            }}>
                              <img className="frame" src="/img/frame-4.svg" alt="Frame"/>
                              <div className="fourth-link-6 inter-semi-bold-white-12px">
                                Join Now
                              </div>
                            </div>
                          </div>
                          <img
                            className="frame-5"
                            src="/img/frame-575-1.svg"
                            alt="Frame 575"
                          />
                        </div>
                      </motion.div>,
                      category: 'Fundamental'
                    },
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={5}
                                        className="mix meme flex-col-8 flex-col-12">
                        <div className="flex-row-1">
                          <div className="flex-col-3 flex-col-12">
                            <Link href="/Oracle" className="fourth-link-1 inter-semi-bold-white-16px">
                              Oracle
                            </Link>
                            <div className="group-573">
                              <div className="frame-564-2 frame-564-4">
                                <div className="ellipse-21"></div>
                                <div className="fourth-link inter-semi-bold-riptide-12px">
                                  Fundamental
                                </div>
                              </div>
                              <div className="frame-426">
                                {coinsImage("Oracle")}
                              </div>
                            </div>
                          </div>
                          <div className="group-5-1">
                            <div className="fourth-link-container-6">
                              <div
                                className="fourth-link-8 inter-semi-bold-slimy-green-18px-2"
                              >
                                9.1
                              </div>
                              <div className="fourth-link-3 inter-normal-white-8px">
                                AI Score
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col-1 flex-col-12">
                          <div className="group-598">
                            <div className="fourth-link-container-4">
                              <div className="fourth-link-4 inter-semi-bold-white-18px">
                                89 Days
                              </div>
                              <div className="fourth-link-5 inter-normal-quick-silver-10px">
                                Active for
                              </div>
                            </div>
                            <div className="fourth-link-container-5">
                              <div className="fourth-link-4 inter-semi-bold-slimy-green-18px">
                                105.13%
                              </div>
                              <div className="fourth-link-5 inter-normal-quick-silver-10px">
                                All Time Profit
                              </div>
                            </div>
                            <div className="group-597-1 cursor-p" onClick={() => {
                              setPortfolio('Oracle')
                              setIsModalOpen(true)
                              setInvest(true)
                            }}>
                              <img className="frame" src="/img/frame-3.svg" alt="Frame"/>
                              <div className="fourth-link-6 inter-semi-bold-white-12px">
                                Join Now
                              </div>
                            </div>
                          </div>
                          <img className="frame-5" src="/img/frame-575.svg" alt="Frame 575"/>
                        </div>
                      </motion.div>,
                      category: 'Fundamental'
                    },
                    {
                      item: <motion.div layout transition={{duration: isModalOpen ? 0 : 0.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={6}
                                        className="mix emerging flex-col-9 flex-col-12">
                        <div className="flex-row flex">
                          <div className="flex-col flex">
                            <Link href="/Gaming" className="fourth-link-1 inter-semi-bold-white-16px">
                              Gaming
                            </Link>
                            <div className="group-5">
                              <div className="frame-567">
                                <div className="ellipse-21-5 ellipse-21-6"></div>
                                <div
                                  className="fourth-link fourth-link-19"
                                >
                                  Meme
                                </div>
                              </div>
                              <div className="frame-426">
                                {coinsImage("Gaming")}
                              </div>
                            </div>
                          </div>
                          <div className="group-5-1">
                            <div className="fourth-link-container">
                              <div
                                className="fourth-link-2 inter-semi-bold-slimy-green-18px-3"
                              >
                                9.9
                              </div>
                              <div className="fourth-link-3 inter-normal-white-8px">
                                AI Score
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col-1 flex-col-12">
                          <div className="group-598">
                            <div className="fourth-link-container-1">
                              <div className="fourth-link-4 inter-semi-bold-white-18px">
                                78 Days
                              </div>
                              <div className="fourth-link-5 inter-normal-quick-silver-10px">
                                Active for
                              </div>
                            </div>
                            <div className="fourth-link-container-2">
                              <div className="fourth-link-4 inter-semi-bold-slimy-green-18px">
                                129.8%
                              </div>
                              <div className="fourth-link-5 inter-normal-quick-silver-10px">
                                All Time Profit
                              </div>
                            </div>
                            <div className="group-597 cursor-p" onClick={() => {
                              setPortfolio('Gaming')
                              setIsModalOpen(true)
                              setInvest(true)
                            }}>
                              <img className="frame" src="/img/frame-8.svg" alt="Frame"/>
                              <div className="fourth-link-6 inter-semi-bold-white-12px">
                                Join Now
                              </div>
                            </div>
                          </div>
                          <img
                            className="frame-5"
                            src="/img/frame-582-1.svg"
                            alt="Frame 582"
                          />
                        </div>
                      </motion.div>,
                      category: 'Meme'
                    }
                  ].filter(item => {
                    if (filter === "ALL") return true
                    if (item.category === filter) return true
                    return false
                  }).map(item => item.item)
                }
              </AnimatePresence>
            </motion.div>
          </div>
          {/*<div className="flex-row-6">*/}
          {/*  <div className="flex-col-10 flex-col-12">*/}
          {/*    <div className="fourth-link-20 inter-semi-bold-white-22px">*/}
          {/*      Crypto News*/}
          {/*    </div>*/}
          {/*    <div className="overlap-group19">*/}
          {/*      <p className="fourth-link-21 inter-semi-bold-white-16px">*/}
          {/*        FTX-Linked Wallet Moves $10 Million in Altcoins Ahead of*/}
          {/*        Bankruptcy Hearing*/}
          {/*      </p>*/}
          {/*      <p className="fourth-link-22">*/}
          {/*        Bankrupt crypto exchange FTX’s Solana wallet has moved $10*/}
          {/*        million in altocoins to Ethereum network through the Wormhole*/}
          {/*        bridge in the last 4 days, sparking fears of more token dumps in*/}
          {/*        the market. Read on to learn more.*/}
          {/*      </p>*/}
          {/*      <div className="flex-row-7">*/}
          {/*        <div className="frame-58">*/}
          {/*          <div className="fourth-link-10 inter-medium-celeste-10px">*/}
          {/*            BLOCKCHAIN NEWS*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="fourth-link-11 inter-normal-quick-silver-10px">*/}
          {/*          Posted 42 minutes ago*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="overlap-group-container-4">*/}
          {/*    <div className="overlap-group1">*/}
          {/*      <p className="fourth-link-12 inter-semi-bold-white-16px">*/}
          {/*        Chinese Bank Uses Digital Yuan Giveaway to Promote Waste*/}
          {/*        Recycling Drive*/}
          {/*      </p>*/}
          {/*      <div className="flex-row-2">*/}
          {/*        <div className="frame-58">*/}
          {/*          <div className="fourth-link-10 inter-medium-celeste-10px">*/}
          {/*            ALTCOIN NEWS*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="fourth-link-11 inter-normal-quick-silver-10px">*/}
          {/*          Posted 42 minutes ago*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="overlap-group1">*/}
          {/*      <p className="fourth-link-12 inter-semi-bold-white-16px">*/}
          {/*        FTX Financial Filing Reveals Yacht Purchase for Former Co-CEO*/}
          {/*        Sam Trabucco*/}
          {/*      </p>*/}
          {/*      <div className="flex-row-8">*/}
          {/*        <div className="frame-58">*/}
          {/*          <div className="fourth-link-10 inter-medium-celeste-10px">*/}
          {/*            BLOCKCHAIN NEWS*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="fourth-link-11 inter-normal-quick-silver-10px">*/}
          {/*          Posted 42 minutes ago*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="flex-col-11 flex-col-12">*/}
          {/*    <div className="frame-5-1">*/}
          {/*      <div className="fourth-link-9 inter-semi-bold-white-12px">*/}
          {/*        View All*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="overlap-group15">*/}
          {/*      <p className="fourth-link-12 inter-semi-bold-white-16px">*/}
          {/*        Ripple Objects to SEC&#39;s Appeal of Ruling on Crypto as*/}
          {/*        Non-Security*/}
          {/*      </p>*/}
          {/*      <div className="flex-row-2">*/}
          {/*        <div className="frame-58">*/}
          {/*          <div className="fourth-link-10 inter-medium-celeste-10px">*/}
          {/*            ALTCOIN NEWS*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="fourth-link-11 inter-normal-quick-silver-10px">*/}
          {/*          Posted 42 minutes ago*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="overlap-group17">*/}
          {/*      <p className="fourth-link-12 inter-semi-bold-white-16px">*/}
          {/*        Bitcoin Price Prediction as Bulls Hold $25,800 Level – Here are*/}
          {/*        Key Levels to Watch*/}
          {/*      </p>*/}
          {/*      <div className="flex-row-9">*/}
          {/*        <div className="frame-58">*/}
          {/*          <div className="fourth-link-10 inter-medium-celeste-10px">*/}
          {/*            PRICE PREDICTIONS*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="fourth-link-11 inter-normal-quick-silver-10px">*/}
          {/*          Posted 42 minutes ago*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="flex-row-10">*/}
          {/*  <p*/}
          {/*    className="zort-inc-2023-all-rights-reserved inter-normal-quick-silver-10px"*/}
          {/*  >*/}
          {/*    © ZORT Inc. 2023 All rights reserved.*/}
          {/*  </p>*/}
          {/*  <div className="frame-604 inter-normal-white-10px">*/}
          {/*    <div className="frame-604-item">News</div>*/}
          {/*    <div className="ellipse"></div>*/}
          {/*    <div className="frame-604-item">Terms and Conditions</div>*/}
          {/*    <div className="ellipse"></div>*/}
          {/*    <div className="frame-604-item">Privacy Policy</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default Main;