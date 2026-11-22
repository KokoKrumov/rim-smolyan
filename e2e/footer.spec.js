import { expect, test } from './support/test.js';
import { horizontalOverflow, setViewportWidth, waitForFonts } from './support/layout.js';

async function openFooter(page, width) {
  await setViewportWidth(page, width);
  await page.goto('/prices');
  const row = page.locator('.footer__navbar-brand__wrap');
  await row.waitFor();
  await waitForFonts(page);

  return {
    row: await row.boundingBox(),
    brand: await row.locator('.navbar-brand').boundingBox(),
    socials: await row.locator('.socials').boundingBox(),
  };
}

test.describe('footer', () => {
  test('social links wrap below the logo on a 320px screen', async ({ page }) => {
    const { row, brand, socials } = await openFooter(page, 320);

    expect(socials.y, 'social links start below the logo').toBeGreaterThanOrEqual(
      brand.y + brand.height - 1,
    );
    expect(socials.x + socials.width, 'right edge of the social links').toBeLessThanOrEqual(
      row.x + row.width + 1,
    );
    expect(await horizontalOverflow(page), 'page scrolls sideways (px)').toBeLessThanOrEqual(0);
  });

  test('social links stay beside the logo on a 375px screen', async ({ page }) => {
    const { row, brand, socials } = await openFooter(page, 375);

    expect(socials.y, 'social links start beside the logo').toBeLessThan(brand.y + brand.height);
    expect(socials.x + socials.width, 'right edge of the social links').toBeLessThanOrEqual(
      row.x + row.width + 1,
    );
    expect(await horizontalOverflow(page), 'page scrolls sideways (px)').toBeLessThanOrEqual(0);
  });
});
