import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask, getExtensionId } from '@synthetixio/synpress/playwright'
import token from './token.json' with { type: 'json' }

export const TOKEN_ADDRESS = token?.address
export const ADDRESSES = ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8']
export const SEED_PHRASE = 'test test test test test test test test test test test junk'
export const PASSWORD = 'Tester@1234'
export const NETWORK = {
  chainId: 1337,
  symbol: 'ETH',
  name: 'Localhost 8545',
  rpcUrl: 'http://localhost:8545',
  blockExplorerUrl: 'http://localhost:8545'
}

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, 'MetaMask')
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId)
  await metamask.importWallet(SEED_PHRASE)
  await metamask.addNetwork(NETWORK)
})
