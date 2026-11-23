export function featuredImageProps(media, sizes) {
  const details = media.media_details;
  const ratio = details?.width && details?.height ? details.width / details.height : null;
  const candidates = Object.values(details?.sizes || {})
    .filter(size => size.source_url && size.width && size.height &&
      ratio !== null && Math.abs(size.width / size.height - ratio) < 0.02);
  if (details?.width && details?.height && media.source_url) {
    candidates.push({ source_url: media.source_url, width: details.width, height: details.height });
  }
  const byWidth = new Map(candidates.map(size => [size.width, size.source_url]));
  const srcSet = [...byWidth].sort(([a], [b]) => a - b)
    .map(([width, url]) => `${url} ${width}w`).join(', ');

  return {
    src: media.source_url,
    srcSet: srcSet || undefined,
    sizes: srcSet ? sizes : undefined,
    width: details?.width,
    height: details?.height,
  };
}
