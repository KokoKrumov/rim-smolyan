import { wrapPricesInSpans } from '../wrapPricesInSpans';

const wrap = (inner) => `<span class="price-value">${inner}</span>`;

describe('wrapPricesInSpans', () => {
  it.each([null, undefined, '', 42])('returns %s unchanged', (input) => {
    expect(wrapPricesInSpans(input)).toBe(input);
  });

  it('wraps a euro/lev price at the end of a list item', () => {
    const html = '<ul><li>Възрастни – 4.00 € – 7.82 лв.</li></ul>';

    expect(wrapPricesInSpans(html)).toBe(`<ul><li>Възрастни${wrap(' – 4.00 € – 7.82 лв.')}</li></ul>`);
  });

  it('wraps "безплатно" (free)', () => {
    const html = '<ul><li>Деца до 7 г. – безплатно</li></ul>';

    expect(wrapPricesInSpans(html)).toBe(`<ul><li>Деца до 7 г.${wrap(' – безплатно')}</li></ul>`);
  });

  it('wraps prices introduced with "по"', () => {
    const html = '<ul><li>Групи над 10 души по 2.00 € / 3.91 лв.</li></ul>';

    expect(wrapPricesInSpans(html)).toBe(`<ul><li>Групи над 10 души${wrap(' по 2.00 € / 3.91 лв.')}</li></ul>`);
  });

  it('leaves list items without a price untouched', () => {
    const html = '<ul><li>Входът е свободен всяка последна сряда</li></ul>';

    expect(wrapPricesInSpans(html)).toBe(html);
  });

  it('only wraps leaf list items, not parents of nested lists', () => {
    const html = '<ul><li>Билети – 4.00 € – 7.82 лв.<ul><li>Студенти – 2.00 € – 3.91 лв.</li></ul></li></ul>';

    expect(wrapPricesInSpans(html)).toBe(
      `<ul><li>Билети – 4.00 € – 7.82 лв.<ul><li>Студенти${wrap(' – 2.00 € – 3.91 лв.')}</li></ul></li></ul>`
    );
  });

  it('is idempotent', () => {
    const once = wrapPricesInSpans('<ul><li>Възрастни – 4.00 € – 7.82 лв.</li></ul>');

    expect(wrapPricesInSpans(once)).toBe(once);
  });
});
