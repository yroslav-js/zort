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
        name: 'DEGO',
        img: '/img/dego.png',
        address: '0x3da932456d082cba208feb0b096d49b202bf89c8'
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
        name: 'OAX',
        img: '/img/oax.png',
        address: '0x701c244b988a513c945973defa05de933b23fe1d'
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
        name: 'TRU',
        img: '/img/tru.png',
        address: '0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'
      },
      {
        name: 'BICO',
        img: '/img/bico.png',
        address: '0xf17e65822b568b3903685a7c9f496cf7656cc6c2'
      },
      {
        name: 'LQTY',
        img: '/img/lqty.png',
        address: '0x6DEA81C8171D0bA574754EF6F8b412F2Ed88c54D'
      },
      {
        name: 'LEVER',
        img: '/img/lever.png',
        address: '0x4B5f49487ea7B3609b1aD05459BE420548789f1f'
      },
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
      {
        name: 'CTSI',
        img: '/img/ctsi.png',
        address: '0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d'
      },
      {
        name: 'TRB',
        img: '/img/trb.png',
        address: '0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0'
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
        name: 'TLM',
        img: '/img/tlm.png',
        address: '0x888888848B652B3E3a0f34c96E00EEC0F3a23F72'
      },
      {
        name: 'HELLO',
        img: '/img/hello.png',
        address: '0x411099C0b413f4fedDb10Edf6a8be63BD321311C'
      },
    ]
  },
]