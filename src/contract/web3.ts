import {ethers} from "ethers";

export const getCoinContract = (address: string) => {
  try {
    // if (window.ethereum === null) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, [{
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
  } catch (e) {
    console.log(e)
  }
}

export const chainId = 1