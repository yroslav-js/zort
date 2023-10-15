"use client"

import styles from './InvestModal.module.css'
import {IPortfolio, portfolios} from "@/data/portfolios";
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Range} from "react-range";
import {swap} from "@/contract/functions";
import userSelectToken from "@/data/userSelectToken";
import {useAccount, useBalance} from "wagmi";

const colors = ['#8EE8E2', '#3399F6', '#E3E4AB', '#E4ABAB', '#BFB0EB']

const InvestModal = ({portfolio, currency = 'USDT', setInvestPortfolio}: {
  portfolio: IPortfolio | null,
  currency?: string,
  setInvestPortfolio: Dispatch<SetStateAction<IPortfolio | null>>
}) => {
  const [percent, setPercent] = useState([0])
  const [amount, setAmount] = useState('')
  const [firstAgree, setFirstAgree] = useState(false)
  const [secondAgree, setSecondAgree] = useState(false)
  const {address} = useAccount()
  const {data} = useBalance({address})
  const [transactionLoading, setTransactionLoading] = useState(false)

  useEffect(() => {
    setPercent(portfolio?.investmentCoins.map(_ => 100 / portfolio.investmentCoins.length) || [0])
  }, [portfolio])

  return (
    <div className={clsx(styles.modalWrapper, portfolio && styles.active)}>
      <div className={styles.modal}>
        <div className={styles.close} onClick={() => setInvestPortfolio(null)}></div>
        <div className={styles.title}>Invest in <span>{portfolio?.name}</span></div>
        <div className={styles.amountTitle}>Set amount you want to invest</div>
        <div className={styles.input}>USD <input
          min={0} type="number" value={amount}
          onChange={e => {
            if (e.target.value.includes('-')) return
            setAmount(e.target.value)
          }}/></div>
        <div className={styles.settings}>
          <div className={styles.balancing}>
            <div className={styles.switchBalance}>
              <div className={styles.aiBalance}>AI Balancing</div>
              <div className={styles.manualBalance}>Manual Balancing</div>
            </div>
            {portfolio?.investmentCoins.map((coin, index) => (
              <div className={styles.token} key={coin.address}>
                <img src={coin.img} alt=""/>
                <div className={styles.name}><span style={{color: colors[index]}}>{coin.name}</span> USDT</div>
                <div className={styles.rangebar}>
                  <Range
                    step={1}
                    min={0}
                    max={100}
                    values={[percent[index]]}
                    onChange={(values) => {
                      if (percent.reduce((acc, num) => acc + num, 0) - percent[index] + values[0] > 100) return
                      setPercent(percent.map((n, i) => i === index ? values[0] : n))
                    }}
                    renderTrack={({props, children}) => (
                      <div
                        {...props}
                        key={1}
                        style={{
                          ...props.style,
                          height: '3px',
                          width: '100%',
                          backgroundColor: '#212123',
                          borderRadius: '50%'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({props}) => (
                      <div
                        {...props}
                        key={2}
                        style={{
                          ...props.style,
                          height: '20px',
                          width: '20px',
                          background: 'linear-gradient(274deg, #6B3EED 8.51%, #963EED 82.64%)',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  />
                </div>
                <div className={styles.percent}>{Number(percent[index]).toFixed(1)}%</div>
              </div>
            ))}
          </div>
          <div className={styles.trade}>
            {/*<div>Trade Settings</div>*/}
            {/*<div>Stop loss <img src="" alt=""/></div>*/}
            {/*<div className={styles.selectStopLoss}>*/}
            {/*  <div className={styles.activeStopLoss}>Dynamic SP</div>*/}
            {/*  <div>Regular SP</div>*/}
            {/*  <div>Disabled SP</div>*/}
            {/*</div>*/}
            {/*<div className={styles.timeTitle}>*/}
            {/*  <div>Delay Time <span className={styles.hours}>(Hours)</span> <img src="" alt=""/></div>*/}
            {/*  <div>40</div>*/}
            {/*</div>*/}
            {/*<div className={styles.rangebar}></div>*/}
            {/*<div>Delay Time <img src="" alt=""/></div>*/}
            {/*<div className={styles.optionSelect}>*/}
            {/*  <div className={styles.activeOption}>Option 1</div>*/}
            {/*  <div>Option 2</div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <div>Delay Time <img src="" alt=""/></div>*/}
            {/*  <div className={styles.switchProfit}></div>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={styles.agree}>
          <div className={styles.checkbox} style={firstAgree ? {opacity: 1} : {opacity: .5}}
               onClick={() => setFirstAgree(prevState => !prevState)}>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M10.5 0C10.086 0 9.711 0.158667 9.4395 0.415083L7.9395 1.83175L4.5 5.08017L2.5605 3.24842C2.289 2.992 1.914 2.83333 1.5 2.83333C0.672 2.83333 0 3.468 0 4.25C0 4.641 0.168 4.99517 0.4395 5.25158L3.4395 8.08492C3.711 8.34133 4.086 8.5 4.5 8.5C4.914 8.5 5.289 8.34133 5.5605 8.08492L10.0605 3.83492L11.5605 2.41825C11.832 2.16183 12 1.80767 12 1.41667C12 0.633958 11.328 0 10.5 0Z"
                    fill={firstAgree ? "white" : "#212123"}/>
            </svg>
          </div>
          <div className={styles.agreeTitle}>I agree with the risk management terms</div>
          <div className={styles.agreeText}>The formula for calculating risk is: (Target — Entry)/(Entry — Stop Loss).
            But instead of calculating R/R manually you can use TradingView's tools for short and long positions
          </div>
        </div>
        <div className={styles.agree}>
          <div className={styles.checkbox} style={secondAgree ? {opacity: 1} : {opacity: .5}}
               onClick={() => setSecondAgree(prevState => !prevState)}>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M10.5 0C10.086 0 9.711 0.158667 9.4395 0.415083L7.9395 1.83175L4.5 5.08017L2.5605 3.24842C2.289 2.992 1.914 2.83333 1.5 2.83333C0.672 2.83333 0 3.468 0 4.25C0 4.641 0.168 4.99517 0.4395 5.25158L3.4395 8.08492C3.711 8.34133 4.086 8.5 4.5 8.5C4.914 8.5 5.289 8.34133 5.5605 8.08492L10.0605 3.83492L11.5605 2.41825C11.832 2.16183 12 1.80767 12 1.41667C12 0.633958 11.328 0 10.5 0Z"
                    fill={secondAgree ? "white" : "#212123"}/>
            </svg>
          </div>
          <div className={styles.agreeTitle}>I agree with the disclosure of potential investment risks</div>
          <div className={styles.agreeText}>The formula for calculating risk is: (Target — Entry)/(Entry — Stop Loss).
            But instead of calculating R/R manually you can use TradingView's tools for short and long positions
          </div>
        </div>
        <button className={styles.investButton} onClick={async () => {
          if (Number(data?.formatted) < Number(amount) || transactionLoading) return
          let isAllow = false
          if (Number(amount) > 0 && portfolio) {
            setTransactionLoading(true)
            const isLiquidCoin = await swap(portfolio?.investmentCoins.map(token => token.address) || [''],
              // ['0xc4c7ea4fab34bd9fb9a5e1b1a98df76e26e6407c'],
              amount, userSelectToken[0].address, address || '', true, isAllow, percent)
            if (!isLiquidCoin) alert('some tokens do not have liquidity for this currency')
            setTransactionLoading(false)
          }
        }}><img src="/img/frame-5.svg" alt=""/> Join now
        </button>
      </div>
    </div>
  );
};

export default InvestModal;