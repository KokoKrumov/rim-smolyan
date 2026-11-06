import { featuredImageProps } from '../featuredImageProps';

describe('featuredImageProps', () => {
  it('preserves the original URL when responsive metadata is absent', () => {
    expect(featuredImageProps({ source_url: '/original.jpg' }, '100vw')).toEqual({
      src: '/original.jpg', srcSet: undefined, sizes: undefined, width: undefined, height: undefined,
    });
  });

  it('builds sorted responsive sources without square crops or duplicate widths', () => {
    const media = {
      source_url: '/original.jpg',
      media_details: {
        width: 1200, height: 800,
        sizes: {
          medium: { source_url: '/medium.jpg', width: 300, height: 200 },
          large: { source_url: '/large.jpg', width: 900, height: 600 },
          thumbnail: { source_url: '/square.jpg', width: 150, height: 150 },
          full: { source_url: '/original.jpg', width: 1200, height: 800 },
          invalid: { source_url: '/invalid.jpg' },
        },
      },
    };
    expect(featuredImageProps(media, '(min-width: 768px) 380px, 100vw')).toEqual({
      src: '/original.jpg',
      srcSet: '/medium.jpg 300w, /large.jpg 900w, /original.jpg 1200w',
      sizes: '(min-width: 768px) 380px, 100vw',
      width: 1200, height: 800,
    });
  });
});
