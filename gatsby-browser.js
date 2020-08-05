// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"
import "./src/styles/global.css"

import littlefoot from 'littlefoot'
require("littlefoot/dist/littlefoot.css");

const template = `<button
aria-expanded="false"
aria-label="Footnote <% number %>"
class="littlefoot-footnote__button"
id="<% reference %>"
title="See Footnote <% number %>"
/>
<% number %>
</button>`

export function onRouteUpdate() {
  littlefoot({'buttonTemplate': template})
  Array.prototype.forEach.call(document.querySelectorAll('.footnotes.footnote-print-only, .footnotes .footnote-print-only'), e => e.classList.remove('footnote-print-only'))
Array.prototype.forEach.call(document.querySelectorAll('.footnote-backref'), (el) => { el.href = el.href.replace('#', '#lf-') })
}


