import {ethers} from "ethers";

// export const getPublicContract = () => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     'https://bsc-dataseed2.binance.org/'
//   )
//   const contract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, provider);
//   return contract
// }

// export const getContract = () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
//   return contract.connect(provider.getSigner())
// }

export const chainId = 5