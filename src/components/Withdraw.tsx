import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
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
  const router = useRouter();
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
      className="flex w-[150px] rounded-xl bg-red-600 p-2 px-4 align-middle font-bold  text-white"
    >
      <img
        src={`${router.basePath}/assets/icons/shovel.svg`}
        className={'mr-3 w-7'}
        alt=""
      />
      Withdraw
    </button>
  );
}

export default Withdraw;
