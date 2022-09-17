import { useConnectModal } from '@rainbow-me/rainbowkit';
import { noOp } from 'src/lib/helpers';
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { generateHashLocation } from '../contracts/helpers';
import pirateABI from '../contracts/PirateContract/abi.json';
import { ADDRESS } from '../contracts/PirateContract/pirate-contract';

function Deposit({ geoLocations }) {
  const { config } = usePrepareContractWrite({
    addressOrName: ADDRESS,
    contractInterface: pirateABI,
    functionName: 'burryChest',
  });
  const { address } = useAccount();
  const { openConnectModal = noOp } = useConnectModal();
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const hashLocation = generateHashLocation(geoLocations);

  function handleDeposit() {
    if (!address) {
      openConnectModal();
    } else {
      // noop
    }
    console.log(geoLocations);
  }

  return (
    <button
      onClick={handleDeposit}
      className="w-[150px] rounded-xl border bg-indigo-600 p-2 px-4 text-white"
    >
      Deposit
    </button>
  );
}

export default Deposit;
