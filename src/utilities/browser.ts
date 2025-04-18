const variables = require("../styles/variables");

export function isMobileScreen(): boolean {
  return (
    window.document.documentElement.clientWidth <
    variables["--mobile-max-width"]
  );
}

export function isTabletScreen(): boolean {
  return (
    window.document.documentElement.clientWidth <
    variables["--tablet-max-width"]
  );
}

/**
 * Checks if it's iOS device
 */
export function isIOS(): boolean {
  let iOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  return iOS;
}

/**
 * Checks if it's a mobile browser
 */

/* tslint:disable:no-magic-numbers */
export function isMobileBrowser(): boolean {
  var check = false;
  // tslint:disable-next-line:max-line-length
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  //Add Kindle detection (Silk browser)
  if (!check && /\bSilk\b/.test(navigator.userAgent)) {
    check = true;
  }
  return check;
}

/**
 * Decodes HTML string
 * i.e. - replaces &amp; -> &, &quot; -> '
 * @param html String
 */
export function decodeHtml(html: string) {
  var e = document.createElement("textarea");
  e.innerHTML = html;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

/**
 * Returns HTML-safe string.
 * replaces HTML special chars with named char references
 * @param unsafeHtml String
 */
export function escapeHtml(unsafeHtml: string) {
  return unsafeHtml
    .replace("&", "&amp;")
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace('"', "&quot;")
    .replace("'", "&#039;");
}

export function checkIfValueExistInIntl(val: any, intl: any) {
  if (!!intl.messages[`${val}`]) {
    //if there is key:value in the translations
    return { __html: intl.formatMessage({ id: val }) };
  } else {
    // if there isn't values in the translations then the default state is the given value
    // probably will return the raw key, slug, etc.
    return { __html: val };
  }
}

export function indexOfCollection(collections: any, type: string) {
  return collections.findIndex(
    (el: { collectionsType: string }) => el.collectionsType === type
  );
}

export function setCollectionFromMain(collections: any, type: string) {
  return collections.find(
    (el: { collectionsType: string }) => el.collectionsType === type
  );
}

export function setNextCollectionFromMain(collections: any, type: string) {
  //IF CURRENT COLLECTION IS LAST
  if (indexOfCollection(collections, type) === collections.length - 1) {
    //THEN SET NEXT ITEM TO BE THE FIRST ITEM OF THE MAIN COLLECTION
    return collections[indexOfCollection(collections, type) + 1];
  } else {
    return collections[indexOfCollection(collections, type) + 1];
  }
}

export function setPrevCollectionFromMain(collections: any, type: string) {
  //IF CURRENT COLLECTION IS FIRST
  if (indexOfCollection(collections, type) === 0) {
    //THEN SET PREV ITEM TO BE THE LAST ITEM OF THE MAIN COLLECTION
    return collections[collections.length - 1];
  } else {
    return collections[indexOfCollection(collections, type) - 1];
  }
}

export function getItemBySlug(slug: any, list: any) {
  return list.find((item: { slug: string }) => item.slug === slug);
}

export function standartTheDate(date: string, isISO: boolean) {
  if (isISO) {
    return new Date(date);
  } else {
    const arrFromDate = date.split(".");
    const day = arrFromDate[0];
    const month = arrFromDate[1];
    const year = arrFromDate[2];
    const ISODate = `${year}-${month}-${day}`;
    return new Date(ISODate);
  }
}

// const longMonthFormatter = new Intl.DateTimeFormat('en-US', {
const longMonthFormatter = new Intl.DateTimeFormat("bg-BG", {
  month: "long",
});

export function getDateDayForArticleCard(date: string, isISO = false) {
  const day = standartTheDate(date, isISO).getDate();
  return day;
}

export function getDateYearForArticleCard(date: string, isISO = false) {
  const year = standartTheDate(date, isISO).getFullYear();
  return year;
}

export function getDateMonthForArticleCard(date: string, isISO = false) {
  // const month = standartTheDate(date).getMonth();
  const month = longMonthFormatter.format(standartTheDate(date, isISO));
  return month;
}

export function slugSanitize(string: string) {
  const paramsInURl = string.split("/");
  const lastParam = paramsInURl.pop() || paramsInURl.pop();
  return lastParam;
}

export function extractIdAndCategories(
  slug: string,
  listFrom: string,
  props: any,
  propsCategories: any
): any {
  if (props) {
    let categories, slugItem, slugId, slugItemName, pureSlug, removeChar, regex;
    pureSlug = slugSanitize(slug);
    if (listFrom === "storage") {
      const categoriesFromStorage = sessionStorage.getItem("categories");
      categories = JSON.parse(categoriesFromStorage || "{}");
    } else {
      categories = propsCategories;
    }
    slugItem = getItemBySlug(pureSlug, categories);
    slugId = slugItem && slugItem.id;
    slugItemName = slugItem && slugItem.name;
    return { slugId, slugItemName, categories, pureSlug };
  }
}
