"use client"

import dynamic from 'next/dynamic'
import {useRouter} from "next/navigation";

const NFT = dynamic(() => import('@/components/screens/Portfolio/NFT'), {ssr: false})
const Defi = dynamic(() => import('@/components/screens/Portfolio/Defi'), {ssr: false})
const YieldFarming = dynamic(() => import('@/components/screens/Portfolio/YieldFarming'), {ssr: false})
const EthereumEcosystem = dynamic(() => import('@/components/screens/Portfolio/EthereumEcosystem'), {ssr: false})
const Oracle = dynamic(() => import('@/components/screens/Portfolio/Oracle'), {ssr: false})
const Gaming = dynamic(() => import('@/components/screens/Portfolio/Gaming'), {ssr: false})

const PortfolioPage = ({params}: { params: { portfolio: string } }) => {
  const router = useRouter()

  if (params.portfolio === 'NFT') return <NFT/>
  if (params.portfolio === 'YieldFarming') return <YieldFarming/>
  if (params.portfolio === 'Defi') return <Defi/>
  if (params.portfolio === 'EthereumEcosystem') return <EthereumEcosystem/>
  if (params.portfolio === 'Oracle') return <Oracle/>
  if (params.portfolio === 'Gaming') return <Gaming/>
  else {
    router.push('/')
    return null
  }
};

export default PortfolioPage;