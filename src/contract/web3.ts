import {ethers} from "ethers";
import {CONTRACT_ADDRESS} from "@/contract/config";
import abi from "@/contract/abi";

// export const getPublicContract = () => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     'https://bsc-dataseed2.binance.org/'
//   )
//   const contract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, provider);
//   return contract
// }

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', [{
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }], provider);
  return contract.connect(provider.getSigner())
}

export const chainId = 1