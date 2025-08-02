import type { Eip1193Compatible } from 'web3'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { router } from './router'

export function useConnectWallet() {
  return useMutation<string, Error>({ mutationFn: connectWallet })
}

export function useWalletAddress() {
  return useQuery<string | undefined>({
    enabled: false, // Only set via mutation
    queryKey: ['wallet', 'address']
  })
}

export function useTokenBalance() {
  const { data: address } = useWalletAddress()

  return useQuery({
    queryKey: ['wallet', address, 'balance'],
    queryFn: () => getTokenBalance(address!),
    enabled: !!address
  })
}

const ethereum = (window as unknown as { ethereum: Eip1193Compatible }).ethereum

const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}
const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]

let provider: BrowserProvider
let token: Contract

if (ethereum) initProvider()
async function initProvider() {
  provider = new BrowserProvider(ethereum)
  token = new Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)

  // TODO: Check if we are on the correct chain
  // ethereum.removeAllListeners?.('chainChanged')
  // ethereum.on('chainChanged', chainId => {
  //   console.log('chainChanged', chainId)
  // })
  // const chainId :string= await provider.send('eth_chainId', [])

  ethereum.removeAllListeners?.('accountsChanged')
  ethereum.on('accountsChanged', updateAddress)

  const accounts: string[] = await provider.send('eth_accounts', [])
  updateAddress(accounts)
  if (accounts.length > 0) connectWallet()
}

function updateAddress([address]: string[]) {
  if (address) {
    queryClient.setQueryData(['wallet', 'address'], address)
    queryClient.invalidateQueries({ queryKey: ['wallet', address, 'balance'] })
  } else {
    queryClient.resetQueries({ queryKey: ['wallet'] })
    router.navigate('/')
  }
}

async function connectWallet() {
  if (!provider) throw new Error('Wallet provider missing!')
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  return address
}

async function getTokenBalance(address: string) {
  const balance: bigint = await token.balanceOf(address)
  return formatUnits(balance, 4)
}
