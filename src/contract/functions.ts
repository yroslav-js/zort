import {ethers} from "ethers";
import abi from "@/contract/abi";
import {CONTRACT_ADDRESS} from "@/contract/config";
import BigNumber from "bignumber.js";
import coinAbi from "@/contract/coinAbi";
import {getCoinContract} from "@/contract/web3";

export const swap = async (coins: string[], amount: string, coinsSelectUser: string, userAddress: string, isEth: boolean, isAllow: boolean, percent: number[]): Promise<any> => {
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
    for (let i = 0; i < coins.length; i++) {
      if (!percent[i]) continue
      const amountIn = new BigNumber(amount).multipliedBy(isEth ? 1e18 : 1e6).multipliedBy(percent[i] / 100).toString()
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

    const gasLimit = await provider.getSigner().estimateGas(txArgs).then((data: any) => 500000 * coins.length).catch(() => 0)
    console.log(Number(gasLimit))
    if (!gasLimit) return false
    const tx = await provider.getSigner().sendTransaction({...txArgs, gasLimit});
    await tx.wait()
    return true
  } catch (e) {
    return true
  }
}

export const stopZVaults = async (userAddress: string, coins: {
  address: string,
  balance: BigNumber
}[], selectedCurrency: string) => {
  try {
    await Promise.all(
      coins.map(async (coin) => {
        if (Number(coin.balance) > 0) {
          const gasLimit = await getCoinContract(coin.address)?.estimateGas.approve(CONTRACT_ADDRESS, coin.balance)
          const transaction = await getCoinContract(coin.address)?.approve(CONTRACT_ADDRESS, coin.balance, {gasLimit})
          await transaction.wait()
        }
      })
    )

    const swapRouter = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    const res: string[] = [];
    for (let i = 0; i < coins.length; i++) {
      if (Number(coins[i].balance) === 0) continue
      const params = {
        tokenIn: coins[i].address,
        tokenOut: selectedCurrency,
        fee: 3000,
        recipient: userAddress,
        deadline: deadline,
        amountIn: coins[i].balance,
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
      value: 0
    };

    const gasLimit = await provider.getSigner().estimateGas(txArgs).then((data: any) => 250000 * coins.length).catch(() => 0)
    if (!gasLimit) return false
    const tx = await provider.getSigner().sendTransaction({...txArgs, gasLimit});
    await tx.wait()
  } catch (e) {
    console.log(e)
  }
}

