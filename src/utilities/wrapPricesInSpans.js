/**
 * Wraps the price part (e.g. " – 4.00 € – 7.82 лв." or " – безплатно") in leaf <li> nodes
 * with <span class="price-value"> so it can be styled (bold, right-aligned) via CSS.
 */
export function wrapPricesInSpans(html) {
  if (!html || typeof html !== "string") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="prices-wrap">${html}</div>`, "text/html");
  const wrapper = doc.getElementById("prices-wrap");
  if (!wrapper) return html;
  wrapper.querySelectorAll("li").forEach((li) => {
    if (li.querySelector("ul")) return;
    const inner = li.innerHTML;
    if (inner.includes("price-value")) return;
    // Price block must start with " – "/"– "/" по " then digits and € (avoids wrapping description text)
    // Allows: "3.91 лв." (no dash), "5 87 лв." (space in number), " по 4.00 €/на ден", "ден– 2.00 €"
    const priceRegex =
      /((?: – |– |\s+по\s+)(?:по\s*)?\d+[.,]\d{2}\s*(?:&nbsp;)*\s*€[^<]*?[-–\s]\s*(?:по\s*)?\d+[.,\s]\d+\s*лв\.?| – \s*безплатно)\s*(?:&nbsp;)*$/i;
    const newInner = inner.replace(priceRegex, '<span class="price-value">$1</span>');
    if (newInner !== inner) li.innerHTML = newInner;
  });
  return wrapper.innerHTML;
}
