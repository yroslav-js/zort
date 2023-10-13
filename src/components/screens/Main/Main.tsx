"use client"

import styles from './Main.module.css'
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAccount, useBalance, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {chainId, getCoinContract} from "@/contract/web3";
import {CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS} from "@/contract/config";
import {portfolios} from "@/data/portfolios";
import clsx from "clsx";
import {AnimatePresence, motion} from 'framer-motion'

const trending = [
  {
    name: 'ALL',
    classname: styles.white
  },
  {
    name: 'Fundamental',
    classname: styles.green
  },
  {
    name: 'Defi',
    classname: styles.yellow
  },
  {
    name: 'NFT',
    classname: styles.purple
  },
  {
    name: 'Meme',
    classname: styles.blue
  },
]

function getWindowDimensions() {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height
  };
}

const Main = () => {
  const {isConnected, address} = useAccount()
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const [select, setSelect] = useState(false)
  const [selectedToken, setSelectedToken] = useState(0)
  const [invest, setInvest] = useState(false)
  const [portfolio, setPortfolio] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionLoading, setTransactionLoading] = useState(false)
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()
  const [balanceUSDT, setBalanceUSDT] = useState(0)
  const [balanceUSDC, setBalanceUSDC] = useState(0)
  const [allowanceUSDT, setAllowanceUSDT] = useState(0)
  const [allowanceUSDC, setAllowanceUSDC] = useState(0)
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
    const getCoinData = async () => {
      try {
        const usdt = await getCoinContract(USDT_CONTRACT_ADDRESS)?.balanceOf(address)
        setBalanceUSDT(Number(usdt) / 10 ** 6)

        const allowanceUSDT = await getCoinContract(USDT_CONTRACT_ADDRESS)?.allowance(address, CONTRACT_ADDRESS)
        setAllowanceUSDT(Number(allowanceUSDT) / 10 ** 6)

        const usdc = await getCoinContract(USDC_CONTRACT_ADDRESS)?.balanceOf(address)
        setBalanceUSDC(Number(usdc) / 10 ** 6)

        const allowanceUSDC = await getCoinContract(USDT_CONTRACT_ADDRESS)?.allowance(address, CONTRACT_ADDRESS)
        setAllowanceUSDC(Number(allowanceUSDC) / 10 ** 6)
      } catch (e) {
      }
    }
    getCoinData()
  }, [transactionLoading, address])


  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coinsImage = (portfolio: string) => {
    let amount = 5
    if (windowDimensions.width <= 450) amount = 3
    const coins = portfolios.find(p => p.name === portfolio)
    return coins?.investmentCoins?.map((coin, i) => {
      if (i > amount) return null
      if (i === amount) return (
        <div className={clsx(styles.amountTokensWrapper, styles[coins?.classname])} key={coin.name}>
          <div className={styles.amountTokens}>
            +{Number(coins?.investmentCoins.length) - amount}
          </div>
        </div>
      )
      return (<img src={coin.img} alt={`image ${i + 1}`} key={i}/>)
    })
  }

  return (
    <>
      <div className={styles.main}>
        <div className={clsx(styles.heading, styles.trendingHeading)}>
          <div className={styles.title}>
            Trending Zvaults
          </div>
          <div className={styles.categoryWrapper}>
            {trending.map(trend => (

              <div key={trend.name} onClick={() => setFilter(trend.name)}
                   className={clsx(styles.filterButton, trend.classname, filter === trend.name && styles.categoryActive)}>
                {trend.name}
              </div>
            ))}
            <Link href="/zvaults" className={styles.viewAll}>View All</Link>
          </div>
          <Link href="/zvaults" className={clsx(styles.viewAll, styles.trendingViewAll)}>View All</Link>
        </div>
        <motion.div className={styles.portfolios}
                    style={filter !== 'ALL' ? {justifyContent: "initial"} : {}}>
          <AnimatePresence>
            {
              portfolios.filter(item => filter === 'ALL' || filter === item.category).map(portfolio => (
                <motion.div layout transition={{duration: 0.3}}
                            animate={{opacity: 1, scale: 1}}
                            initial={{opacity: 0, scale: 0}} exit={{opacity: 0, scale: 0}} key={portfolio.name}
                            className={styles.portfolio}>
                  <div className={styles.portfolioHead}>
                    <div>
                      <Link href='/NFT' className={styles.portfolioTitle}>
                        {portfolio.name}
                      </Link>
                      <div className={styles.typeTokensWrapper}>
                        <div className={clsx(styles.type, styles[portfolio.classname])}>{portfolio.category}</div>
                        <div className={styles.tokens}>
                          {coinsImage(portfolio.name)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.score}>
                      <img src={portfolio.scoreImg} alt=""/>
                      <div>
                        <div className={styles.scoreValue}>
                          {portfolio.score}
                        </div>
                        <div className={styles.scoreText}>
                          AI Score
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.portfolioContent}>
                    <div>
                      <div className={styles.subTitleInfo}>
                        Active for
                      </div>
                      <div className={styles.days}>
                        {portfolio.days}
                      </div>
                    </div>
                    <div>
                      <div className={styles.subTitleInfo}>
                        All Time Profit
                      </div>
                      <div className={styles.percent}>
                        {portfolio.percent}
                      </div>
                    </div>
                    <button className={styles.investButton} onClick={() => {
                      setPortfolio(portfolio.name)
                      setInvest(true)
                    }}>
                      <img src="/img/frame-5.svg" alt=""/>
                      Join Now
                    </button>
                  </div>
                  <img className={styles.graph} src={portfolio.graph} alt=""/>
                  {portfolio.isNew && <div className={styles.new}>NEW</div>}
                </motion.div>
              ))
            }
          </AnimatePresence>
        </motion.div>
      </div>
      <div className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.title}>
            Crypto News
          </div>
          <Link href="/zvaults" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.news}>
          <div className={styles.mainNews}>
            <div>
              <div className={styles.newsTitle}>FTX-Linked Wallet Moves $10 Million in Altcoins Ahead of Bankruptcy
                Hearing
              </div>
              <div className={styles.newsText}>Bankrupt crypto exchange FTX’s Solana wallet has moved $10 million in
                altocoins to Ethereum network through the Wormhole bridge in the last 4 days, sparking fears of more
                token dumps in the market. Read on to learn more.
              </div>
            </div>
            <div className={styles.newsBottom}>
              <div className={styles.newsTopic}>BLOCKCHAIN NEWS</div>
              <div className={styles.newsPosted}>Posted 42 minutes ago</div>
            </div>
          </div>
          <div>
            <div className={styles.smallNews}>
              <div className={styles.newsTitle}>Chinese Bank Uses Digital Yuan Giveaway to Promote Waste Recycling Drive
              </div>
              <div className={styles.newsBottom}>
                <div className={styles.newsTopic}>ALTCOIN NEWS</div>
                <div className={styles.newsPosted}>Posted 42 minutes ago</div>
              </div>
            </div>
            <div className={styles.smallNews}>
              <div className={styles.newsTitle}>FTX Financial Filing Reveals Yacht Purchase for Former Co-CEO Sam
                Trabucco
              </div>
              <div className={styles.newsBottom}>
                <div className={styles.newsTopic}>BLOCKCHAIN NEWS</div>
                <div className={styles.newsPosted}>Posted 42 minutes ago</div>
              </div>
            </div>
          </div>
          <div className={styles.lastNews}>
            <div className={styles.smallNews}>
              <div className={styles.newsTitle}>Ripple Objects to SEC's Appeal of Ruling on Crypto as Non-Security
              </div>
              <div className={styles.newsBottom}>
                <div className={styles.newsTopic}>ALTCOIN NEWS</div>
                <div className={styles.newsPosted}>Posted 42 minutes ago</div>
              </div>
            </div>
            <div className={styles.smallNews}>
              <div className={styles.newsTitle}>Bitcoin Price Prediction as Bulls Hold $25,800 Level – Here are Key
                Levels to Watch
              </div>
              <div className={styles.newsBottom}>
                <div className={styles.newsTopic}>PRICE PREDICTIONS</div>
                <div className={styles.newsPosted}>Posted 42 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;