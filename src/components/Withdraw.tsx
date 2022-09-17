import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  generateChest,
  generateChestUnhashed,
  generatePrivateKey,
  runConfettiParty,
} from 'src/contracts/helpers';
import usePirateContract from 'src/contracts/usePirateContract';
import { noOp } from 'src/lib/helpers';
import { useAccount, useWaitForTransaction } from 'wagmi';

function Withdraw({ geoLocations, amount }) {
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const router = useRouter();
  const messageHashBytes = generateChestUnhashed(geoLocations);
  const signedTreasure = pirateSigner.signMessage(messageHashBytes);
  pirateSigner.signMessage(messageHashBytes).then((sign) => {
    const addr = ethers.utils.verifyMessage(messageHashBytes, sign);
  });

  const { openConnectModal = noOp } = useConnectModal();
  const { data, writeAsync } = usePirateContract('diggChest', {
    args: [
      chest,
      ethers.utils.parseEther(`${amount || 0}`).toString(),
      signedTreasure,
    ],
    overrides: {
      gasLimit: 1e7,
    },
  });

  const {
    data: txData,
    status,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  async function handleWithdraw() {
    if (!address) {
      openConnectModal();
      return;
    }

    if (geoLocations.length === 0) {
      toast.error('No PINs were added');
      return;
    }

    if (!amount) {
      toast.error('How much treasure you want to dig out? Enter amount!');
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
      onClick={handleWithdraw}
      className="flex w-[150px] rounded-xl bg-yellow-700 py-3 px-4 align-middle font-bold  text-white"
    >
      <img
        src={`${router.basePath}/assets/icons/shovel.svg`}
        className={'-my-1 mr-3 w-7'}
        alt=""
      />
      {isLoading ? 'Loading...' : 'Withdraw'}
    </button>
  );
}

export default Withdraw;
