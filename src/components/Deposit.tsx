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
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const hashLocation = generateHashLocation(geoLocations);

  async function deposit() {
    await write(hashLocation);
    console.log(geoLocations);
  }

  return (
    <button
      onClick={deposit}
      className="w-[150px] rounded-xl border bg-indigo-600 p-2 px-4 text-white"
    >
      Deposit
    </button>
  );
}

export default Deposit;
