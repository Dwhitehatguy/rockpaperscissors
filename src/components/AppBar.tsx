import { Box, Flex, Heading, Text, Button, Avatar } from "@radix-ui/themes"
import ConnectWalletButton from "./ConnectWalletButton"
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function AppBar() {
    const {
        connected,
        disconnect,
        account,
        wallet
      } = useWallet();

    const shortenWalletAddress = (address: any): string => {
        // Shorten the address
        const start = address.slice(0, 6); // first 6 characters including "0x"
        const end = address.slice(-5); // last 5 characters
        return `${start}....${end}`;
    }

    return (
        <Box
            p="3"
        >
            <Flex gap="3" justify="between" align="center">
                <Box>
                    <Heading m="2" size="6">RockPaperScissors</Heading>
                </Box>
                {
                    connected
                    ? <Flex gap="4" align="center">
                        <Box>
                        <Avatar
                            src={wallet?.icon}
                            fallback="A"
                        />
                        </Box>
                        <Box>
                            <Text>{shortenWalletAddress(account?.address)}</Text>
                        </Box>
                        <Box>
                            <Button color="teal" onClick={() => disconnect()}>Disconnect</Button>
                        </Box>
                    </Flex>
                    : <Flex gap="4" align="center">
                        <ConnectWalletButton />
                    </Flex>
                }
            </Flex>
        </Box>
    )
}