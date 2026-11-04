import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkIfValueExistInIntl,
  decodeHtml,
  escapeHtml,
  extractIdAndCategories,
  getDateDayForArticleCard,
  getDateMonthForArticleCard,
  getDateYearForArticleCard,
  getItemBySlug,
  indexOfCollection,
  isIOS,
  isMobileBrowser,
  isMobileScreen,
  isTabletScreen,
  replaceSlugInPath,
  setCollectionFromMain,
  setNextCollectionFromMain,
  setPrevCollectionFromMain,
  slugSanitize,
  standartTheDate,
} from '../browser';

const setClientWidth = (width: number) => {
  vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(width);
};

const setUserAgent = (ua: string) => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(ua);
};

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const ANDROID_UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const KINDLE_UA = 'Mozilla/5.0 (Linux; U; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.68';

afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
});

describe('screen size helpers', () => {
  it.each([
    [500, true, true],
    [838, true, true],
    [839, false, true],
    [1198, false, true],
    [1199, false, false],
  ])('width %i -> mobile %s, tablet %s', (width, mobile, tablet) => {
    setClientWidth(width);
    expect(isMobileScreen()).toBe(mobile);
    expect(isTabletScreen()).toBe(tablet);
  });
});

describe('user agent helpers', () => {
  it('detects iOS devices', () => {
    setUserAgent(IPHONE_UA);
    expect(isIOS()).toBe(true);

    setUserAgent(ANDROID_UA);
    expect(isIOS()).toBe(false);
  });

  it.each([
    ['iPhone', IPHONE_UA, true],
    ['Android phone', ANDROID_UA, true],
    ['Kindle Silk', KINDLE_UA, true],
    ['desktop Chrome', DESKTOP_UA, false],
  ])('isMobileBrowser for %s is %s', (_name, ua, expected) => {
    setUserAgent(ua);
    expect(isMobileBrowser()).toBe(expected);
  });
});

describe('decodeHtml', () => {
  it('decodes HTML entities', () => {
    expect(decodeHtml('Tom &amp; Jerry &quot;cartoon&quot; &#8211; 1940')).toBe('Tom & Jerry "cartoon" – 1940');
  });

  it('returns an empty string for empty input', () => {
    expect(decodeHtml('')).toBe('');
  });
});

describe('escapeHtml', () => {
  it('escapes each special character', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('<b>')).toBe('&lt;b&gt;');
    expect(escapeHtml('"quoted\'')).toBe('&quot;quoted&#039;');
  });
});

describe('checkIfValueExistInIntl', () => {
  const intl = {
    messages: { 'nav.home': 'Начало' },
    formatMessage: vi.fn(({ id }: { id: string }) => `translated:${id}`),
  };

  it('returns the translation when the key exists', () => {
    expect(checkIfValueExistInIntl('nav.home', intl)).toEqual({ __html: 'translated:nav.home' });
    expect(intl.formatMessage).toHaveBeenCalledWith({ id: 'nav.home' });
  });

  it('falls back to the raw value when there is no translation', () => {
    expect(checkIfValueExistInIntl('some-slug', intl)).toEqual({ __html: 'some-slug' });
  });
});

describe('collection helpers', () => {
  const collections = [
    { collectionsType: 'archeology' },
    { collectionsType: 'history' },
    { collectionsType: 'ethnography' },
  ];

  it('finds a collection and its index by type', () => {
    expect(indexOfCollection(collections, 'history')).toBe(1);
    expect(indexOfCollection(collections, 'missing')).toBe(-1);
    expect(setCollectionFromMain(collections, 'history')).toBe(collections[1]);
    expect(setCollectionFromMain(collections, 'missing')).toBeUndefined();
  });

  it('returns the next collection', () => {
    expect(setNextCollectionFromMain(collections, 'archeology')).toBe(collections[1]);
    expect(setNextCollectionFromMain(collections, 'history')).toBe(collections[2]);
  });

  it('returns the previous collection and wraps from first to last', () => {
    expect(setPrevCollectionFromMain(collections, 'ethnography')).toBe(collections[1]);
    expect(setPrevCollectionFromMain(collections, 'archeology')).toBe(collections[2]);
  });

  it('finds an item by slug', () => {
    const list = [{ slug: 'a' }, { slug: 'b' }];
    expect(getItemBySlug('b', list)).toBe(list[1]);
    expect(getItemBySlug('c', list)).toBeUndefined();
  });
});

describe('date helpers', () => {
  it('parses dd.mm.yyyy and ISO dates to the same day', () => {
    expect(standartTheDate('15.03.2024', false).toISOString()).toBe('2024-03-15T00:00:00.000Z');
    expect(standartTheDate('2024-03-15', true).toISOString()).toBe('2024-03-15T00:00:00.000Z');
  });

  it('extracts day, Bulgarian month name and year', () => {
    expect(getDateDayForArticleCard('05.11.2023')).toBe(5);
    expect(getDateMonthForArticleCard('05.11.2023')).toBe('ноември');
    expect(getDateYearForArticleCard('05.11.2023')).toBe(2023);
  });

  it('supports ISO input', () => {
    expect(getDateDayForArticleCard('2023-11-05', true)).toBe(5);
    expect(getDateMonthForArticleCard('2023-11-05', true)).toBe('ноември');
    expect(getDateYearForArticleCard('2023-11-05', true)).toBe(2023);
  });
});

describe('slug helpers', () => {
  it.each([
    ['/news/my-article', 'my-article'],
    ['/news/my-article/', 'my-article'],
    ['my-article', 'my-article'],
  ])('slugSanitize(%s) -> %s', (input, expected) => {
    expect(slugSanitize(input)).toBe(expected);
  });

  it.each([
    ['/bg/collections/old-slug', 'new-slug', '/bg/collections/new-slug'],
    ['/bg/collections/old-slug///', 'new-slug', '/bg/collections/new-slug'],
  ])('replaceSlugInPath(%s, %s) -> %s', (pathname, slug, expected) => {
    expect(replaceSlugInPath(pathname, slug)).toBe(expected);
  });
});

describe('extractIdAndCategories', () => {
  const categories = [
    { id: 1, name: 'Новини', slug: 'news' },
    { id: 2, name: 'Събития', slug: 'events' },
  ];

  it('returns undefined when props are missing', () => {
    expect(extractIdAndCategories('/bg/news', 'props', undefined, categories)).toBeUndefined();
  });

  it('looks up the slug in the categories passed via props', () => {
    expect(extractIdAndCategories('/bg/events/', 'props', {}, categories)).toEqual({
      slugId: 2,
      slugItemName: 'Събития',
      categories,
      pureSlug: 'events',
    });
  });

  it('reads categories from sessionStorage when listFrom is "storage"', () => {
    sessionStorage.setItem('categories', JSON.stringify(categories));

    expect(extractIdAndCategories('/bg/news', 'storage', {}, null)).toEqual({
      slugId: 1,
      slugItemName: 'Новини',
      categories,
      pureSlug: 'news',
    });
  });

  it('returns undefined ids when the slug is unknown', () => {
    const result = extractIdAndCategories('/bg/unknown', 'props', {}, categories);
    expect(result.slugId).toBeUndefined();
    expect(result.slugItemName).toBeUndefined();
  });
});
