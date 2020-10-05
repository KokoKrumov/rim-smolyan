const fonts = {
  '--noto': '"Noto Sans", HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif',
  '--poppins': 'Poppins, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif',
  '--merriweather': 'Merriweather, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, serif'
}

const fontSizes = {
  '--font-size-page-title': '2.6rem',
  '--font-size-breadcrumb': '1.3rem',
  '--font-size-default': '1.8rem'
}

const baseColors = {
  '--pp-green': '#81b32e',
  '--pp-light-green': 'rgba(129, 179,46, .8)',
  '--pp-lighter-green': 'rgba(129, 179,46, .4)',
  '--pp-primary': '#383838',
  '--pp-purple-light': '#9d8da5',
  '--pp-accent': '#6699cc',
  '--color-main-background': '#f9f9f9',
  '--text-default': '#000000',
  '--text-on-primary': '#ffffff',
  '--text-on-accent': '#ffffff',
  '--text-on-reverse': '#ffffff',
  '--light-gray': '#cdcdcd',
  '--dark-gray': '#666',
  '--gray': '#999',
  '--lighter-gray': '#ddd',
  '--lightest-gray': '#eee',
  '--color-utility': '#48b0e1',
  '--star-rating-active': '#eac41f',
  '--star-rating-inactive': '#808080',
  '--pp-purple': '#8f5ba6',
  '--pp-purple-background': '#f8f5f9',
  '--alert-red-light': 'rgba(255, 118, 118, .8)',
  '--alert-red': '#ff7676',
  '--alert-dark-red': '#fa5656',
  '--pp-orange': '#ef7408',
  '--hit-highlight': '#bbbb2a',
}

// Colors for utilities such as text
const colorUtilities = {
  '--pp-white': 'rgba(255, 255, 255, 1)',
  '--pp-white-90': 'rgba(255, 255, 255, .9)',
  '--pp-white-70': 'rgba(255, 255, 255, .7)',
  '--pp-white-50': 'rgba(255, 255, 255, .5)',
  '--pp-white-38': 'rgba(255, 255, 255, .38)',
  '--pp-white-12': 'rgba(255, 255, 255, .12)',

  '--pp-black': 'rgba(0, 0, 0, 1)',
  '--pp-black-87': 'rgba(0, 0, 0, .87)',
  '--pp-black-54': 'rgba(0, 0, 0, .54)',
  '--pp-black-38': 'rgba(0, 0, 0, .38)',
  '--pp-black-12': 'rgba(0, 0, 0, .12)',
}

// Colors determined by vendors
const vendorColors = {
  '--facebook-blue': '#3b5998',
  '--linkedin-blue': '#0077b5',
  '--twitter-blue': '#1da1f2',
  '--instagram-blue': '#125688',
  '--pinterest-red': '#bd081c',
  '--reddit-red': '#ff4500',
  '--googleplus-red': '#dd4b39',
  '--rss-orange': '#f58a44',
  '--facebook-blue-hover': '#4f69a1',
}

const aliasedColors = {
  '--ash-gray': baseColors['--color-main-background'],
}

// When does a size break?
const breakpoints = {
  '--layout-breakpoint-xxs': 480,
  '--layout-breakpoint-xs': 600,
  '--layout-breakpoint-sm': 840,
  '--layout-breakpoint-md': 960,
  '--layout-breakpoint-lg': 1280,
  '--layout-breakpoint-xl': 1440,
  '--layout-breakpoint-xxl': 1600,
  '--layout-breakpoint-xxxl': 1920,
}

// Media helpers
const mediaHelpers = {
  '--media-xxs-max-width': `${breakpoints['--layout-breakpoint-xxs'] - 1}px`,
  '--media-xs-max-width': `${breakpoints['--layout-breakpoint-xs'] - 1}px`,
  '--media-sm-max-width': `${breakpoints['--layout-breakpoint-sm'] - 1}px`,
  '--media-md-max-width': `${breakpoints['--layout-breakpoint-md'] - 1}px`,
  '--media-lg-max-width': `${breakpoints['--layout-breakpoint-lg'] - 1}px`,
  '--media-xl-max-width': `${breakpoints['--layout-breakpoint-xl'] - 1}px`,
  '--media-xxl-max-width': `${breakpoints['--layout-breakpoint-xxl'] - 1}px`,
  '--media-xxxl-max-width': `${breakpoints['--layout-breakpoint-xxxl'] - 1}px`,
  '--mobile-max-width': breakpoints['--layout-breakpoint-sm'] - 1,
  '--media-sm-min-width': `${breakpoints['--layout-breakpoint-xs']}px`,
  '--media-md-min-width': `${breakpoints['--layout-breakpoint-sm']}px`,
  '--media-lg-min-width': `${breakpoints['--layout-breakpoint-md']}px`,
  '--media-xl-min-width': `${breakpoints['--layout-breakpoint-lg']}px`,
  '--media-xxl-min-width': `${breakpoints['--layout-breakpoint-xl']}px`,
  '--media-xxxl-min-width': `${breakpoints['--layout-breakpoint-xxl']}px`,
}

const animation = {
  '--transition-standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  '--transition-decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  '--transition-accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',
  '--transition-duration-complex': 375,
  '--transition-duration-enter': 225,
  '--transition-duration-simple': 210,
  '--transition-duration-leave': 195,
  '--transition-duration-multiplier': 1.3,
}

const misc = {
  '--transition-standard': 'cubic-bezier(.4, 0, .2, 1)',
  '--square-card-default-size': '264px',
  '--square-card-size-small': '232px',
  '--circle-card-default-size': '135px',
  '--card-image-max-height': '470px',
  '--card-hover-scale': 'scale(1.25)',
  '--card-shadow-elevate': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  '--card-shadow-default': '0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)',
  '--page-width': '1400px',
  '--profiles-panel-width': '848px',
  '--side-panel-width': '412px'
}

const zIndices = {
  '--z-index-header': 201,
  '--z-index-raised-card': 4,
  '--z-index-loading-amination-overlay': 10,
  '--z-index-snackbar': 1303,
  '--z-index-search': 210,
  '--z-index-modal': 211,
  '--z-index-tooltip': 303
}

module.exports = Object.assign(
  {},
  fonts,
  fontSizes,
  baseColors,
  aliasedColors,
  mediaHelpers,
  breakpoints,
  vendorColors,
  colorUtilities,
  animation,
  misc,
  zIndices,
)
