interface IPortfolio {
  portfolio: string
  investmentCoins: {
    name: string
    img: string
    address: string
  }[]
}

export const portfolios: IPortfolio[] = [
  {
    portfolio: 'NFT',
    investmentCoins: [
      {
        name: 'RARE',
        img: '/img/rare.png',
        address: '0xba5BDe662c17e2aDFF1075610382B9B691296350'
      },
      {
        name: 'GAL',
        img: '/img/gal.png',
        address: '0x5faa989af96af85384b8a938c2ede4a7378d9875'
      },
    ]
  },
  {
    portfolio: 'Ethereum Ecosystem',
    investmentCoins: [
      {
        name: 'OGN',
        img: '/img/ogn.png',
        address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
      },
      {
        name: 'ZRX',
        img: '/img/zrx.png',
        address: '0xe41d2489571d322189246dafa5ebde1f4699f498'
      }
    ]
  },
  {
    portfolio: 'Defi',
    investmentCoins: [
      {
        name: 'INJ',
        img: '/img/inj.png',
        address: '0xe28b3b32b6c345a34ff64674606124dd5aceca30'
      },
      {
        name: 'PENDLE',
        img: '/img/pendle.png',
        address: '0x808507121b80c02388fad14726482e061b8da827'
      },
      {
        name: 'DIA',
        img: '/img/dia.png',
        address: '0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419'
      },
      // {
      //   name: 'BICO',
      //   img: '/img/bico.png',
      //   address: '0xf17e65822b568b3903685a7c9f496cf7656cc6c2'
      // },
    ]
  },
  {
    portfolio: 'Oracle',
    investmentCoins: [
      {
        name: 'LINK',
        img: '/img/link.png',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca'
      },
      {
        name: 'API3',
        img: '/img/api3.png',
        address: '0x0b38210ea11411557c13457D4dA7dC6ea731B88a'
      },
      {
        name: 'BAND',
        img: '/img/band.png',
        address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55'
      },
    ]
  },
  {
    portfolio: 'Yield Farming',
    investmentCoins: [
      {
        name: 'SPELL',
        img: '/img/spell.png',
        address: '0x090185f2135308bad17527004364ebcc2d37e5f6'
      },
    ]
  },
  {
    portfolio: 'Gaming',
    investmentCoins: [
      {
        name: 'MC',
        img: '/img/mc.png',
        address: '0x949d48eca67b17269629c7194f4b727d4ef9e5d6'
      },
    ]
  },
]