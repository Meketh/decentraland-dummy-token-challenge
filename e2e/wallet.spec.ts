import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import walletSetup, { ADDRESS } from './wallet.setup'

const it = testWithSynpress(metaMaskFixtures(walletSetup))
const { expect, describe, beforeEach } = it

describe('While connected', () => {
  beforeEach(async ({ context, page, metamaskPage, extensionId }) => {
    const metamask = new MetaMask(context, metamaskPage, walletSetup.walletPassword, extensionId)
    await page.goto('/')

    await page.getByText('Connect').click()
    await metamask.connectToDapp()
  })

  it('should be connected', async ({ page }) => {
    const shortAddress = ADDRESS.slice(0, 6) + '...' + ADDRESS.slice(-4)
    await expect(page.getByText(shortAddress)).toBeAttached()
  })
})
