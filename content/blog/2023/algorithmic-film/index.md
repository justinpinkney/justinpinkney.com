---
title: Algorithmic Film Making
date: "2023-08-13"
description: Taking an algorithmic film making course and experimenting with video collage
tags: []
cover: "kaguya-grid.jpg"
---

https://youtu.be/rsxUcmHNH9s

I recently signed up to [Derrick Schultz](https://artificial-images.com/)'s online [algorithmic film making class](https://www.bustbright.com/product/algorithmic-filmmaking-async-class-august-7-thru-september-11-2023-/334). I'm excited to be taking one of Derrick's classes, I've been a big fan for a long time of both his work and teaching (not just because [his YouTube channel](https://www.youtube.com/@artificialimages) has long been my default response when people would ask me "How do I StyleGAN?").

I'm also keen to have something I can focus on as an outlet for some ml based art and maybe some open source models and tools. The slow death of Twitter and starting at Midjourney has meant I've not had much motivation or reason to play in the open source creative ml space for a little while now. I also have a 2 TB dataset of movie trailers sitting on my hard drive I want to knead into something interesting.

I don't have any particular ideas for what my final project for the course will be yet, but I've always found the idea of visual collage and montaging videos particularly interesting (as well as the extreme extrapolation of that process: slit scanning).

This is an example of the sort of cut-up montage video that I've been thinking about:

https://twitter.com/Buntworthy/status/1459838418339471364

This originally sprouted from some earlier experiments in collaging images. Here's a link to a thread of some of my experiments and examples from others that convey the sort of aesthetic I like. (One day I'll break them all out from the prison of Twitter into my blog).

https://twitter.com/Buntworthy/status/1443314544252686338

Why this? I'm not, sure something about how it relates to what I do every day: machine learning is all about datasets and seeing the patterns in those. That's what those montages feel like, trying (but not really being able) to convey a sense of the whole as much as any part. (I also spend a lot of my days looking at great big grids of beautiful images. So my eyes end up tuned to the things)

The logical extreme of cutting up images or video and recombining them are also visible in some of the slit scanning and [colour sorting experiments](/blog/2020/colour-sorter/) I've done before.

https://youtu.be/zgxHXQaObFg

Given that I used to everything [related to StyleGAN](/tags/stylegan/), here's a StyleGAN related example, slit scanning through interpolation spaces:

https://twitter.com/Buntworthy/status/1451105403857739776

(There was also an interactive version of this I never published:)

https://twitter.com/Buntworthy/status/1222945471003602944

## Week 1 - Randomising clips

The first week's exercise is to chop up something into shots and randomise the order, just to get a feel with working with video datasets and to see what interesting things turns up. I didn't want to face battling with my big dataset just yet, so I cut up The Tale of Princess Kaguya into shots and arranged them in a grid. The grid view fits my aesthetic sensibilities and also means that I can actually watch the entire resulting clip in a reasonable amount of time.

I made two versions, one with a totally random order, and the other where the clips are sorted by order of occurence, but the new clips are placed in the grid as soon as any previous one finishes, so the whole thing ends up going slowly out of sync as time progresses, which I think is a nice effect. The sorted version is [at the top of this page](#skip) and the randomised one below:

https://youtu.be/Lyg16nGbUtM