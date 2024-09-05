import { Box, Button, Flex, Text, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { Aptos, MoveStructId, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react"

export default function GameBox({ notifySuccess, notifyFailure }) {
    const {
        signAndSubmitTransaction,
        account
    } = useWallet();

    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);
    const [playerMove, setPlayerMove] = useState<number | null>(null);
    const [computerMove, setComputerMove] = useState<number | null>(null);
    const [gameResult, setGameResult] = useState<String | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [swapLoading, setSwapLoading] = useState<boolean>(false)
    const exp = Math.floor(Date.now() / 1000) + 60 * 10

    const handleStartGame = async () => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::start_game"
        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: func,
                functionArguments: []
            },
            options: {
                expireTimestamp: exp,
            }
        });
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            setGameStarted(!gameStarted)
            notifySuccess("Game Started!")
        } catch (error) {
            console.error(error);
            notifyFailure("Something went wrong!")
        }
        setSwapLoading(false)
    }

    const handleSetPlayerMove = async (num: number) => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::set_player_move"
        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: func,
                functionArguments: [String(num)]
            },
            options: {
                expireTimestamp: exp,
            }
        });
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            console.log(response)
            setPlayerMove(num)
            notifySuccess("Player move set!")
        } catch (error) {
            console.error(error);
            notifyFailure("Something went wrong!")
        }
        setSwapLoading(false)
    }
    const handleSetComputerMove = async () => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::randomly_set_computer_move"
        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: func,
                functionArguments: []
            },
            options: {
                expireTimestamp: exp,
            }
        });
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            console.log(response)
            notifySuccess("Computer move set!")
        } catch (error) {
            console.error(error);
            notifyFailure("Something went wrong!")
        }
        setSwapLoading(false)
    }
    const getComputerMove = async () => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::get_computer_move"
        const response = await aptos.view({ 
            payload: {
                function: func,
                functionArguments: [account.address]
            }
         })
        console.log(response)
        setComputerMove(Number(response[0]))
        setSwapLoading(false)
    }
    const handleFinalizeGameResults = async () => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::finalize_game_results"
        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: func,
                functionArguments: []
            },
            options: {
                expireTimestamp: exp,
            }
        });
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            console.log(response)
            notifySuccess("Game results ready!")
        } catch (error) {
            console.error(error);
            notifyFailure("Something went wrong!")
        }
        setSwapLoading(false)
    }

    const getGameResults = async () => {
        setSwapLoading(true)
        const func: MoveStructId = "0x7ceb17f0ef05939768914cf7fb5aaeb4f3b14916f388a4e103a1090a487e1fc2::RockPaperScissors::get_game_results"
        const response = await aptos.view({ 
            payload: {
                function: func,
                functionArguments: [account.address]
            }
         })
        console.log(response)
        if (Number(response[0]) === 1) setGameResult("Oh oh! Draw!");
        if (Number(response[0]) === 2) setGameResult("Hooray! You win!");
        if (Number(response[0]) === 3) setGameResult("Computer wins!");
        setSwapLoading(false)
    }

    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" align="center" justify="between" p="5">
                <Text>Start Game</Text>
                <Button onClick={async () => await handleStartGame()}><Spinner loading={swapLoading}>Start Game</Spinner></Button>
                <Text>{gameStarted}</Text>
            </Flex>
            <Flex gap="7" align="center" justify="between" p="5">
                <Text>Make a Move & Get Computer's Move</Text>
                <Flex gap="3">
                    <Button onClick={async () => { await handleSetPlayerMove(1); await handleSetComputerMove(); await getComputerMove() }}><Spinner loading={swapLoading}>1</Spinner></Button>
                    <Button onClick={async () => { await handleSetPlayerMove(2); await handleSetComputerMove(); await getComputerMove() }}><Spinner loading={swapLoading}>2</Spinner></Button>
                    <Button onClick={async () => { await handleSetPlayerMove(3); await handleSetComputerMove(); await getComputerMove() }}><Spinner loading={swapLoading}>3</Spinner></Button>
                </Flex >
                <Flex gap="5" direction="column">
                    <Text>Your Move: {playerMove}</Text>
                    <Text>Computer's Move: {computerMove}</Text>
                </Flex>
            </Flex>
            <Flex gap="7" align="center" justify="between" p="5">
                <Text>Get Game Results</Text>
                <Button onClick={async () => { await handleFinalizeGameResults(); await getGameResults() }}><Spinner loading={swapLoading}>Get Results</Spinner></Button>
                <Text>{gameResult}</Text>
            </Flex>
        </Box>
    )
}