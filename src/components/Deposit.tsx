import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
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

    try {
      const tx = await writeAsync?.();
      await tx?.wait();
      console.log('DONE!', tx);
    } catch (_) {
      //
    }
  }

  return (
    <button
      onClick={deposit}
      className="flex rounded-xl border border-indigo-500 bg-indigo-600 p-2 px-4 align-middle font-bold text-white"
      {...restProps}
    >
      <img
        src={`${router.basePath}/assets/icons/pirate.png`}
        className={'mr-3 w-7'}
        alt=""
      />
      Bury a treasure
    </button>
  );
}

export default Deposit;
