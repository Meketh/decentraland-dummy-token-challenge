// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import walletSetup, { ADDRESS } from './wallet.setup'

const shortAddress = ADDRESS.slice(0, 6) + '...' + ADDRESS.slice(-4)

// Create a test instance with Synpress and MetaMask fixtures
const test = testWithSynpress(metaMaskFixtures(walletSetup))

// Extract expect function from test
const { expect } = test

// Define a basic test case
test('should connect wallet to MetaMask', async ({ context, page, metamaskPage, extensionId }) => {
  // Create a new MetaMask instance
  const metamask = new MetaMask(context, metamaskPage, walletSetup.walletPassword, extensionId)

  // Navigate to the homepage
  await page.goto('/')

  // Click the connect button
  await page.getByText('Connect').click()

  // Connect MetaMask to the dapp
  await metamask.connectToDapp()

  // Verify the connected account address
  await expect(page.getByText(shortAddress)).toBeAttached()

  // Additional test steps can be added here, such as:
  // - Sending transactions
  // - Interacting with smart contracts
  // - Testing dapp-specific functionality
})
