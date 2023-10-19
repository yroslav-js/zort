export interface IPortfolio {
  name: string
  score: string
  scoreImg: string
  days: string
  percent: string
  graph: string
  isNew: boolean
  category: string
  classname: string
  investmentCoins: {
    name: string
    img: string
    address: string
  }[]
}

export const portfolios: IPortfolio[] = [
  {
    name: 'NFT',
    score: '9.9',
    scoreImg: '/img/ellipse-27-7.svg',
    days: '101 Days',
    percent: '34.4%',
    graph: '/img/frame-582.svg',
    isNew: true,
    category: 'NFT',
    classname: 'purple',
    investmentCoins: [
      {
        name: 'RLB',
        img: '/img/RLB.png',
        address: '0x046eee2cc3188071c02bfc1745a6b17c656e3f3d'
      },
      {
        name: 'BLUR',
        img: '/img/BLUR.png',
        address: '0x5283d291dbcf85356a21ba090e6db59121208b44'
      },
    ]
  },
  {
    name: 'Yield Farming',
    score: '9.2',
    scoreImg: '/img/ellipse-27-4.svg',
    days: '88 Days',
    percent: '45.17%',
    graph: '/img/frame-576.svg',
    isNew: true,
    category: 'Defi',
    classname: 'yellow',
    investmentCoins: [
      {
        name: 'YFII',
        img: '/img/YFII.png',
        address: '0xa1d0e215a23d7030842fc67ce582a6afa3ccab83'
      },
    ]
  },
  {
    name: 'Defi',
    score: '9.2',
    scoreImg: '/img/ellipse-27-4.svg',
    days: '95 Days',
    percent: '146.7%',
    graph: '/img/frame-576.svg',
    isNew: false,
    category: 'Defi',
    classname: 'yellow',
    investmentCoins: [
      {
        name: 'INJ',
        img: '/img/INJ.png',
        address: '0xe28b3b32b6c345a34ff64674606124dd5aceca30'
      },
      {
        name: 'STP',
        img: '/img/STP.png',
        address: '0xde7d85157d9714eadf595045cc12ca4a5f3e2adb'
      },
      {
        name: 'KNC',
        img: '/img/KNC.png',
        address: '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202'
      },
      {
        name: 'BNT',
        img: '/img/BNT.png',
        address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c'
      },
    ]
  },
  {
    name: 'Ethereum Ecosystem',
    score: '9.1',
    scoreImg: '/img/ellipse-27.svg',
    days: '89 Days',
    percent: '95.7%',
    graph: '/img/frame-575.svg',
    isNew: false,
    category: 'Fundamental',
    classname: 'green',
    investmentCoins: [
      {
        name: 'OGN',
        img: '/img/OGN.png',
        address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
      },
      {
        name: 'BZR',
        img: '/img/BZR.png',
        address: '0x8d96b4ab6c741a4c8679ae323a100d74f085ba8f'
      }
    ]
  },
  {
    name: 'Oracle',
    score: '9.1',
    scoreImg: '/img/ellipse-27.svg',
    days: '89 Days',
    percent: '105.13%',
    graph: '/img/frame-575.svg',
    isNew: false,
    category: 'Fundamental',
    classname: 'green',
    investmentCoins: [
      {
        name: 'LINK',
        img: '/img/LINK.png',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca'
      },
      {
        name: 'BAND',
        img: '/img/BAND.png',
        address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55'
      },
    ]
  },
  {
    name: 'Entertainment',
    score: '9.9',
    scoreImg: '/img/ellipse-27-7.svg',
    days: '78 Days',
    percent: '129.8%',
    graph: '/img/frame-582.svg',
    isNew: false,
    category: 'Meme',
    classname: 'blue',
    investmentCoins: [
      {
        name: 'VRA',
        img: '/img/VRA.png',
        address: '0xdf1d6405df92d981a2fb3ce68f6a03bac6c0e41f'
      },
      {
        name: 'NAKA',
        img: '/img/NAKA.png',
        address: '0x2e10348ee563dec5fe483de558d1946b7a3372c2'
      },
    ]
  },
]