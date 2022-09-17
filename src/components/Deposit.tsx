import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import usePirateContract from 'src/contracts/usePirateContract';
import { bnum, noOp } from 'src/lib/helpers';
import { useAccount, useBalance, useWaitForTransaction } from 'wagmi';

import { generateChest, generatePrivateKey } from '../contracts/helpers';

function Deposit({ geoLocations, amount, ...restProps }) {
  const router = useRouter();
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { openConnectModal = noOp } = useConnectModal();
  const { data, writeAsync } = usePirateContract('burryChest', {
    args: [chest, pirateSigner.address],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(`${amount || 0}`).toString(),
    },
  });

  const { status, isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

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
      toast.error('No PINs were added');
      return;
    }

    if (!amount) {
      toast.error('How much treasure you want to bury? Enter amount!');
      return;
    }

    if (bnum(balance.formatted).lt(amount)) {
      toast.error('You are too poor');
      return;
    }

    if (chest === privateKey) {
      // SHOULD NEVER HAPPEN
      toast.error('Something went wrong');
      return;
    }

    try {
      const tx = await writeAsync?.();
      await tx?.wait();
    } catch (error) {
      toast.error('User rejected a transaction or something went wrong');
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={deposit}
      className={`flex whitespace-nowrap rounded-xl bg-indigo-600 py-3 px-4 align-middle font-bold text-white`}
      {...restProps}
    >
      <span>
        <img
          src={`${router.basePath}/assets/icons/pirate.png`}
          className={'mr-3 -mt-1 w-7'}
          alt=""
        />
      </span>
      {isLoading ? 'Loading...' : 'Bury a treasure'}
    </button>
  );
}

export default Deposit;
