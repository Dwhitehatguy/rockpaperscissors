import { Button, Box, Spinner } from "@radix-ui/themes"
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function ConnectWalletButton() {
    const {
        connect,
        isLoading,
      } = useWallet();

    const onConnect = async (walletName: any) => {
        await connect(walletName);
    };

    return (
        <Box>
            <Button color="pink" onClick={
                () => onConnect("Petra")
            }>
                <Spinner loading={isLoading}>
                    Connect Petra Wallet
                </Spinner>
            </Button>
        </Box>
    )
}