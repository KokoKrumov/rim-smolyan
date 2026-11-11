import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialButton from '../socialsButton';

describe('SocialButton', () => {
  let openSpy;

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  it('shares the article title and URL on X in a centered popup', async () => {
    const user = userEvent.setup();
    render(
      <SocialButton
        buttonType="twitter-share__news-and-events"
        articleTitle="Museum news"
        url="https://example.test/news/1"
      />
    );

    await user.click(screen.getByRole('button'));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [shareUrl, , features] = openSpy.mock.calls[0];
    const params = new URL(shareUrl).searchParams;
    expect(params.get('text')).toBe('Museum news');
    expect(params.get('url')).toBe('https://example.test/news/1');
    expect(features).toMatch(/left=\d+/);
    expect(features).toMatch(/top=\d+/);
  });

  it('shares the URL and hashtag on Facebook', async () => {
    const user = userEvent.setup();
    render(
      <SocialButton
        buttonType="facebook-share__share-page"
        url="https://example.test/page"
        hashtag="#museum"
      />
    );

    await user.click(screen.getByRole('button'));

    const params = new URL(openSpy.mock.calls[0][0]).searchParams;
    expect(params.get('u')).toBe('https://example.test/page');
    expect(params.get('hashtag')).toBe('#museum');
  });
});
