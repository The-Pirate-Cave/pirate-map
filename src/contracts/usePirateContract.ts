import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import type {
  UsePrepareContractWriteArgs,
  UsePrepareContractWriteConfig,
} from 'wagmi/dist/declarations/src/hooks/contracts/usePrepareContractWrite';

import pirateABI from './PirateContract/abi.json';
import { ADDRESS } from './PirateContract/pirate-contract';

function usePirateContract(
  functionName: string,
  contractConfig: Partial<
    UsePrepareContractWriteArgs & UsePrepareContractWriteConfig
  >
) {
  const { config } = usePrepareContractWrite({
    ...contractConfig,
    addressOrName: ADDRESS,
    contractInterface: pirateABI,
    functionName,
  });

  const writeContract = useContractWrite(config);
  return writeContract;
}

export default usePirateContract;
