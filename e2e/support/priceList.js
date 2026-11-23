import { expect } from '@playwright/test';
import { horizontalOverflow, setViewportWidth, waitForFonts } from './layout.js';

export const PRICE_LIST = '#prices-content';

// Phone sizes plus the Bootstrap breakpoints the layouts switch at
export const VIEWPORT_WIDTHS = [320, 375, 414, 576, 768, 992, 1200, 1440];

export const UNBROKEN_LABEL = 'A'.repeat(120);
export const UNBROKEN_PRICE = 'B'.repeat(160);

/** A post whose only row has a label and a price that offer no natural line breaks. */
export function unbrokenTextPost(slug) {
  return {
    id: 1,
    date_gmt: '2026-01-01T00:00:00',
    slug,
    title: { rendered: 'Unbroken text' },
    content: {
      rendered: `<ol class="wp-block-list"><li><strong>Category</strong><ul class="wp-block-list"><li>${UNBROKEN_LABEL} – 4.00 € ${UNBROKEN_PRICE} – 7.82 лв.</li></ul></li></ol>`,
    },
  };
}

export async function openPriceList(page, path, width) {
  await setViewportWidth(page, width);
  await page.goto(path);
  await page.locator(`${PRICE_LIST} .price-value`).first().waitFor();
  await waitForFonts(page);
}

function measurePriceList(page) {
  return page.evaluate((selector) => {
    const list = document.querySelector(selector);
    const bounds = list.getBoundingClientRect();
    const describe = (element) => element.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
    const style = (element) => getComputedStyle(element);

    const textOutsideList = new Set();
    const walker = document.createTreeWalker(list, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const spills = [...range.getClientRects()].some(
        (rect) => rect.left < bounds.left - 1 || rect.right > bounds.right + 1,
      );
      if (spills) textOutsideList.add(describe(node.parentElement));
    }

    const categories = [...list.querySelectorAll('ol > li')];
    const rows = [...list.querySelectorAll('ul > li')];
    const prices = [...list.querySelectorAll('.price-value')];

    return {
      categoryCount: categories.length,
      rowCount: rows.length,
      priceCount: prices.length,
      listOverflow: list.scrollWidth - list.clientWidth,
      textOutsideList: [...textOutsideList],
      categoriesWithoutNumber: categories
        .filter((item) => style(item).display !== 'list-item' || style(item).listStyleType !== 'decimal')
        .map(describe),
      rowsWithoutBullet: rows
        .filter((item) => style(item).display !== 'list-item' || style(item).listStyleType !== 'disc')
        .map(describe),
      pricesBesideDescription: prices
        .filter((price) => style(price).display !== 'block' || style(price).textAlign !== 'left')
        .map(describe),
    };
  }, PRICE_LIST);
}

/**
 * The layout both price pages share: nothing scrolls or spills sideways, categories are
 * numbered, rows are bulleted and each price sits on its own line under its description.
 */
export async function expectReadablePriceList(page) {
  const list = await measurePriceList(page);

  expect(list.categoryCount, 'categories rendered').toBeGreaterThan(0);
  expect(list.rowCount, 'rows rendered').toBeGreaterThan(0);
  expect(list.priceCount, 'prices rendered').toBeGreaterThan(0);

  expect(await horizontalOverflow(page), 'page scrolls sideways (px)').toBeLessThanOrEqual(0);
  expect(list.listOverflow, 'price list scrolls sideways (px)').toBeLessThanOrEqual(0);
  expect(list.textOutsideList, 'text spilling outside the price list').toEqual([]);
  expect(list.categoriesWithoutNumber, 'categories without a number').toEqual([]);
  expect(list.rowsWithoutBullet, 'rows without a bullet').toEqual([]);
  expect(list.pricesBesideDescription, 'prices not on their own line').toEqual([]);
}
