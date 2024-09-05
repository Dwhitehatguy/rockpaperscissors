import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Button, Spinner } from "@radix-ui/themes"
import { useState } from "react"
import { MoveStructId } from "@aptos-labs/ts-sdk"

export default function SwapButton({ aptos, swapAmount, convertedAmount, fromToken, toToken, notifySuccess, notifyFailure, getResourceAmount, handleSetFromTokenAmount, handleSetToTokenAmount }) {

    const {
        account,
        signAndSubmitTransaction,
    } = useWallet()
    const [swapLoading, setSwapLoading] = useState(false)

    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1672269811.
    const swap = async () => {
        setSwapLoading(true)

        const exp = Math.floor(Date.now() / 1000) + 60 * 10

        // console.log(fromToken, toToken)
        
        let func: MoveStructId = "0xa5d3ac4d429052674ed38adc62d010e52d7c24ca159194d17ddc196ddb7e480b::pool::swap_y_to_x"
        let typeArgs = [toToken.address, fromToken.address]
        const funcArgs = [BigInt((swapAmount + (swapAmount * 2 / 100)) * 100000000), BigInt(Math.trunc(convertedAmount * 100000000))]

        if (
            (fromToken.symbol === "CAKE" && toToken.symbol === "APT") 
            || (fromToken.symbol === "APT" && toToken.symbol === "CAKE")) {
                func = "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input"
                typeArgs = [fromToken.address, toToken.address]
        }

        const response = await signAndSubmitTransaction({
            sender: account?.address,
            data: {
                function: func,
                typeArguments: typeArgs,
                functionArguments: funcArgs,
            },
            options: {
                expireTimestamp: exp,
            }
        });

        // if you want to wait for transaction
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            notifySuccess()
            const res_amt_from = await getResourceAmount(fromToken.address)
            const res_amt_to = await getResourceAmount(toToken.address)
            handleSetFromTokenAmount(res_amt_from)
            handleSetToTokenAmount(res_amt_to)
        } catch (error) {
            // console.error(error);
            notifyFailure()
        }
        setSwapLoading(false)
    }

    return (
        <Button size="4" variant="classic" onClick={async () => await swap()} disabled={
            fromToken && toToken && swapAmount && convertedAmount
            ? false
            : true
        }>
            <Spinner loading={swapLoading}>
                Swap
            </Spinner>
        </Button>
    )
}