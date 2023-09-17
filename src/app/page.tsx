import dynamic from 'next/dynamic'

const Main = dynamic(() => import('@/components/screens/Main/Main'), {ssr: false})

const Page = () => {
  return (
    <Main/>
  );
};

export default Page;