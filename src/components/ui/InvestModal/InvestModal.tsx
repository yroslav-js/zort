"use client"

import styles from './InvestModal.module.css'
import {IPortfolio, portfolios} from "@/data/portfolios";
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Range} from "react-range";
import {stopZVaults, swap} from "@/contract/functions";
import userSelectToken from "@/data/userSelectToken";
import {useAccount, useBalance} from "wagmi";
import BigNumber from "bignumber.js";
import {Modal} from "antd";
import {toast} from "react-toastify";

const colors = ['#8EE8E2', '#3399F6', '#E3E4AB', '#E4ABAB', '#BFB0EB']

const getError = (err: any) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const InvestModal = (
  {
    portfolio, setInvestPortfolio, balanceOfAllTokens, isStopable, setRefetch,
    balanceUSDT, balanceUSDC, allowanceUSDT, allowanceUSDC
  }: {
    portfolio: IPortfolio | null, setInvestPortfolio: Dispatch<SetStateAction<IPortfolio | null>>,
    balanceOfAllTokens: { address: string, balance: BigNumber }[], isStopable: boolean,
    setRefetch: Dispatch<SetStateAction<boolean>>, balanceUSDT: number,
    balanceUSDC: number, allowanceUSDT: number, allowanceUSDC: number,
  }) => {
  const [percent, setPercent] = useState([0])
  const [amount, setAmount] = useState('')
  const [firstAgree, setFirstAgree] = useState(true)
  const [secondAgree, setSecondAgree] = useState(true)
  const {address} = useAccount()
  const {data} = useBalance({address})
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setPercent(portfolio?.investmentCoins.map(_ => Number((100 / portfolio.investmentCoins.length).toFixed(1))) || [0])
  }, [portfolio])

  return (
    <div className={clsx(styles.modalWrapper, portfolio && styles.active)}>
      <div className={styles.modal}>
        <Modal
          open={open}
          footer={null}
          onCancel={() => setOpen(false)}
          title="Select a token"
        >
          <div>
            {userSelectToken.map((coin, i) => {
              return (
                <div style={i === selectedCoin ? {opacity: .5} : {}} key={coin.name} onClick={() => {
                  setSelectedCoin(i)
                  setOpen(false)
                }}
                     className={styles.selectModal}>
                  {coin.name}
                  <img style={{width: '28px', height: '28px'}} src={`${coin.icon}`} alt=""/>
                </div>
              );
            })}
          </div>
        </Modal>
        <div className={styles.close} onClick={() => setInvestPortfolio(null)}></div>
        <div className={styles.title}>Invest in <span style={{color: '#E3E4AB'}}>{portfolio?.name}</span></div>
        <div className={styles.amountTitle}>Set amount you want to invest</div>
        <div className={styles.input}>
          <div onClick={() => setOpen(true)}>{userSelectToken[selectedCoin].name}</div>
          <input
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
                <div className={styles.name}><span
                  style={{color: colors[index]}}>{coin.name}</span> {userSelectToken[selectedCoin].name}</div>
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
                <div className={styles.percentSymbol}>
                  <p><span>%</span></p>
                  <input onChange={(e) => {
                    if (percent.reduce((acc, num) => acc + num, 0) - percent[index] + +e.target.value > 100) return
                    setPercent(percent.map((n, i) => i === index ? +Number(e.target.value).toFixed(1) : n))
                  }}
                         type="number" className={styles.percent} min={0} max={100} value={percent[index] || ''}
                         step={1}/>
                </div>
                {/*<div className={styles.percent}>{Number(percent[index]).toFixed(1)}%</div>*/}
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
        <div className={styles.buttons} style={transactionLoading ? {opacity: .5} : {}}>
          <button className={styles.investButton} onClick={async () => {
            if (transactionLoading) return
            if (selectedCoin === 0 && Number(data?.formatted) < Number(amount))
              return getError(`insufficient funds, you have ${Number(data?.formatted).toFixed(5)} eth`)
            if (Number(balanceUSDT) < Number(amount) && selectedCoin === 1)
              return getError(`insufficient funds, you have ${Number(balanceUSDT).toFixed(5)} usdt`)
            if (allowanceUSDT && allowanceUSDT < Number(amount) && selectedCoin === 1)
              return getError(`you already have usdt allowance: ${Number(allowanceUSDT).toFixed(5)}`)
            if (Number(balanceUSDC) < Number(amount) && selectedCoin === 2)
              return getError(`insufficient funds, you have ${Number(balanceUSDC).toFixed(5)} usdc`)
            if (allowanceUSDC && allowanceUSDC < Number(amount) && selectedCoin === 2)
              return getError(`you already have usdc allowance: ${Number(allowanceUSDC).toFixed(5)}`)
            if (Number(amount) > 0 && portfolio) {
              let isAllow = false
              if (selectedCoin === 1 && allowanceUSDT > 0) isAllow = true
              if (selectedCoin === 2 && allowanceUSDC > 0) isAllow = true
              setTransactionLoading(true)
              const isLiquidCoin = await swap(
                portfolio?.investmentCoins.map(token => token.address) || [''],
                // ['0x326C977E6efc84E512bB9C30f76E30c160eD06FB'],
                amount, userSelectToken[selectedCoin].address, address || '', !selectedCoin, isAllow, percent
              )
              setTransactionLoading(false)
              setTimeout(() => {
                setRefetch(true)
              }, 3000)
              if (!isLiquidCoin) getError('some tokens do not have liquidity in current currency')
            }
          }}><img src="/img/frame-5.svg" alt=""/> Join now
          </button>
          {isStopable &&
            <button className={styles.stopButton} onClick={async () => {
              if (transactionLoading) return
              setTransactionLoading(true)
              await stopZVaults(address || '', balanceOfAllTokens, userSelectToken[selectedCoin].address)
              setTransactionLoading(false)
              setTimeout(() => {
                setRefetch(true)
              }, 3000)
            }}>Stop Zvaults
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default InvestModal;