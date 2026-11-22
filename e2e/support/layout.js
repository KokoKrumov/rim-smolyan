import { expect } from '@playwright/test';

/** Web fonts change text widths, so measurements are only stable once they have loaded. */
export async function waitForFonts(page) {
  await page.evaluate(async () => {
    // Reading layout starts any font downloads the rendered text still needs
    document.body.getBoundingClientRect();
    await document.fonts.ready;
  });
}

/**
 * Sets the viewport so the page is exactly `width` CSS pixels wide.
 *
 * Playwright's WebKit on Windows divides the requested size by the OS display scale
 * (992px becomes 865px at 115%), which would silently test narrower screens and miss
 * breakpoints. When that happens the size is requested again, scaled up to compensate.
 */
export async function setViewportWidth(page, width, height = 900) {
  const cssWidth = () => page.evaluate(() => window.visualViewport.width);

  await page.setViewportSize({ width, height });
  const scale = width / (await cssWidth());
  if (scale !== 1) {
    await page.setViewportSize({
      width: Math.ceil(width * scale),
      height: Math.ceil(height * scale),
    });
  }

  expect(Math.floor(await cssWidth()), 'viewport width (CSS px)').toBe(width);
}

/** Pixels of sideways scrolling on the page; 0 or less means the page fits the screen. */
export function horizontalOverflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}
