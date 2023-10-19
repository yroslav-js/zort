"use client"

import styles from './Header.module.css'
import {usePathname} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";
import Link from "next/link";
import {useAccount, useDisconnect} from "wagmi";

const menu = [
  {name: 'Home', path: '/'},
  {name: 'ZVaults', path: '/zvaults'},
  // {name: 'Analytics', path: '/analytics'},
  {name: 'Settings', path: '/settings'},
]

const Header = ({setIsModalOpen}: { setIsModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isView, setIsView] = useState(false)
  const {isConnected, address} = useAccount()
  const {disconnect} = useDisconnect()

  useEffect(() => {
    if (isOpen) setIsView(true)
    else setTimeout(() => {
      setIsView(false)
    }, 200)
  }, [isOpen])

  return (
    <>
      <header className={clsx(styles.header, isOpen && styles.active, isView && styles.view)}>
        <img
          className={styles.logo}
          src="/img/logo.png"
          alt=""
        />
        <ul className={styles.menu}>
          {menu.map(link => {
            return (
              <li key={link.name} onClick={() => setIsOpen(false)}
                  className={pathname === link.path ? styles.activeLink : ''}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            )
          })}
          <li style={isConnected ? {display: 'none'} : {marginTop: '-8px'}} className={styles.connectButtonWrapper}>
            <button className={styles.connectButton} onClick={() => {
              setIsOpen(false)
              if (!isConnected) return setIsModalOpen(true)
              disconnect()
            }}>Connect wallet
            </button>
          </li>
        </ul>
        <div className={styles.connect}>
          {!isConnected ? <button onClick={() => {
              if (!isConnected) return setIsModalOpen(true)
              disconnect()
            }} className={styles.connectButton}>Connect wallet</button> :
            <div className={styles.connectedPerson}><img src="/img/person.svg" alt=""/></div>}
          <div className={styles.burger} onClick={() => setIsOpen(prevState => !prevState)}>
            <span></span>
          </div>
        </div>
      </header>
      <div className={clsx(styles.menuBg, isOpen && styles.active, isView && styles.view)}></div>
    </>
  );
};

export default Header;
