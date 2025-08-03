import { JsonRpcProvider, Contract, formatUnits } from 'ethers'
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import walletSetup, { NETWORK, ADDRESSES, TOKEN_ADDRESS } from './wallet.setup'

const it = testWithSynpress(metaMaskFixtures(walletSetup))
const { expect, describe, beforeEach } = it

let wallet: MetaMask
beforeEach(async ({ context, metamaskPage, extensionId }) => {
  wallet = new MetaMask(context, metamaskPage, walletSetup.walletPassword, extensionId)
})

const [sender, recipient] = ADDRESSES
const shortAddress = sender.slice(0, 6) + '...' + sender.slice(-4)
const provider = new JsonRpcProvider(NETWORK.rpcUrl)
const TOKEN_ABI = ['function balanceOf(address) view returns (uint)']
type TokenContract = Contract & { balanceOf(address: string): Promise<bigint> }
const token = new Contract(TOKEN_ADDRESS, TOKEN_ABI, provider) as TokenContract

it('should connect to wallet', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Connect' })).toBeAttached()

  // Try to connect
  await page.getByRole('button', { name: 'Connect' }).click()
  await wallet.connectToDapp()
  await expect(page.getByText(shortAddress)).toBeAttached()
})

describe('While connected to wallet', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Connect' }).click()
    await wallet.connectToDapp()
  })

  it('should remember previous connections', async ({ page }) => {
    await expect(page.getByText(shortAddress)).toBeAttached()
    await page.reload()
    await expect(page.getByText(shortAddress)).toBeAttached()
  })

  it('should NOT remember when the user disconnects', async ({ page }) => {
    await expect(page.getByText(shortAddress)).toBeAttached()

    // "Disconnect"
    await wallet.lock()
    await page.reload()

    await expect(page.getByText(shortAddress)).not.toBeAttached()
    await expect(page.getByRole('button', { name: 'Connect' })).toBeAttached()
  })

  it('should navigate to transfer page and show transfer form', async ({ page }) => {
    await page.getByText('Transfer').click()
    expect(page.url()).toContain('/transfer')

    await expect(page.getByText('Transfer DUMMY Tokens')).toBeAttached()
    await expect(page.getByLabel('recipient')).toBeAttached()
    await expect(page.getByLabel('amount')).toBeAttached()
  })

  describe('On transfer page', () => {
    beforeEach(async ({ page }) => {
      await page.goto('/transfer')
    })

    it('should validate transfer', async ({ page }) => {
      // Fill form
      await page.getByRole('button', { name: 'Transfer' }).isDisabled()
      await page.getByLabel('recipient').fill(recipient)
      await page.getByLabel('amount').fill('10')
      await page.getByRole('button', { name: 'Transfer' }).isEnabled()

      // Test invalid address
      await page.getByLabel('recipient').fill('invalid-address')
      await page.getByRole('button', { name: 'Transfer' }).click()
      await expect(page.getByText('Invalid Ethereum address format')).toBeAttached()

      // Test self-transfer
      await page.getByLabel('recipient').fill(sender)
      await page.getByRole('button', { name: 'Transfer' }).click()
      await expect(page.getByText('Cannot transfer to your own address')).toBeAttached()

      // Test invalid amount
      await page.getByLabel('recipient').fill(recipient)
      await page.getByLabel('amount').fill('-1')
      await page.getByRole('button', { name: 'Transfer' }).click()
      await expect(page.getByText('Amount must be a positive number')).toBeAttached()
    })

    it('should clear form when clear button is clicked', async ({ page }) => {
      await page.getByLabel('recipient').fill(recipient)
      await page.getByLabel('amount').fill('10')

      // Clear form
      await page.getByRole('button', { name: 'Clear' }).click()
      await expect(page.getByLabel('recipient')).toHaveValue('')
      await expect(page.getByLabel('amount')).toHaveValue('')
    })

    it('should set amount to balance when max button is clicked', async ({ page }) => {
      const balance = formatUnits(await token.balanceOf(sender), 4)
      await page.getByRole('button', { name: 'Max' }).click()
      await expect(page.getByLabel('amount')).toHaveValue(balance?.toString())
    })

    it('should transfer tokens', async ({ page }) => {
      await page.getByLabel('recipient').fill(recipient)
      await page.getByLabel('amount').fill('13')

      await page.getByRole('button', { name: 'Transfer' }).click()
      await wallet.confirmTransaction()
      await expect(page.getByText('Transfer successful!')).toBeAttached()
    })
  })
})
