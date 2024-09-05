import { Flex, Text, Box, DropdownMenu, Button, Avatar, TextField } from "@radix-ui/themes"

export default function To({ tokens, toToken, fromToken, swapAmount, handleSetConvertedAmount, convertedAmount, handleSetToToken, getResourceAmount, toTokenAmount, handleSetToTokenAmount }) {

    return (
        <Flex gap="5" direction="column">
            <Text size="5">To</Text>
            <Flex>
                <Flex gap="5" direction="column">
                    <TextField.Root size="3" disabled>
                        <TextField.Slot>{Number.isNaN(convertedAmount) ? "Converted Amount" : convertedAmount}</TextField.Slot>
                    </TextField.Root>
                    <Flex justify="between" align="center">
                        <Text size="1">Balance: {toTokenAmount}</Text>
                        <Flex gap="5" direction="column">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger disabled={
                                    !fromToken || (swapAmount <= 0)
                                }>
                                    <Button variant="soft" size="2">
                                        {
                                            toToken
                                                ? <Box py="3">
                                                    <Avatar
                                                        src={toToken.logoURI}
                                                        fallback="A"
                                                        size="1"
                                                    />
                                                    <Text>{toToken.symbol}</Text>
                                                </Box>
                                                : "Select Token"
                                        }
                                        <DropdownMenu.TriggerIcon />
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {tokens.map((token, index) => (
                                        <DropdownMenu.Item key={index} onSelect={async () => {
                                            handleSetToToken(token)
                                            const res_amt = await getResourceAmount(token.address)
                                            handleSetToTokenAmount(res_amt)
                                            handleSetConvertedAmount()
                                        }}>
                                            <Avatar
                                                src={token.logoURI}
                                                fallback="A"
                                                size="1"
                                            />
                                            <Text>{token.symbol}</Text>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}