import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers, utils } from 'ethers';
import { noOp } from 'src/lib/helpers';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { generateChest, generatePrivateKey } from '../contracts/helpers';
import pirateABI from '../contracts/PirateContract/abi.json';
import { ADDRESS } from '../contracts/PirateContract/pirate-contract';

function Deposit({ geoLocations, ...restProps }) {
  const privateKey = generatePrivateKey(geoLocations);
  const chest = generateChest(geoLocations);
  const pirateSigner = new ethers.Wallet(privateKey);
  const { address } = useAccount();
  const { openConnectModal = noOp } = useConnectModal();

  const { config } = usePrepareContractWrite({
    addressOrName: ADDRESS,
    contractInterface: pirateABI,
    functionName: 'burryChest',
    args: [chest, pirateSigner.address],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  async function deposit() {
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
    if (chest === privateKey) {
      // SHOULD NEVER HAPPEN
      alert('Something went wrong');
      return;
    }

    write?.();
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
