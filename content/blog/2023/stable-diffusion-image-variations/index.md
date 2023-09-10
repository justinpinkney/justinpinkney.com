---
title: Stable Diffusion Image Variations
date: "2023-08-27"
description: A recap on how and why I trained an 'image variation' version of Stable Diffusion
tags: []
cover: "im-vars-banner.jpeg"
---

<script type="module">
import PhotoSwipeLightbox from '/photoswipe/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--getting-started',
  children: 'a',
  pswpModule: () => import('/photoswipe/photoswipe.esm.js')
});
lightbox.init();
</script>
<link rel="stylesheet" href="/photoswipe/photoswipe.css">

{% css %}
.flex-container {
    display: flex;
    flex-wrap: wrap;
}
.flex-container picture {
    width: 50%;
    height: auto;
    padding: 0.1em;
}

.flex-container a {
    flex: 1;
    padding: 0.1em;
}
{% endcss %}
{%set sizes = [200,320,500,800,1024, auto]%}
{%set widths = "(max-width:640px) 25vw, 320px"%}

<link rel="stylesheet" href="/photoswipe/photoswipe.css">
{% blogImage "im-vars-banner.jpeg", "Girl with a pearl earring and image variations" %}

This post is time-travelling a little. For some reason I never blogged about the image variations stable diffusion model I trained, so this is a bit of a recap on the how and why of the image variation model and to collect some links and experiments using it. The model itself is a little old now and there are other models which are similar might be better like [Karlo v1.0](https://github.com/kakaobrain/karlo) and [Kandinsky](https://github.com/ai-forever/Kandinsky-2) (probably not the [Stable Unclip](https://github.com/Stability-AI/stablediffusion/blob/main/doc/UNCLIP.MD) though{% sidenote 0, "For some reason the Stable Unclip is actually terrible quality. This is an example of the output when using my typical Ghibli house image for testing (hint it's really bad) <img src='https://pbs.twimg.com/media/FstN1GJWIAEVprZ?format=jpg&name=medium'>" %}.). But on [my drive to try and own my content](/blog/2023/the-other-web) and make sure it exists beyond walled gardens like Twitter, here's a post mostly cobbled together from other sources.

As soon as the original stable diffusion was released I wanted to see how I could tweak the model beyond [regular fine tuning](/blog/2023/pokemon-generator). The image variations shown in the original dalle2 paper were always really compelling and this model presented the first chance to actually reproduce those (without lots of training resources). The key part would be to somehow pass images encoded as clip embeddings to the model rather than text embeddings.


{% blogImage "schematic-sd-small.png", "schematic of stable diffusion" %}

<div class="caption">
Schematic of how the normal Stable Diffusion uses a set of token embeddings from the CLIP text encoder to condition the diffusion model.
</div>


Originally I mis-understood the architecture of stable diffusion and assumed that it took the final clip shared latent space text embedding and thought I might just be able to swap this out for an image embedding, but actually stable diffusion takes the full sequence of pooler and token embeddings, so I couldn't simply swap them out{% sidenote 1, "I did do some experiments trying to generate these word embeddings from image embeddings but they never panned out" %}.

So instead I decided to swap out the conditioning altogether and fine tune the model to accept projected image embeddings from clip. So instead of using the text encoder to make a set of (batch_size,77,768) dimension CLIP word embeddings, I used the image encoder (plus final projection) to produce a (batch_size,1,768) size image embedding. Because this is just a shorter sequence it's easy to plumb into the existing cross-attention layers.


{% blogImage "schematic-imvar.png", "schematic of stable diffusion image variations" %}
<div class="caption">
Schematic of Image Variation model showing the replacement of the CLIP text encoder with the CLIP image encoder, conditioning on a single image embedding.
</div>

With some simple tweaking of the original training repo I could finetune the model to accept the new conditioning, there are more details on the training in the [model card](https://huggingface.co/lambdalabs/sd-image-variations-diffusers), but here's a quick summary{% sidenote 2, "This is actually the training procedure of the v2 model which was trained for longer and more carefully, giving better results" %}:

- Fine-tuned from the Stable Diffusion v1-4 checkpoint
- Trained on LAION improved aesthetics 6plus.
- Trained on 8 x A100-40GB GPUs
- Stage 1 - Fine tune only CrossAttention layer weights
    - Steps: 46,000
    - Batch: batch size=4, GPUs=8, Gradient Accumulations=4. Total batch size=128
    - Learning rate: warmup to 1e-5 for 10,000 steps and then kept constant, AdamW optimiser
- Stage 2 - Fine tune the whole Unet
    - Steps: 50,000
    - Batch: batch size=4, GPUs=8, Gradient Accumulations=5. Total batch size=160
    - Learning rate: warmup to 1e-5 for 5,000 steps and then kept constant, AdamW optimiser

## Results

The very first results I saw during after letting run for a decent amount of time looked like this:




<div class="pswp-gallery" id="gallery--getting-started">
    <div class="flex-container">
        <a href="first-training/training_1.jpg"
            data-pswp-width="2060"
            data-pswp-height="1036"
            target="_blank"
            >
            <img src="first-training/training_1.jpg" alt="" >
        </a>
        <a href="first-training/training_2.jpg"
            data-pswp-width="2060"
            data-pswp-height="1036"
            target="_blank"
            >
            <img src="first-training/training_2.jpg" alt="" >
        </a>
    </div>
</div>


<div class="caption">
The top row is the conditioning images, and the bottom row are generations from the model. They look "similar", that means it was working!
</div>

The first batch of results I shared on Twitter showed the classic image variations for some famous images (see if you can guess which ones):

<div class="flex-container">
{% image "v1-results/v1_00001.jpg", "", sizes, widths %}
{% image "v1-results/v1_00002.jpg", "", sizes, widths %}
{% image "v1-results/v1_00003.jpg", "", sizes, widths %}
{% image "v1-results/v1_00004.jpg", "", sizes, widths %}
</div>

## Version 2

{% blogImage "v2.jpg", "image variation examples" %}

After retraining the model a little more carefully{% sidenote 3, "For v2 I fine tuned only the cross attention weights initially to try and help the model to better adapt to the new conditioning without degrading its performance, then followed that up with a full fine tune at a large batch size. Maybe if I were doing it now I might trying using LoRA." %}, for longer, and with a bigger batch size, I released a V2 model which gave substantially better results.

Here are some side by side examples of the improved quality of the v2 model, showing the improved fidelity and coherence of the v2 images.

<div class="pswp-gallery" id="gallery--getting-started">
    <div class="flex-container">
        <a href="compare-v2.jpg"
            data-pswp-width="1024"
            data-pswp-height="1546"
            target="_blank"
            >
            <img src="compare-v2.jpg" alt="" >
        </a>
        <a href="compare-v1.jpg"
            data-pswp-width="1024"
            data-pswp-height="1546"
            target="_blank"
            >
            <img src="compare-v1.jpg" alt="" >
        </a>
    </div>
</div>
<div class="caption">
Comparison of v2 (left) against v1 (right) conditioned on various images, one per row{% sidenote 4, "Original images: <img src='compare-orig.jpg'>" %}.
</div>

### Quirks (a.k.a the problem is always image resizing)

One thing that really baffled me for a long time, was that in the huggingface diffusers port I would get much worse quality images which were always slightly blurred. After scouring the code for what might be the problem it turned out to be the __same problem it always is in image processing__ code, the resizing method. Seriously, if you have an image processing issue, check your image resizing first!

Turns out I accidentally trained the model with `antialias=False` during resize. So when the huggingface diffusers pipeline applied the "proper" behaviour, i.e. using anti-aliasing, the results were terrible, seems like the model is _very_ sensitive to the resize method used.


<div class="pswp-gallery" id="gallery--getting-started">
        <a href="v2-goodresize.jpg"
            data-pswp-width="2048"
            data-pswp-height="512"
            target="_blank"
            >
            <img src="v2-goodresize.jpg" alt="" >
        </a>
        <a href="v2-badresize.jpg"
            data-pswp-width="2048"
            data-pswp-height="512"
            target="_blank"
            >
            <img src="v2-badresize.jpg" alt="" >
        </a>
</div>
<div class="caption">
Running the model with the resize method it was trained on (first) vs a slightly different one (second) gives a dramatic difference to the results{% sidenote 5, "The input image for this is my typical Ghibli House test: <img src='/blog/2022/image-variation-experiments/output_6_0.jpg'>" %}.
</div>

The other thing I noticed is that my nice example at the top of this post (Girl with a Pearl Earing by Vermeer) didn't produce pleasant variations as before, but now was badly overfit. It's actually a sign of how badly undertrained the first model was, as that particular image occurs many many times in the training data (see [these search results](https://rom1504.github.io/clip-retrieval/?back=https%3A%2F%2Fknn.laion.ai&index=laion5B-H-14&useMclip=false&imageUrl=http%3A%2F%2Fmail.100besteverything.com%2F100beimages%2Fartists%2F2124_johannesvermeer1.jpg)).

{% blogImage "overfit.jpg", "Overfit girl with pearl earring generations" %}

## Follow ups

Hopefully the model has been somewhat useful for people, it also showed how adaptable Stable Diffusion is to changing the conditioning, something I've done a bunch of further experiments on. Some of these I've already blogged about: doing [CLIP latent space editing](/blog/2022/clip-latent-space) and [various other experiments](/blog/2022/image-variation-experiments).

It was a [very popular Huggingface Space](https://huggingface.co/spaces/lambdalabs/stable-diffusion-image-variations), and if you want to try the model yourself, it's probably the easiest way.

It also made an appearance in the paper _Versatile Diffusion: Text, Images and Variations All in One Diffusion Model_ ([arxiv](https://arxiv.org/abs/2211.08332)). Unfortunately they had done the work before I'd released the v2 model.

{% blogImage "paper.jpg", "Examples of image variation in academic paper" %}


And the concept was also the basis for my [Image Mixer model](https://huggingface.co/lambdalabs/image-mixer) (which I'll write up in more detail in future).

It's also possible to use this model as a full on text to image generator by using an existing CLIP text embedding to image embedding prior. I did a [little experiment with the LAION prior](https://github.com/justinpinkney/stable-diffusion/blob/main/examples/prior_2_sd.ipynb) to show this was possible, but since then the [Karlo v1.0](https://github.com/kakaobrain/karlo) and [Kandinsky](https://github.com/ai-forever/Kandinsky-2) priors have come out which are probably much better.

Finally if you want to watch a whole talk my me on this and related topics, I gave one at the Hugging Face Diffusers event:

https://youtu.be/mpMGwQa7J1w?si=ilfxsLlQlquIZmB9