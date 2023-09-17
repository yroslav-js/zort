import {BigNumber, ethers} from "ethers";
import abi from "@/contract/abi";
import {CONTRACT_ADDRESS} from "@/contract/config";

export const swap = async (coins: string[], amount: number, coinsSelectUser: string, userAddress: string): Promise<any> => {
  try {
    // const coinsSelectUser = '0xC886F960B1433F913a7cC59dC06f04A25678dd2A';
    // coins = [
    //   // '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    //   // '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    //   '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    // ];

    interface IParams {
      tokenIn: string;
      tokenOut: string;
      fee: number;
      recipient: string;
      deadline: string | Date;
      amountIn: string | BigNumber;
      amountOutMinimum: number;
      sqrtPriceLimitX96: number;
    }

    //balanceof

    console.log(amount)

    let abiToken = ["function approve(address _spender, uint256 _value) public returns (bool success)"]



    const getContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(coinsSelectUser, abiToken, provider);
      return contract.connect(provider.getSigner())
    }

    console.log(amount)
    // console.log(BigNumber.from(amount))
    // console.log(BigNumber.from(amount * 10 ** 18))

    const t = await getContract().approve(CONTRACT_ADDRESS, BigNumber.from(amount).mul('10000000000000000'))
    await t.wait()
    // approve

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
        amountIn: BigNumber.from(amount).mul('10000000000000000').div(coins.length).toString(),
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };
      const encData = swapRouter.interface.encodeFunctionData(
        'exactInputSingle',
        [params],
      );
      res.push(encData);
    }

    const getSwapContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      return contract.connect(provider.getSigner())
    }

    // getSwapContract.exactInputSingle({})


    const multicall = swapRouter.interface.encodeFunctionData('multicall', [
      res,
    ]);

    const txArgs = {
      //env
      to: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      from: userAddress,
      data: multicall,
      gasLimit: 300000
    };
    const tx = await provider.getSigner().sendTransaction(txArgs);
    console.log(tx)
    const receipt = await tx.wait()
    console.log('receipt', receipt)
  } catch (e) {
    console.log(e)
  }
}