import { expect, mockPost, test } from './support/test.js';
import {
  PRICE_LIST,
  UNBROKEN_PRICE,
  VIEWPORT_WIDTHS,
  expectReadablePriceList,
  openPriceList,
  unbrokenTextPost,
} from './support/priceList.js';

const PAGE = '/house-museum-laszlo-nagy';
const CONTACTS = '.laszlo-nagy__page__contact-section .address__list';

// From Bootstrap's lg breakpoint the contacts move from below the prices to beside them
const TWO_COLUMN_MIN_WIDTH = 992;

test.describe('/house-museum-laszlo-nagy', () => {
  for (const width of VIEWPORT_WIDTHS) {
    test(`price list is readable on a ${width}px screen`, async ({ page }) => {
      await openPriceList(page, PAGE, width);

      await expectReadablePriceList(page);

      const prices = await page.locator(PRICE_LIST).boundingBox();
      const contacts = await page.locator(CONTACTS).boundingBox();
      if (width < TWO_COLUMN_MIN_WIDTH) {
        expect(contacts.y, 'contacts start below the prices').toBeGreaterThanOrEqual(
          prices.y + prices.height - 1,
        );
      } else {
        expect(contacts.x, 'contacts start to the right of the prices').toBeGreaterThanOrEqual(
          prices.x + prices.width - 1,
        );
        expect(prices.width, 'price column width (px)').toBeGreaterThanOrEqual(
          width < 1200 ? 500 : 600,
        );
      }
    });
  }

  for (const width of [320, 992, 1440]) {
    test(`unbroken labels and prices wrap on a ${width}px screen`, async ({ page }) => {
      await mockPost(page, 'prices-laslo-nagi', unbrokenTextPost('prices-laslo-nagi'));
      await openPriceList(page, PAGE, width);

      await expect(page.locator(`${PRICE_LIST} .price-value`)).toContainText(UNBROKEN_PRICE);
      await expectReadablePriceList(page);
    });
  }

  for (const width of [320, 1440]) {
    test(`price list is readable in English on a ${width}px screen`, async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('lang', 'en'));
      await openPriceList(page, PAGE, width);

      await expect(page.getByRole('heading', { name: 'Contacts and prices' })).toBeVisible();
      await expectReadablePriceList(page);
    });
  }
});
