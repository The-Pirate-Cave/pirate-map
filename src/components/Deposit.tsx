import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers, utils } from 'ethers';
import { bnum, noOp } from 'src/lib/helpers';
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { generateChest, generatePrivateKey } from '../contracts/helpers';
import pirateABI from '../contracts/PirateContract/abi.json';
import { ADDRESS } from '../contracts/PirateContract/pirate-contract';

function Deposit({ geoLocations, amount, ...restProps }) {
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { openConnectModal = noOp } = useConnectModal();
  const { config } = usePrepareContractWrite({
    addressOrName: ADDRESS,
    contractInterface: pirateABI,
    functionName: 'burryChest',
    args: [chest, pirateSigner.address],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(`${amount || 0}`).toString(),
    },
  });

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config);

  async function deposit() {
    console.log('amount: ', amount);
    console.log('balance: ', balance);
    console.log('geoLocations', geoLocations);
    console.log('result hash: ', privateKey);
    console.log('pirateSigner', pirateSigner);

    if (!address) {
      openConnectModal();
      return;
    }

    if (geoLocations.length === 0) {
      alert('No coords were added');
      return;
    }

    if (!amount) {
      alert('How much treasure you want to bury? Enter amount!');
      return;
    }

    if (bnum(balance.formatted).lt(amount)) {
      alert('You are too poor');
      return;
    }

    if (chest === privateKey) {
      // SHOULD NEVER HAPPEN
      alert('Something went wrong');
      return;
    }

    const tx = await writeAsync?.();
    await tx.wait();
    console.log('DONE!', tx);
  }

  return (
    <button
      onClick={deposit}
      className="w-[150px] rounded-xl border bg-indigo-600 p-2 px-4 text-white"
      {...restProps}
    >
      Deposit
    </button>
  );
}

export default Deposit;
