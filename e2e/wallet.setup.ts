import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask, getExtensionId } from '@synthetixio/synpress/playwright'

export const ADDRESSES = ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8']
const SEED_PHRASE = 'test test test test test test test test test test test junk'
const PASSWORD = 'Tester@1234'

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, 'MetaMask')
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId)
  await metamask.importWallet(SEED_PHRASE)

  await metamask.addNetwork({
    chainId: 1337,
    symbol: 'ETH',
    name: 'Localhost 8545',
    rpcUrl: 'http://localhost:8545',
    blockExplorerUrl: 'http://localhost:8545'
  })
})
