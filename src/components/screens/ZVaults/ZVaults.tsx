"use client"

import styles from "@/components/screens/Main/Main.module.css";
import pageStyles from './ZVaults.module.css'
import clsx from "clsx";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {IPortfolio, portfolios} from "@/data/portfolios";
import {setIsModalOpen} from "@/redux/features/modalSlice";
import {chainId, getCoinContract} from "@/contract/web3";
import InvestModal from "@/components/ui/InvestModal/InvestModal";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import {CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS} from "@/contract/config";

const trending = [
  {
    name: 'ALL',
    classname: 'white',
    amount: 6
  },
  {
    name: 'Fundamental',
    classname: 'green',
    amount: 2
  },
  {
    name: 'Defi',
    classname: 'yellow',
    amount: 2
  },
  {
    name: 'NFT',
    classname: 'purple',
    amount: 1
  },
  {
    name: 'Meme',
    classname: 'blue',
    amount: 1
  },
]

function getWindowDimensions() {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height
  };
}


const ZVaults = () => {
  const dispatch = useAppDispatch()
  const {isConnected, address} = useAccount()
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()
  const [filter, setFilter] = useState({
    'all': true,
    'fundamental': false,
    'defi': false,
    'nft': false,
    'meme': false
  })
  const [balanceOfAllTokens, setBalanceOfAllTokens] = useState<{ address: string, balance: BigNumber }[][]>([])
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [refetch, setRefetch] = useState(true)
  const [investPortfolio, setInvestPortfolio] = useState<IPortfolio | null>(null)
  const [balanceUSDT, setBalanceUSDT] = useState(0)
  const [balanceUSDC, setBalanceUSDC] = useState(0)
  const [allowanceUSDT, setAllowanceUSDT] = useState(0)
  const [allowanceUSDC, setAllowanceUSDC] = useState(0)

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
  }, [refetch, address])

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
        <div className={pageStyles.heading}>
          <div className={pageStyles.selection}>
            <span>Select Category</span>
            <div className={pageStyles.categories}>
              {trending.map(item => (
                <div key={item.name}
                     onClick={() => setFilter(prevState => {
                       if (item.name.toLowerCase() !== 'all') return {
                         ...prevState,
                         [`${item.name.toLowerCase() as keyof typeof prevState}`]: !prevState[item.name.toLowerCase() as keyof typeof prevState],
                         all: false
                       }
                       else return {
                         'all': true,
                         'fundamental': false,
                         'defi': false,
                         'nft': false,
                         'meme': false
                       }
                     })}
                     className={clsx(pageStyles[item.classname],
                       filter[item.name.toLowerCase() as keyof typeof filter] && pageStyles.activeCategories)}>
                  <div className={pageStyles.category}>
                    <div className={pageStyles.title}>
                      {item.name}
                      <div className={pageStyles.amount}>
                        {item.amount} ZVaults
                      </div>
                      <img src={`/img/${item.name.toLowerCase()}.svg`} alt=""/>
                    </div>
                    <div className={pageStyles.amount}>
                      {item.amount} ZVaults
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={pageStyles.sort}>
            Sort by <span>Trending</span>
            <div className={pageStyles.sortItems}>
              <div>Trending</div>
              <div>AI Score</div>
              <div>Active time</div>
            </div>
          </div>
        </div>
        <div className={styles.portfoliosWrapper}>
          <motion.div className={styles.portfolios}
                      style={!filter['all'] ? {justifyContent: "initial"} : {}}>
            <AnimatePresence>
              {
                portfolios.map((portfolio, index) => filter['all'] || filter[portfolio.category.toLowerCase() as keyof typeof filter] ? (
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
                        if (!isConnected) return dispatch(setIsModalOpen(true))
                        if (chain?.id !== chainId) return switchNetwork?.(chainId)
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
      </div>

      <InvestModal
        balanceOfAllTokens={balanceOfAllTokens[portfolioIndex]} portfolio={investPortfolio}
        setInvestPortfolio={setInvestPortfolio} setRefetch={setRefetch} allowanceUSDC={allowanceUSDC}
        balanceUSDT={balanceUSDT} balanceUSDC={balanceUSDC} allowanceUSDT={allowanceUSDT}
        isStopable={!!balanceOfAllTokens[portfolioIndex]?.find(coin => Number(coin.balance) > 0)}
      />
    </>
  );
};

export default ZVaults;