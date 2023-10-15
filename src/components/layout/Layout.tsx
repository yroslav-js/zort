"use client"

import {ReactNode, useEffect, useState} from "react";
import Connect from "@/components/ui/ConnectModal/Connect";
import Footer from "@/components/layout/Footer";
import styles from './Layout.module.css'
import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {setIsModalOpen as setModalState} from "@/redux/features/modalSlice";

const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
})

const Layout = ({children}: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modal = useAppSelector(state => state.modalSLice.isModalOpen)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (modal) setIsModalOpen(true)
  }, [modal])

  useEffect(() => {
    (isModalOpen) && window.document.querySelector("body")?.classList.add("open");
    (!isModalOpen) && window.document.querySelector("body")?.classList.remove("open")
    dispatch(setModalState(false))
  }, [isModalOpen])

  return (
    <div className={styles.layout}>
      <Header setIsModalOpen={setIsModalOpen}/>
      {children}
      <Footer/>
      {/*<InvestModal portfolio={investPortfolio} setInvestPortfolio={setInvestPortfolio}/>*/}
      <Connect isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default Layout;