import { test as it, expect } from '@playwright/test'

it('should error when wallet provider is missing', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Connect').click()
  await expect(page.getByText('provider missing')).toBeAttached()
})
