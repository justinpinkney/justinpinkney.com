---
title: Awesome Pretrained StyleGAN
date: "2020-07-03"
description: A repository of pre-trained models for StyleGAN 1 and 2
cover: pretrained.jpg
---

I maintain two collections of links to StyleGAN models pre-trained on a variety of datasets:

- [Awesome Pretrained StyleGAN](https://github.com/justinpinkney/awesome-pretrained-stylegan)
- [Awesome Pretrained StyleGAN 2](https://github.com/justinpinkney/awesome-pretrained-stylegan2)

Most of these have been shared via the very active StyleGAN creative community on twitter, and if you're aware of any others then please send them my way. Either create an issue or fill out one of the following forms:

<p align="center">
<video controls src="tiled.mp4" loop="true"></video>
</p>


## Pretrained models are useful for lots of things

### Speed up model training with transfer learning

Apart from just generating some example image of whatever the model was trained on, pre-trained models are a super useful for training your own model using transfer learning.

If you want to train a model which is similar to an existing one, for example [[ukiyoe-yourself:Ukiyo-e faces]] then taking a pre-trained model as your starting point to get you some decent results within just a few hours rather than days of training time.

![](../ukiyoe-yourself/fakes000312.jpg)

### Get weird results with intermediate models and mixing

Transfer learning (aka fine-tuning) also sometimes gives you some pretty interesting results just as the model starts to transform the generated images from the original objects to the new thing you're training for. See a couple of nice examples below.

<Tweet tweetLink="Norod78/status/1255200236181630979" />
<Tweet tweetLink="mmariansky/status/1226756838613491713" />

In fact you can go further and combine two models, one which has been fine-tuned from another and either do weight averaging or [[ukiyoe-yourself:layer swapping]] to effectively mix the outputs.

![](../ukiyoe-yourself/montage.jpg)

### Do experiments and investigate the properties of a latent space

Pre-trained models can also be useful if you want to investigate the properties of specific modifications and manipulations of a trained GAN. In fact my Awesome StyleGAN made and appearance in the excellent [GANSpace](https://github.com/harskish/ganspace) [paper](https://arxiv.org/abs/2004.02546).

A well trained model is also useful if you just want to [[matlab-stylegan:  mess around with the internals of StyleGAN]],

## Maybe transfer learning will become the standard way to train a GAN

Transfer learning is currently a very active area of research in the world of GANs, in particular there have been a bunch of publications recently looking at methods for preventing the discriminator from over-fitting when you only have a small dataset. These would seem to make it possible to get very good results using a pre-trained model and only a small amount of data.

## Contribute!

If you have a StyleGAN model you'd like to share I'd love it if you contribute to the appropriate repository. In particular I see lots of users of RunwayML sharing links to their models on Runway, but not sharing the .pkl files, please set those models free!

- [Awesome Pretrained StyleGAN](https://github.com/justinpinkney/awesome-pretrained-stylegan)
- [Awesome Pretrained StyleGAN 2](https://github.com/justinpinkney/awesome-pretrained-stylegan2)

![](pretrained.jpg)