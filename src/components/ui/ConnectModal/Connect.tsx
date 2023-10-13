"use client"

import {useConnect} from "wagmi";
import {Dispatch, SetStateAction, useState} from "react";
import styles from './Connect.module.css'

const Connect = ({setIsModalOpen, isModalOpen}: { setIsModalOpen: Dispatch<SetStateAction<boolean>>, isModalOpen: boolean }) => {
  const {connect, connectors} = useConnect()

  return (
    <div className={styles.modalBg} style={{display: isModalOpen ? 'block' : 'none'}} onClick={() => {
      setIsModalOpen(false)
    }}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {connectors.map(connector => (
          <div className={styles.connectButton} key={connector.name} onClick={() => {
            setIsModalOpen(false)
            connect({connector})
          }}>{connector.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Connect;