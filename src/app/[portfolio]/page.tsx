import dynamic from 'next/dynamic'

const Portfolio = dynamic(() => import('@/components/screens/Portfolio/Portfolio'), {ssr: false})

const PortfolioPage = () => {
  return (
    <Portfolio/>
  );
};

export default PortfolioPage;