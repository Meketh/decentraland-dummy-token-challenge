import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import walletSetup, { ADDRESS } from './wallet.setup'

const it = testWithSynpress(metaMaskFixtures(walletSetup))
const { expect, describe, beforeEach } = it

const shortAddress = ADDRESS.slice(0, 6) + '...' + ADDRESS.slice(-4)

let metamask: MetaMask
beforeEach(async ({ context, metamaskPage, extensionId }) => {
  metamask = new MetaMask(context, metamaskPage, walletSetup.walletPassword, extensionId)
})

it('should connect to wallet', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Connect')).toBeAttached()

  await page.getByText('Connect').click()
  await metamask.connectToDapp()

  await expect(page.getByText(shortAddress)).toBeAttached()
})

describe('While connected to wallet', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('Connect').click()
    await metamask.connectToDapp()
  })

  it('should remember previous connections', async ({ page }) => {
    await expect(page.getByText(shortAddress)).toBeAttached()

    await page.reload()

    await expect(page.getByText(shortAddress)).toBeAttached()
  })

  it('should NOT remember when the user disconnects', async ({ page }) => {
    await expect(page.getByText(shortAddress)).toBeAttached()

    await metamask.lock()
    await page.reload()

    await expect(page.getByText(shortAddress)).not.toBeAttached()
    await expect(page.getByText('Connect')).toBeAttached()
  })
})
