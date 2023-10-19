import dynamic from 'next/dynamic'

const ZVaults = dynamic(() => import('@/components/screens/ZVaults/ZVaults'), {ssr: false})

const ZVaultsPage = () => {
  return <ZVaults/>;
};

export default ZVaultsPage;