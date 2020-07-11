---
title: Big images with Leaflet
date: "2020-07-10"
description: Incorporating big zoomable images into an MDX blog with Leaflet
---

import BigImage from "../../../src/components/BigImage"

__Below is a big image produced by my neural network feature visalisation library [Sumie](https://github.com/justinpinkney/sumie) please zoom in.__

<BigImage 
    options={ {center:[-0.25, 0.35], zoom:10} } 
    tile_url="http://assets.justinpinkney.com/sandbox/sumie1/montage_files/{z}/{x}_{y}.jpg" />

This page is mostly just test out the integration of Leaflet for displaying big images on my Gatsby powered homepage.

## What is MDX actually good for?

I recently moved my website over to MDX as I was tempted by the prospect of adding more interesting and interactive content that is normally in plain old markdown blogs. MDX lets you include react components directly into your markdown syntax documents and render them to a static page with Gatsby. I've wanted to put large zoomable images into some of my posts and this seems like a straightforward way.

## How does this work?

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

Incorporating leaflet into a Gatsby site is happily very simple thanks to the [Gatsby React-Leaflet plugin](https://github.com/dweirich/gatsby-plugin-react-leaflet) which takes care of properly wrapping up the existing React-leaflet library (which itself makes Leaflet accessible as React components). (I started off trying to use OpenSeadragon, but with no existing Gatsby integration it seemed like the harder option.)
