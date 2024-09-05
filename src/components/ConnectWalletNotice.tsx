import { Box, Flex, Strong } from "@radix-ui/themes"
import ConnectWalletButton from "./ConnectWalletButton"

export default function ConnectWalletNotice() {
    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" direction="column" align="center">
                <Strong>Please connect your wallet to continue</Strong>
                <ConnectWalletButton />
            </Flex>
        </Box>
    )
}