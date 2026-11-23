import { expect, mockPost, test } from './support/test.js';
import {
  PRICE_LIST,
  UNBROKEN_PRICE,
  VIEWPORT_WIDTHS,
  expectReadablePriceList,
  openPriceList,
  unbrokenTextPost,
} from './support/priceList.js';

test.describe('/prices', () => {
  for (const width of VIEWPORT_WIDTHS) {
    test(`price list is readable on a ${width}px screen`, async ({ page }) => {
      await openPriceList(page, '/prices', width);

      await expectReadablePriceList(page);
    });
  }

  for (const width of [320, 768, 1440]) {
    test(`unbroken labels and prices wrap on a ${width}px screen`, async ({ page }) => {
      await mockPost(page, 'prices', unbrokenTextPost('prices'));
      await openPriceList(page, '/prices', width);

      await expect(page.locator(`${PRICE_LIST} .price-value`)).toContainText(UNBROKEN_PRICE);
      await expectReadablePriceList(page);
    });
  }
});
