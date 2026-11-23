const imageBase = "https://static.museumsmolyan.eu/collections/images/";

// Category descriptions contain URLs only; keep intrinsic sizes for these static assets.
const previewSizes = {
  [`${imageBase}main/archeology.png`]: [330, 497],
  [`${imageBase}main/dicho-petrov.png`]: [330, 464],
  [`${imageBase}main/ethnography-and-ritual-props.png`]: [330, 291],
  [`${imageBase}main/art.png`]: [330, 216],
  [`${imageBase}main/history-of-bulgaria-xv-xix.png`]: [330, 530],
  [`${imageBase}main/kiril-madzharov.png`]: [330, 486],
  [`${imageBase}laszlo-nagy.png`]: [330, 380],
  [`${imageBase}main/recent-history-of-bulgaria.png`]: [330, 409],
  [`${imageBase}main/new-history-of-bulgaria.png`]: [330, 510],
  [`${imageBase}main/numismatics.png`]: [330, 371],
  [`${imageBase}main/col-raycho-peev-harbaliev.png`]: [330, 461],
  [`${imageBase}main/weapon.png`]: [330, 421],
  [`${imageBase}main/folklore.png`]: [330, 641],
  [`${imageBase}virtual/ship-shaped-fibulae.png`]: [240, 207],
  [`${imageBase}virtual/anastas-ivanov-bai-taso.png`]: [240, 161],
  [`${imageBase}virtual/ancient-glass-iv-vi.png`]: [240, 186],
  [`${imageBase}virtual/bulgarian-women-awards.png`]: [240, 246],
  [`${imageBase}virtual/art-inspired-by-myths-and-legends.png`]: [240, 388],
  [`${imageBase}virtual/copper-bowls.png`]: [240, 261],
  [`${imageBase}virtual/local-emblems-and-coats-of-arms.png`]: [240, 314],
  [`${imageBase}virtual/mladen-koynarov.png`]: [240, 195],
  [`${imageBase}virtual/monarchical-orders-in-the-nulgarian-reward-system.png`]: [240, 276],
  [`${imageBase}virtual/coins-of-the-macedonian-kings-and-cities-iv-i.png`]: [240, 261],
  [`${imageBase}virtual/coins-of-thracian-cities-tribes-and-kings-v-i.png`]: [240, 231],
  [`${imageBase}virtual/jewelry-and-ornaments.png`]: [240, 294],
  [`${imageBase}virtual/awards-and-diplomas-of-col-vladimir-serafimov.png`]: [240, 318],
  [`${imageBase}virtual/scientific-archive-drawings.png`]: [240, 160],
  [`${imageBase}virtual/olympic.png`]: [240, 262],
  [`${imageBase}virtual/weapon.png`]: [240, 137],
  [`${imageBase}virtual/shepherds-carving.png`]: [240, 229],
  [`${imageBase}virtual/relics-from-the-ilinden-preobrazhensko-uprising.png`]: [240, 321],
  [`${imageBase}virtual/relics-of-the-first-world-war.png`]: [240, 276],
  [`${imageBase}virtual/roman-imperial-coins.png`]: [240, 241],
  [`${imageBase}virtual/roman-provincial-coins.png`]: [240, 252],
  [`${imageBase}virtual/roman-republican-coins.png`]: [240, 277],
  [`${imageBase}virtual/revival-architecture-and-art.png`]: [240, 337],
  [`${imageBase}virtual/rhodope-carpets.png`]: [240, 273],
  [`${imageBase}virtual/medieval-jewelry-earrings-x-xiv.png`]: [240, 261],
  [`${imageBase}virtual/watches.png`]: [240, 273],
  "/images/no-image.png": [1920, 1080],
};

export function collectionPreviewImageProps(src) {
  const [width, height] = previewSizes[src] || [];
  return { src, width, height };
}
