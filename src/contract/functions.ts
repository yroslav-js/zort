import {ethers} from "ethers";
import abi from "@/contract/abi";
import {CONTRACT_ADDRESS} from "@/contract/config";
import BigNumber from "bignumber.js";


export const swap = async (coins: string[], amount: string, coinsSelectUser: string, userAddress: string, isEth: boolean): Promise<any> => {
  try {
    let abiToken = ["function approve(address _spender, uint256 _value) public returns (bool success)"]

    const getContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(coinsSelectUser, abiToken, provider);
      return contract.connect(provider.getSigner())
    }

    if (!isEth) {
      const transaction = await getContract().approve(CONTRACT_ADDRESS, new BigNumber(amount).multipliedBy(1e18).toString())
      await transaction.wait()
    }

    const swapRouter = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    const res: string[] = [];
    for (let i = 0; i < coins.length; i++) {
      const params = {
        tokenIn: coinsSelectUser,
        tokenOut: coins[i],
        fee: 3000,
        recipient: userAddress,
        deadline: deadline,
        amountIn: new BigNumber(amount).multipliedBy(1e18).dividedBy(coins.length).toString(),
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };
      const encData = swapRouter.interface.encodeFunctionData(
        'exactInputSingle',
        [params],
      );
      res.push(encData);
    }

    const multicall = swapRouter.interface.encodeFunctionData('multicall', [
      res,
    ]);

    const txArgs = {
      to: CONTRACT_ADDRESS,
      from: userAddress,
      data: multicall,
      gasLimit: 300000,
      value: isEth ? new BigNumber(amount).multipliedBy(1e18).toString() : 0
    };
    const tx = await provider.getSigner().sendTransaction(txArgs);
    await tx.wait()
  } catch (e) {
    console.log(e)
  }
}

