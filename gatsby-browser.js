// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"
import "./src/styles/global.css"

import littlefoot from 'littlefoot'
import 'littlefoot/dist/littlefoot.css'

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
}


