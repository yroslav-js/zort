import {ethers} from "ethers";
import coinAbi from "@/contract/coinAbi";

export const getCoinContract = (address: string) => {
  try {
    // if (window.ethereum === null) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, coinAbi, provider);
    return contract.connect(provider.getSigner())
  } catch (e) {
  }
}

export const chainId = 1