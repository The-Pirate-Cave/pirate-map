import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import usePirateContract from 'src/contracts/usePirateContract';
import { bnum, noOp } from 'src/lib/helpers';
import { useAccount, useBalance } from 'wagmi';

import { generateChest, generatePrivateKey } from '../contracts/helpers';

function Deposit({ geoLocations, amount, ...restProps }) {
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { openConnectModal = noOp } = useConnectModal();
  const { writeAsync } = usePirateContract('burryChest', {
    args: [chest, pirateSigner.address],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(`${amount || 0}`).toString(),
    },
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
      className="w-[150px] rounded-xl border border-indigo-500 bg-indigo-600 p-2 px-4 text-white"
      {...restProps}
    >
      Deposit
    </button>
  );
}

export default Deposit;
