interface IPortfolio {
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
        name: 'GAL',
        img: '/img/gal.png',
        address: '0x5faa989af96af85384b8a938c2ede4a7378d9875'
      },
      {
        name: 'LM',
        img: '/img/balancer.png',
        address: '0x7bec98609cb6378d6f995e8f8097ee78376fbec9'
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
        name: 'SPELL',
        img: '/img/spell.png',
        address: '0x090185f2135308bad17527004364ebcc2d37e5f6'
      },
      {
        name: 'ALCX',
        img: '/img/alcx.png',
        address: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df'
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
        name: 'SSV',
        img: '/img/ssv.png',
        address: '0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54'
      },
      {
        name: 'ZRX',
        img: '/img/zrx.png',
        address: '0xe41d2489571d322189246dafa5ebde1f4699f498'
      },
      {
        name: 'FXS',
        img: '/img/pepe.png',
        address: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0'
      },
      {
        name: 'AAVE',
        img: '/img/aave.png',
        address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'
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
        img: '/img/ogn.png',
        address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
      },
      {
        name: '1INCH',
        img: '/img/1inch.png',
        address: '0x111111111117dc0aa78b770fa6a738034120c302'
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
        img: '/img/link.png',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca'
      },
      {
        name: 'API3',
        img: '/img/api3.png',
        address: '0x0b38210ea11411557c13457d4da7dc6ea731b88a'
      },
      {
        name: 'DIA',
        img: '/img/dia.png',
        address: '0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419'
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
        name: 'MC',
        img: '/img/mc.png',
        address: '0x949d48eca67b17269629c7194f4b727d4ef9e5d6'
      },
    ]
  },
]