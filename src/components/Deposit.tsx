import { useConnectModal } from '@rainbow-me/rainbowkit';
import { noOp } from 'src/lib/helpers';
import { useAccount } from 'wagmi';

function Deposit() {
  const { address } = useAccount();
  const { openConnectModal = noOp } = useConnectModal();
  function handleDeposit() {
    if (!address) {
      openConnectModal();
    } else {
      // noop
    }
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
