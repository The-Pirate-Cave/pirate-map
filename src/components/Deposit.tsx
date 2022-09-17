import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import usePirateContract from 'src/contracts/usePirateContract';
import { bnum, noOp } from 'src/lib/helpers';
import { useAccount, useBalance } from 'wagmi';

import { generateChest, generatePrivateKey } from '../contracts/helpers';

function Deposit({ geoLocations, amount, ...restProps }) {
  const router = useRouter();
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  console.log(chest, 'chest');
  const pirateSigner = new ethers.Wallet(privateKey);
  console.log({ address: pirateSigner.address }, 'piratesigner');
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const signature = pirateSigner.signMessage(chest);
  console.log(signature, 'signature');
  const { openConnectModal = noOp } = useConnectModal();
  const { data, isLoading, isSuccess, writeAsync } = usePirateContract(
    'burryChest',
    {
      args: [chest, pirateSigner.address],
      overrides: {
        from: address,
        value: ethers.utils.parseEther(`${amount || 0}`).toString(),
      },
    }
  );

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
      toast.success('Well done, pirate!');
    } catch (error) {
      toast.error('User rejected a transaction or something went wrong');
    }
  }

  return (
    <button
      onClick={deposit}
      className="flex rounded-xl bg-indigo-600 py-3 px-4 align-middle font-bold text-white"
      {...restProps}
    >
      <img
        src={`${router.basePath}/assets/icons/pirate.png`}
        className={'mr-3 -mt-1 w-7'}
        alt=""
      />
      Bury a treasure
    </button>
  );
}

export default Deposit;
