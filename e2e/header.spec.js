import { expect, test } from './support/test.js';
import { horizontalOverflow, setViewportWidth } from './support/layout.js';

test.describe('header', () => {
  test('mobile menu opens and closes without sideways scrolling', async ({ page }) => {
    await setViewportWidth(page, 375, 812);
    await page.goto('/prices');

    const toggle = page.getByRole('button', { name: 'Toggle navigation' });
    const contactsLink = page.locator('header').getByRole('link', { name: 'контакти' });
    await expect(contactsLink).toBeHidden();

    await toggle.click();
    await expect(contactsLink).toBeVisible();
    expect(await horizontalOverflow(page), 'page scrolls sideways (px)').toBeLessThanOrEqual(0);

    await toggle.click();
    await expect(contactsLink).toBeHidden();
  });
});
