---
title: Big images with Leaflet 🗺️
date: "2020-07-13"
description: Incorporating big zoomable images into an MDX blog with Leaflet
cover: leaflet.jpg  
---

import BigImage from "../../../src/components/BigImage"

__Below is a big image produced by my neural network feature visalisation library [Sumie](https://github.com/justinpinkney/sumie) please zoom in.__

<BigImage 
    options={ {center:[-0.25, 0.35], zoom:10, minZoom:9, maxZoom:14 } } 
    tile_url="http://assets.justinpinkney.com/sandbox/montage/montage_files/{z}/{x}_{y}.jpg" />

<br />

This page is mostly just a test of the integration of Leaflet for displaying big images on my Gatsby powered homepage. Below are some brief scratchings on how this works so I don't forget.

## What is MDX actually good for?

I recently moved my website over to MDX as I was tempted by the prospect of adding more interesting and interactive content that is normally in plain old markdown blogs. MDX lets you include react components directly into your markdown syntax documents and render them to a static page with Gatsby. I've wanted to put large zoomable images into some of my posts and this seems like a straightforward way.

## Make tiles from a big image

Some of my generative art or visualisation algorithms make images in the range of a few hundred megapixels, displaying these over the web takes a little care. The first step in translating a single giant image into a interactive zoomable is to slice it up into a bunch of tiles at different resolutions. [This Python repo](https://github.com/openzoom/deepzoom.py) provides all you need for this step.

```Python
import deepzoom

creator = deepzoom.ImageCreator(
    tile_size=256,
    tile_overlap=0,
    tile_format="jpg",
    image_quality=0.8,
    resize_filter="bicubic",
)

creator.create("input.tiff", "output/zoomable.dzi")
```

Some code like the above will convert a large tiff file into a folder containing subdirectories with many tiles at different resolutions, which I can then upload to my web host.

## Display with leaflet

Leaflet then provides a pan and zoomable display of the image. Leaflet is normally used for displaying maps, but is simple to adapt it to using the tiles generated above by specifying the correctly formatted url, and [setting the co-ordinate reference system to "simple"](https://leafletjs.com/examples/crs-simple/crs-simple.html), i.e. a plain grid.

_One small issue with the above is that Leaflet doesn't like fractional tiles so there are currently some weird edge effects which I could solve by making sure I pad all the tiles to the full dimensions._

Incorporating leaflet into a Gatsby site is happily very simple[^1] thanks to the [Gatsby React-Leaflet plugin](https://github.com/dweirich/gatsby-plugin-react-leaflet) which takes care of properly wrapping up the existing React-leaflet library (which itself makes Leaflet accessible as React components). Writing the r[eact component required to display the image](https://github.com/justinpinkney/justinpinkney.com/blob/master/src/components/BigImage.js) is very straightforward and then I can directly write the following in my markdown file to give the zoomable image at the top of the page.

```markdown
<BigImage 
    options={ {center:[-0.25, 0.35], zoom:10, minZoom:9, maxZoom:14 } } 
    tile_url="http://assets.justinpinkney.com/sandbox/montage/montage_files/{z}/{x}_{y}.jpg" />
```

One simple gotcha is highlighted on [gatsby-plugin-react-leaflet's readme](https://github.com/dweirich/gatsby-plugin-react-leaflet#step-3). Make sure any usage of leaflet or react-leaflet are wrapped in a check that the window is defined. During build time the plugin will [stub out the leaflet loader](https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules) so any imports will return an undefined, and if you try and use these during build time (rather than run time, which is what the window check above ensures) you are likely to get x is undefined type errors.

[^1]:  I actually started off trying to use [OpenSeadragon](https://openseadragon.github.io/) which has a much smoother pan and zoom action, but with no existing Gatsby integration it seemed like the harder option to start with.