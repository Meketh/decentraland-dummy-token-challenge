import { ethers } from 'ethers'
const { ethereum } = window as unknown as {
  ethereum: ethers.Eip1193Provider
}
const provider = new ethers.BrowserProvider(ethereum)

export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]

export async function connectWallet() {
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  return address
}
