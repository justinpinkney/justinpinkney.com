---
title: Ideas 💡
date: "2020-08-19"
description: A list of ideas I probably wont ever have time to try out.
---

- Use person detection and inpainting to remove all the people from FFHQ. The faces are the most problematic bit of the dataset and the backgrounds are more interesting anyway
- What data augmentation could we apply to internal activations to regularise? (See [[feature-space-input-space]])
- The mapping network in StyleGAN maps Gaussian samples to some new space, how can we find the out of domain samples (i.e. ones that don't ever get mapped to) and see what sort of images they correspond to?
- How could you measure or quantify changes in the Overton window?
- I wish it was easier to find all the tweets of discussion around a particular paper. Is there a way to try and automate this?
- Can you accomplish super-resolution by naive upscaling then using style transfer?
- When fine tuning StyleGAN how do the differences in layer weights from the original to fine-tuned model vary over time? i.e. do certain layers learn faster than others?
- Make a cellular automaton renderer where cell states are represented by frames in a GAN interpolation video
- Train a super-resoluion model on Ukiyo-e high res scans to apply to all the low-res scans from museum websites
- CycleGAN Kiki's Delivery Service city to real version translator
- CycleGAN Lego buildings to real buildings
- Train StyleGAN on a very visually consistant image, e.g. time lapse from Shibuya crossing

## Done

Ideas that I actually tried out!

- Interpolate/swap between layers in fine-tuned StyleGAN pair, extension of layer swapping in [[ukiyoe yourself]] - __See [[StyleGAN Network Blending]]__