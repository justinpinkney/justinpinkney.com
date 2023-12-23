---
title: Side notes and a Gallery
date: "2023-12-11"
description: Small notes on adding sidenotes and a Gallery page to my site
tags: ["website"]
cover: "crt_gardener.jpg"
---

{% blogImage "crt_gardener.jpg", "A man tending his garden of crt" %}

## Sidenotes

I just added side notes to my blog, thanks to my move to [11ty](https://www.11ty.dev/) (from the bloated mess that was Gatsby) and the wonderful sites and articles people have shared on the small web (as well as the power of `view source`) it's been easy and a pleasure!

I always want to add margin/side/foot notes to my posts, it's probably a sign of a bad excessively detail oriented writing style. Because scrolling up and down is bad, as is hovering, side notes are probably the best solution, the main tricky bit is figuring out what to do on mobile.

Here's some nice sites I looked at for inspiration.

- [every layout was useful for making a sidebar](https://every-layout.dev/layouts/sidebar/)
- [useful review of methods](https://gwern.net/sidenote#tufte-css)
- [a nice implemention](https://danilafe.com/blog/sidenotes/)
- [a nice example of side notes](https://omar.website/posts/against-recognition/)

In the end I went for a tap to hide/show the side notes on mobile/narrow screens. And a little visual wiggle on hover on desktop to make clear what the side note number corresponds to.

<p align="center">
<video controls src="sidenote.mp4" loop="true"></video>
</p>

## Gallery page

I also added a little Gallery page of all the images on my site, given this is a pretty image focussed blog it's nice to have them all in one place.

A [helpful comment](https://github.com/11ty/eleventy/issues/440) in a GitHub issue pointed me in the right direction to find all the relevant images in my site and then iterate over them to display in a single page (which you can [see here](/gallery)).

I still have a few outstanding things I'd like to improve:

- Better layout of the images (hopefully still sticking to plain old css and html if possible)
- Links back from the images to the blog post where they appear (this is a bit tricky as sometimes I organise the images in subdirectories)

Now the css is a bit messy and funky in various cases, but that's the fun of of having a website of your own to play with!

{% blogImage "gallery.jpg", "gallery page" %}