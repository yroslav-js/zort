"use client"

import styles from './Main.module.css'
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAccount, useBalance, useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {chainId, getCoinContract} from "@/contract/web3";
import {IPortfolio, portfolios} from "@/data/portfolios";
import clsx from "clsx";
import {AnimatePresence, motion} from 'framer-motion'
import InvestModal from "@/components/ui/InvestModal/InvestModal";
import {setIsModalOpen} from "@/redux/features/modalSlice";
import {useAppDispatch} from "@/hooks/reduxHooks";
import BigNumber from "bignumber.js";

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
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()
  const [filter, setFilter] = useState('ALL')
  const [balanceOfAllTokens, setBalanceOfAllTokens] = useState<{ address: string, balance: BigNumber }[][]>([])
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [refetch, setRefetch] = useState(true)
  const [investPortfolio, setInvestPortfolio] = useState<IPortfolio | null>(null)

  useEffect(() => {
    investPortfolio && window.document.querySelector("body")?.classList.add("open");
    !investPortfolio && window.document.querySelector("body")?.classList.remove("open")
  }, [investPortfolio])

  useEffect(() => {
    if (isConnected && chain?.id !== chainId) switchNetwork?.(chainId)
  }, [isConnected])

  useEffect(() => {
    if (isConnected && address && chain?.id === chainId && refetch) {
      setRefetch(false)
      Promise.all(portfolios.map(async (p) => {
        return await Promise.all(p.investmentCoins.map(async (c) => {
          const balance = await getCoinContract(c.address)?.balanceOf(address)
          return {
            address: c.address,
            balance
          }
        }))
      })).then((data) => {
        setBalanceOfAllTokens(data)
      }).catch(() => {
      })
    }
  }, [address, chain, refetch]);

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
              portfolios.map((portfolio, index) => filter === 'ALL' || filter === portfolio.category ? (
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
                      // if (!isConnected) return dispatch(setIsModalOpen(true))
                      // if (chain?.id !== chainId) return switchNetwork?.(chainId)
                      setPortfolioIndex(index)
                      setInvestPortfolio(portfolio)
                    }}>
                      <img src="/img/frame-5.svg" alt=""/>
                      Join Now
                    </button>
                  </div>
                  <img className={styles.graph} src={portfolio.graph} alt=""/>
                  {portfolio.isNew && <div className={styles.new}>NEW</div>}
                </motion.div>
              ) : null)
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

      <InvestModal balanceOfAllTokens={balanceOfAllTokens[portfolioIndex]} portfolio={investPortfolio}
                   setInvestPortfolio={setInvestPortfolio} setRefetch={setRefetch}
                   isStopable={!!balanceOfAllTokens[portfolioIndex]?.find(coin => Number(coin.balance) > 0)}/>
    </>
  );
};

export default Main;