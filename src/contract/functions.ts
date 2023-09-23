import {ethers} from "ethers";
import abi from "@/contract/abi";
import {CONTRACT_ADDRESS} from "@/contract/config";
import BigNumber from "bignumber.js";
import coinAbi from "@/contract/coinAbi";

export const swap = async (coins: string[], amount: string, coinsSelectUser: string, userAddress: string, isEth: boolean, isAllow: boolean): Promise<any> => {
  try {
    const getContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(coinsSelectUser, coinAbi, provider);
      return contract.connect(provider.getSigner())
    }

    if (!isEth && !isAllow) {
      const gasLimit = await getContract().estimateGas.approve(CONTRACT_ADDRESS, new BigNumber(amount).multipliedBy(1e6).toString())
      const transaction = await getContract().approve(CONTRACT_ADDRESS, new BigNumber(amount).multipliedBy(1e6).toString(), {gasLimit})
      await transaction.wait()
    }

    const swapRouter = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    const res: string[] = [];
    const amountIn = new BigNumber(amount).multipliedBy(isEth ? 1e18 : 1e6).dividedBy(coins.length).toString()
    for (let i = 0; i < coins.length; i++) {
      const params = {
        tokenIn: coinsSelectUser,
        tokenOut: coins[i],
        fee: 3000,
        recipient: userAddress,
        deadline: deadline,
        amountIn: Math.floor(+amountIn).toString(),
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
      value: isEth ? new BigNumber(amount).multipliedBy(1e18).toString() : 0
    };

    const gasLimit = await provider.getSigner().estimateGas(txArgs).then((data: any) => data).catch(() => 200000 * coins.length)

    const tx = await provider.getSigner().sendTransaction({...txArgs, gasLimit});
    await tx.wait()
  } catch (e) {
    console.log(e)
  }
}

