"use client"

import {ReactNode, useEffect, useState} from "react";
import InvestModal from "@/components/ui/InvestModal/InvestModal";
import Connect from "@/components/ui/ConnectModal/Connect";
import Footer from "@/components/layout/Footer";
import styles from './Layout.module.css'
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
})

const Layout = ({children}: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    isModalOpen && window.document.querySelector("body")?.classList.add("open")
    !isModalOpen && window.document.querySelector("body")?.classList.remove("open")
  }, [isModalOpen])

  return (
    <div className={styles.layout}>
      <Header setIsModalOpen={setIsModalOpen}/>
      {children}
      <Footer/>
      <InvestModal/>
      <Connect isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default Layout;