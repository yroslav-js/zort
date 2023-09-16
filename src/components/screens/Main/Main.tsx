"use client"

import "./Main.css"
import {useAccount, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect, useState} from "react";

const Main = () => {
  const {isConnected} = useAccount()
  const {connect, connectors} = useConnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()

  useEffect(() => {
    if (isConnected && chain?.id !== 97) switchNetwork?.(97)
  }, [isConnected])

  return (
    <>
      <div style={{
        // display: "none",
        display: isModalOpen ? 'block' : 'none',
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "100%",
        border: "none",
        background: 'rgba(0, 0, 0, .7)',
        fontFamily: "inherit",
        fontSize: "1rem",
        zIndex: 999,
      }} onClick={() => setIsModalOpen(false)}>
        <div style={{
          width: "16em",
          padding: "1.25em",
          borderRadius: "5px",
          background: 'rgb(25, 25, 26)',
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '200px'
        }} onClick={e => e.stopPropagation()}>
          {connectors.map(connector => (
            <div style={{
              color: 'white',
              background: 'linear-gradient(180deg, rgb(106.62, 62.2, 236.94) 0%, rgb(149.57, 62.2, 236.94) 100%)',
              borderRadius: '9px',
              height: '38px',
              display: "flex",
              marginTop: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }} onClick={() => {
              setIsModalOpen(false)
              connect({connector})
            }}>{connector.name}</div>
          ))}
        </div>
      </div>
      <div className="home-zero-state">
        <div className="div-2">
          <div className="group-52" style={isConnected ? {width: '95px'} : {width: '120px'}}>
            <div className="group-53">
              <div className="group-54">
                <div className="fourth-link-103" onClick={() => {
                  !isConnected && setIsModalOpen(true)
                }}>{isConnected ? "Connected" : "Connect Wallet"}
                </div>
              </div>
            </div>
          </div>
          <div className="overlap-17">
            <div className="group-55">
              <div className="overlap-18">
                <div className="group-56">
                  <div className="group-57">
                    <div className="overlap-group-12">
                      <div className="fourth-link-104">13 Days</div>
                      <div className="fourth-link-105">Active for</div>
                    </div>
                  </div>
                  <div className="group-58">
                    <div className="overlap-19">
                      <div className="fourth-link-106">18.45%</div>
                      <div className="fourth-link-105">All Time Profit</div>
                    </div>
                  </div>
                  <div className="group-59">
                    <div className="group-60">
                      <img className="frame-27" alt="Frame" src="/img/frame-3.svg"/>
                      <div className="fourth-link-107">Invest Now</div>
                    </div>
                  </div>
                </div>
                <img className="frame-28" alt="Frame" src="/img/frame-575-5.svg"/>
                <div className="group-61">
                  <div className="frame-29">
                    <div className="ellipse-8"/>
                    <div className="fourth-link-108">Meme</div>
                  </div>
                  <div className="frame-30">
                    <img className="image-7" alt="Image" src="/img/image-1-4-2.svg"/>
                    <img className="image-8" alt="Image" src="/img/image-2-4-2.svg"/>
                    <img className="image-9" alt="Image" src="/img/image-3.png"/>
                    <img className="image-8" alt="Image" src="/img/image-4-3.svg"/>
                    <img className="image-9" alt="Image" src="/img/image-5.png"/>
                    <div className="group-62">
                      <div className="overlap-group-13">
                        <div className="text-wrapper-11">+3</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourth-link-109">Meme 3.0</div>
                <div className="group-63">
                  <div className="overlap-20">
                    <div className="group-64">
                      <div className="fourth-link-110">AI Score</div>
                      <div className="fourth-link-111">9.1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-65">
              <div className="overlap-18">
                <div className="group-56">
                  <div className="group-57">
                    <div className="overlap-group-12">
                      <div className="fourth-link-104">13 Days</div>
                      <div className="fourth-link-105">Active for</div>
                    </div>
                  </div>
                  <div className="group-58">
                    <div className="overlap-19">
                      <div className="fourth-link-106">18.45%</div>
                      <div className="fourth-link-105">All Time Profit</div>
                    </div>
                  </div>
                  <div className="group-59">
                    <div className="group-60">
                      <img className="frame-27" alt="Frame" src="/img/frame-4-2.svg"/>
                      <div className="fourth-link-107">Invest Now</div>
                    </div>
                  </div>
                </div>
                <img className="frame-28" alt="Frame" src="/img/frame-575-1.svg"/>
                <div className="group-61">
                  <div className="frame-29">
                    <div className="ellipse-8"/>
                    <div className="fourth-link-108">Meme</div>
                  </div>
                  <div className="frame-30">
                    <img className="image-7" alt="Image" src="/img/image-1-5.svg"/>
                    <img className="image-8" alt="Image" src="/img/image.svg"/>
                    <img className="image-9" alt="Image" src="/img/image-3.png"/>
                    <img className="image-8" alt="Image" src="/img/image-4-4.svg"/>
                    <img className="image-9" alt="Image" src="/img/image-5.png"/>
                    <div className="group-62">
                      <div className="overlap-group-13">
                        <div className="text-wrapper-11">+3</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourth-link-109">Meme 3.0</div>
                <div className="group-63">
                  <div className="overlap-20">
                    <div className="group-64">
                      <div className="fourth-link-110">AI Score</div>
                      <div className="fourth-link-111">9.1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-31">
              <div className="fourth-link-112">View All</div>
            </div>
            <div className="fourth-link-113">Trending Zvaults</div>
            <div className="frame-32">
              <div className="frame-33">
                <div className="ellipse-9"/>
                <div className="fourth-link-114">All</div>
              </div>
              <div className="frame-34">
                <div className="ellipse-8"/>
                <div className="fourth-link-108">Meme</div>
              </div>
              <div className="frame-35">
                <div className="ellipse-10"/>
                <div className="fourth-link-115">Defi</div>
              </div>
              <div className="frame-36">
                <div className="ellipse-11"/>
                <div className="fourth-link-116">NFT</div>
              </div>
              <div className="frame-37">
                <div className="ellipse-12"/>
                <div className="fourth-link-117">Emerging Projects</div>
              </div>
            </div>
            <div className="overlap-21">
              <div className="group-66">
                <div className="overlap-18">
                  <div className="group-56">
                    <div className="group-57">
                      <div className="overlap-group-12">
                        <div className="fourth-link-104">12 Days</div>
                        <div className="fourth-link-105">Active for</div>
                      </div>
                    </div>
                    <div className="group-58">
                      <div className="overlap-19">
                        <div className="fourth-link-106">20.89%</div>
                        <div className="fourth-link-105">All Time Profit</div>
                      </div>
                    </div>
                    <div className="group-59">
                      <div className="group-60">
                        <img className="frame-27" alt="Frame" src="/img/frame-5-3.svg"/>
                        <div className="fourth-link-107">Invest Now</div>
                      </div>
                    </div>
                  </div>
                  <img className="frame-28" alt="Frame" src="/img/frame-576-6.svg"/>
                  <div className="group-67">
                    <div className="frame-38">
                      <div className="ellipse-10"/>
                      <div className="fourth-link-115">Defi</div>
                    </div>
                    <div className="frame-39">
                      <img className="image-10" alt="Image" src="/img/image-1-6.png"/>
                      <img className="image-9" alt="Image" src="/img/image-2.png"/>
                      <img className="image-9" alt="Image" src="/img/image-3-2x.png"/>
                      <img className="image-9" alt="Image" src="/img/image-4.png"/>
                      <img className="image-9" alt="Image" src="/img/image-5-2x.png"/>
                      <div className="group-62">
                        <div className="overlap-group-14">
                          <div className="text-wrapper-12">+1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fourth-link-109">Defi September</div>
                  <div className="group-63">
                    <div className="overlap-22">
                      <div className="group-64">
                        <div className="fourth-link-110">AI Score</div>
                        <div className="fourth-link-118">9.2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-68">
                <div className="overlap-23">
                  <div className="fourth-link-119">NEW</div>
                </div>
              </div>
            </div>
            <div className="group-69">
              <div className="overlap-18">
                <div className="group-56">
                  <div className="group-57">
                    <div className="overlap-group-12">
                      <div className="fourth-link-104">12 Days</div>
                      <div className="fourth-link-105">Active for</div>
                    </div>
                  </div>
                  <div className="group-58">
                    <div className="overlap-19">
                      <div className="fourth-link-106">20.89%</div>
                      <div className="fourth-link-105">All Time Profit</div>
                    </div>
                  </div>
                  <div className="group-59">
                    <div className="group-60">
                      <img className="frame-27" alt="Frame" src="/img/frame-6.svg"/>
                      <div className="fourth-link-107">Invest Now</div>
                    </div>
                  </div>
                </div>
                <img className="frame-28" alt="Frame" src="/img/frame-576-1.svg"/>
                <div className="group-67">
                  <div className="frame-38">
                    <div className="ellipse-10"/>
                    <div className="fourth-link-115">Defi</div>
                  </div>
                  <div className="frame-39">
                    <img className="image-10" alt="Image" src="/img/image-1-6.png"/>
                    <img className="image-9" alt="Image" src="/img/image-2.png"/>
                    <img className="image-9" alt="Image" src="/img/image-3-2x.png"/>
                    <img className="image-9" alt="Image" src="/img/image-4.png"/>
                    <img className="image-9" alt="Image" src="/img/image-5-2x.png"/>
                    <div className="group-62">
                      <div className="overlap-group-14">
                        <div className="text-wrapper-12">+1</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourth-link-109">Defi September</div>
                <div className="group-63">
                  <div className="overlap-22">
                    <div className="group-64">
                      <div className="fourth-link-110">AI Score</div>
                      <div className="fourth-link-118">9.2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overlap-24">
              <div className="group-70">
                <div className="overlap-18">
                  <img className="frame-28" alt="Frame" src="/img/frame-582.svg"/>
                  <div className="group-67">
                    <div className="frame-40">
                      <div className="ellipse-13"/>
                      <div className="fourth-link-120">NFT</div>
                    </div>
                    <div className="frame-39">
                      <img className="image-10" alt="Image" src="/img/image-1-7.png"/>
                      <img className="image-9" alt="Image" src="/img/image-2-6.png"/>
                      <img className="image-9" alt="Image" src="/img/image-3-2.png"/>
                      <img className="image-9" alt="Image" src="/img/image-4-7.png"/>
                      <img className="image-9" alt="Image" src="/img/image-5-2.png"/>
                      <div className="group-62">
                        <div className="overlap-group-15">
                          <div className="text-wrapper-11">+8</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fourth-link-109">NFT 4.0</div>
                  <div className="group-63">
                    <div className="overlap-25">
                      <div className="group-64">
                        <div className="fourth-link-110">AI Score</div>
                        <div className="fourth-link-121">9.9</div>
                      </div>
                    </div>
                  </div>
                  <div className="group-56">
                    <div className="group-71">
                      <div className="overlap-group-16">
                        <div className="fourth-link-104">644 Days</div>
                        <div className="fourth-link-105">Active for</div>
                      </div>
                    </div>
                    <div className="group-72">
                      <div className="overlap-26">
                        <div className="fourth-link-106">188.34%</div>
                        <div className="fourth-link-105">All Time Profit</div>
                      </div>
                    </div>
                    <div className="group-59">
                      <div className="group-60">
                        <img className="frame-27" alt="Frame" src="/img/frame-7-2.svg"/>
                        <div className="fourth-link-107">Invest Now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-68">
                <div className="overlap-27">
                  <div className="fourth-link-119">NEW</div>
                </div>
              </div>
            </div>
            <div className="group-73">
              <div className="overlap-18">
                <img className="frame-28" alt="Frame" src="/img/frame-582-1-2.svg"/>
                <div className="group-67">
                  <div className="frame-40">
                    <div className="ellipse-13"/>
                    <div className="fourth-link-120">NFT</div>
                  </div>
                  <div className="frame-39">
                    <img className="image-10" alt="Image" src="/img/image-1-7.png"/>
                    <img className="image-9" alt="Image" src="/img/image-2-6.png"/>
                    <img className="image-9" alt="Image" src="/img/image-3-2.png"/>
                    <img className="image-9" alt="Image" src="/img/image-4-7.png"/>
                    <img className="image-9" alt="Image" src="/img/image-5-2.png"/>
                    <div className="group-62">
                      <div className="overlap-group-15">
                        <div className="text-wrapper-11">+8</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourth-link-109">NFT 4.0</div>
                <div className="group-63">
                  <div className="overlap-25">
                    <div className="group-64">
                      <div className="fourth-link-110">AI Score</div>
                      <div className="fourth-link-121">9.9</div>
                    </div>
                  </div>
                </div>
                <div className="group-56">
                  <div className="group-71">
                    <div className="overlap-group-16">
                      <div className="fourth-link-104">644 Days</div>
                      <div className="fourth-link-105">Active for</div>
                    </div>
                  </div>
                  <div className="group-72">
                    <div className="overlap-26">
                      <div className="fourth-link-106">188.34%</div>
                      <div className="fourth-link-105">All Time Profit</div>
                    </div>
                  </div>
                  <div className="group-59">
                    <div className="group-60">
                      <img className="frame-27" alt="Frame" src="/img/frame-8-2.svg"/>
                      <div className="fourth-link-107">Invest Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlap-28">
            <div className="overlap-29">
              <p className="fourth-link-122">
                FTX-Linked Wallet Moves $10 Million in Altcoins Ahead of Bankruptcy Hearing
              </p>
              <p className="fourth-link-123">
                Bankrupt crypto exchange FTX’s Solana wallet has moved $10 million in altocoins to Ethereum network
                through the Wormhole bridge in the last 4 days, sparking fears of more token dumps in the market. Read
                on
                to learn more.
              </p>
              <div className="frame-41">
                <div className="fourth-link-124">BLOCKCHAIN NEWS</div>
              </div>
              <div className="fourth-link-125">Posted 42 minutes ago</div>
            </div>
            <div className="overlap-30">
              <p className="fourth-link-122">Chinese Bank Uses Digital Yuan Giveaway to Promote Waste Recycling
                Drive</p>
              <div className="frame-42">
                <div className="fourth-link-124">ALTCOIN NEWS</div>
              </div>
              <div className="fourth-link-126">Posted 42 minutes ago</div>
            </div>
            <div className="overlap-31">
              <p className="fourth-link-122">Ripple Objects to SEC&#39;s Appeal of Ruling on Crypto as Non-Security</p>
              <div className="frame-42">
                <div className="fourth-link-124">ALTCOIN NEWS</div>
              </div>
              <div className="fourth-link-126">Posted 42 minutes ago</div>
            </div>
            <div className="overlap-32">
              <p className="fourth-link-122">
                FTX Financial Filing Reveals Yacht Purchase for Former Co-CEO Sam Trabucco
              </p>
              <div className="frame-42">
                <div className="fourth-link-124">BLOCKCHAIN NEWS</div>
              </div>
              <div className="fourth-link-127">Posted 42 minutes ago</div>
            </div>
            <div className="overlap-33">
              <p className="fourth-link-122">
                Bitcoin Price Prediction as Bulls Hold $25,800 Level – Here are Key Levels to Watch
              </p>
              <div className="frame-42">
                <div className="fourth-link-124">PRICE PREDICTIONS</div>
              </div>
              <div className="fourth-link-128">Posted 42 minutes ago</div>
            </div>
            <div className="frame-31">
              <div className="fourth-link-112">View All</div>
            </div>
            <div className="fourth-link-113">Crypto News</div>
          </div>
          <div className="group-74">
            <img className="group-75" alt="Group" src="/img/group-1200.png"/>
            <div className="group-76">
              <div className="overlap-group-17">
                <div className="fourth-link-129">Home</div>
              </div>
              <div className="fourth-link-130">ZVaults</div>
              <div className="fourth-link-131">Analytics</div>
              <div className="fourth-link-132">Settings</div>
            </div>
          </div>
          <p className="text-wrapper-13">© ZORT Inc. 2023 All rights reserved.</p>
          <div className="frame-43">
            <div className="text-wrapper-14">News</div>
            <div className="ellipse-14"/>
            <div className="text-wrapper-14">Terms and Conditions</div>
            <div className="ellipse-14"/>
            <div className="text-wrapper-14">Privacy Policy</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;