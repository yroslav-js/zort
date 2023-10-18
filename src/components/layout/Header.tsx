"use client"

import styles from './Header.module.css'
import {usePathname} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";
import Link from "next/link";
import {useAccount, useDisconnect} from "wagmi";

const menu = [
  {name: 'Home', path: '/'},
  // {name: 'ZVaults', path: '/zvaults'},
  // {name: 'Analytics', path: '/analytics'},
  // {name: 'Settings', path: '/settings'},
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

  const connect = !isConnected ? 'Connect wallet' : 'Disconnect'

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
          <li style={{marginTop: '-8px'}}>
            <button className={styles.connectButton} onClick={() => {
              setIsOpen(false)
              if (!isConnected) return setIsModalOpen(true)
              disconnect()
            }}>{connect}
            </button>
          </li>
        </ul>
        <div className={styles.connect}>
          <button onClick={() => {
            if (!isConnected) return setIsModalOpen(true)
            disconnect()
          }} className={styles.connectButton}>{connect}</button>
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
