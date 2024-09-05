import AppBar from "./components/AppBar";
import GameBox from "./components/GameBox";
import { Flex } from "@radix-ui/themes";
import ConnectWalletNotice from "./components/ConnectWalletNotice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    connected,
  } = useWallet();

  const notifySuccess = (message: String) => toast.success(message)
  const notifyFailure = (message: String) => toast.error(message)

  return (
    <Flex gap="3" direction="column" justify="between">
      <AppBar />
      {
        connected
        ? <GameBox notifySuccess={notifySuccess} notifyFailure={notifyFailure} />
        : <ConnectWalletNotice />
      }
      <ToastContainer theme="dark" position="bottom-right" />
    </Flex>
  )
}

export default App
