import { Flex, Text, Box, DropdownMenu, Button, TextField, Avatar } from "@radix-ui/themes"

export default function From({ tokens, handleSetYTokens, fromToken, handleSetFromToken, handleSetSwapAmount, handleSetConvertedAmount, getResourceAmount, fromTokenAmount, handleSetFromTokenAmount }) {
    
    const handleChange = (e) => {
        let amount = e.target.valueAsNumber
        if (amount < 0 || Number.isNaN(amount) || (amount > fromTokenAmount)) {
            amount = 0
            e.target.value = 0
        }
        handleSetSwapAmount(amount)
        handleSetConvertedAmount()
    }

    return (
        <Flex gap="5" direction="column">
            <Text size="5">From</Text>
            <Flex gap="5" direction="column">
                <TextField.Root placeholder="Amount" size="3" type="number" onChange={handleChange} disabled={
                    !fromToken
                }>
                    <TextField.Slot />
                </TextField.Root>
                <Flex justify="between" align="center">
                    <Text size="1">Balance: {fromTokenAmount}</Text>
                    <Flex gap="5" direction="column">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="soft" size="2">
                                    {
                                        fromToken
                                        ? <Box py="3">
                                            <Avatar
                                                src={fromToken.logoURI}
                                                fallback="A"
                                                size="1"
                                            />
                                            <Text>{fromToken.symbol}</Text>
                                        </Box>
                                        : "Select Token"
                                    }
                                    <DropdownMenu.TriggerIcon />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {tokens.map((token, index) => (
                                    <DropdownMenu.Item key={index} onSelect={async () => {
                                        handleSetFromToken(token)
                                        const res_amt = await getResourceAmount(token.address)
                                        handleSetFromTokenAmount(res_amt)
                                        handleSetYTokens()
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
    )
}