import React, { useState, useEffect } from 'react'
import { Heading, Text, VStack, Stack } from '@chakra-ui/core'
import { ethers } from 'ethers'

function EthersTab() {
  const [isEtherem, setIsEtherem] = useState(false)
  const [isEnable, setIsEnable] = useState(false)
  const [account, setAccount] = useState('0x0')
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(0)

  // check if ethereum is injected
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setIsEtherem(true)
    } else setIsEtherem(false)
  }, [])

  // connect metamask to app
  useEffect(() => {
    ;(async () => {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const account = accounts[0]
        setIsEnable(true)
        setAccount(account)
      } catch (e) {
        setIsEnable(false)
      }
    })()
  }, [isEtherem])

  useEffect(() => {
    ;(async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      const _balance = await provider.getBalance(account)
      const balance = ethers.utils.formatEther(_balance)
      setNetwork(network)
      setBalance(balance)
    })()
  }, [isEnable, account])

  return (
    <>
    <VStack spacing={10}>
      <Heading mb={30} fontFamily="Times New Roman">Web3 with ethers.js</Heading>
      <Stack direction="row" align="center" spacing={10}>
      <Text fontSize="2xl" color="blue.500">Metamask status: {isEnable ? 'connected' : 'disconnect'}</Text>
      </Stack>
      {network !== null && (
        <>
        <Stack direction="row" align="center" spacing={20}>
        
          <Text color="tomato">Account: {account}</Text>
          </Stack>
          <Stack direction="row" align="center" spacing={20}>
          <Text>Network name: {network.name}</Text>
          </Stack>
          <Stack fontWeight="bold" direction="row" align="center" spacing={50}>
          <Text>Network id: {network.chainId}</Text>
          </Stack>
          <Stack direction="row" align="center" spacing={20}>
          <Text mt="30" color="purple.700">Balance: {balance}</Text>
          </Stack>
          
        </>
      )}
      </VStack>
    </>
  )
}

export default EthersTab

