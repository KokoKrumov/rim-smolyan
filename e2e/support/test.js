import { test as base, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const API_ROOT = '/wp-json/wp/v2';
const MOCKED_POSTS = ['prices', 'prices-laslo-nagi'];

const fixturePath = (name) =>
  fileURLToPath(new URL(`../fixtures/${name}.json`, import.meta.url));

// The app loads the categories on every page
const isCategoriesRequest = (url) => url.pathname.endsWith(`${API_ROOT}/categories`);

const isPostRequest = (slug) => (url) =>
  url.pathname.endsWith(`${API_ROOT}/posts`) && url.searchParams.get('slug') === slug;

/** Replaces the WordPress post returned for `slug`. Call it before `page.goto`. */
export async function mockPost(page, slug, post) {
  await page.route(isPostRequest(slug), (route) => route.fulfill({ json: [post] }));
}

export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const appOrigin = new URL(baseURL).origin;
    const unmockedApiRequests = [];

    // Playwright checks the newest route first, so this catch-all only handles requests
    // that no mock claims: the map embed and any API call without a fixture.
    await page.route(
      (url) => url.protocol.startsWith('http') && url.origin !== appOrigin,
      (route) => {
        const url = new URL(route.request().url());
        if (url.pathname.includes(API_ROOT)) unmockedApiRequests.push(url.href);
        return route.abort();
      },
    );

    await page.route(isCategoriesRequest, (route) =>
      route.fulfill({ path: fixturePath('categories') }),
    );
    for (const slug of MOCKED_POSTS) {
      await page.route(isPostRequest(slug), (route) =>
        route.fulfill({ path: fixturePath(slug) }),
      );
    }

    await use(page);

    expect(unmockedApiRequests, 'API requests without a mock (add a fixture)').toEqual([]);
  },
});

export { expect };
