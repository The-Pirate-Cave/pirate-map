import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { generateChest, generatePrivateKey } from 'src/contracts/helpers';
import usePirateContract from 'src/contracts/usePirateContract';
import { noOp } from 'src/lib/helpers';
import { useAccount, useBalance, useSignMessage } from 'wagmi';

function Withdraw({ geoLocations, amount }) {
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const signedTreasure = pirateSigner.signMessage(chest);
  const { openConnectModal = noOp } = useConnectModal();
  const { data, isLoading, isSuccess, writeAsync } = usePirateContract(
    'diggChest',
    {
      args: [
        chest,
        ethers.utils.parseEther(`${amount || 0}`).toString(),
        signedTreasure,
      ],
      overrides: {
        gasLimit: 1e7,
      },
    }
  );

  async function handleWithdraw() {
    if (!address) {
      openConnectModal();
      return;
    }

    if (geoLocations.length === 0) {
      alert('No coords were added');
      return;
    }

    if (!amount) {
      alert('How much treasure you want to dig out? Enter amount!');
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
      onClick={handleWithdraw}
      className="w-[150px] rounded-xl border bg-red-600 p-2 px-4 text-white"
    >
      Withdraw
    </button>
  );
}

export default Withdraw;
