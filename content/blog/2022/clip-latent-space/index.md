---
title: Latent editing with image variations
date: "2022-10-31"
description: Exploring the latent space of CLIP with Image variations
cover: /media/cover01.jpg
tags: ["clip", "diffusion"]
---

{% css %}
.flex-container {
    display: flex;
    flex-wrap: wrap;
}
.flex-container img {
    width: 50%;
    height: auto;
    padding: 0.1em;
}
{% endcss %}

Playing with the variations model a bit more. You can take the CLIP image embedding of an image then do latent editing with a direction in CLIP text space.

1. original
2. variation
3. "colour oil painting" \- "bw photo"
4. "modern dslr photo" \- "old bw photo"

<div class="flex-container">
{%set sizes = [200,320,500,800,1024, auto]%}
{%set widths = "(max-width:640px) 25vw, 320px"%}

{% image "media/1587181111003815936-FgbMR7AWQAElgik.png", "", sizes, widths %}
{% image "media/1587181111003815936-FgbMhdLWIAAXQ7f.png", "", sizes, widths %}
{% image "media/1587181111003815936-FgbMldfXEAATzIL.png", "", sizes, widths %}
{% image "media/1587181111003815936-FgbMr-CXoAcbNgm.png", "", sizes, widths %}
</div>

1. original
2. "old woman" \-"young woman"
3. "modern dslr photo" \- "oil painting"

<div class="flex-container">
{% image "media/1587184490031599619-FgbOhfxXkAIGFQU.png", "", sizes, widths %}
{% image "media/1587184490031599619-FgbOiKIXEAAqBVi.png", "", sizes, widths %}
{% image "media/1587184490031599619-FgbP32sXkAEe7q8.png", "", sizes, widths %}
</div>

1. original
2. "detailed painting" \- "child's drawing"
3. "archviz render" \- "child's drawing"
4. "castle" \- "house"

<div class="flex-container">
{% image "media/1587211334374068225-FgboABAX0AY5GZN.png", "", sizes, widths %}
{% image "media/1587211334374068225-FgboHcbWIAAntPz.png", "", sizes, widths %}
{% image "media/1587211334374068225-FgboOpTXgAIuvCR.png", "", sizes, widths %}
{% image "media/1587211334374068225-FgboPFfWYAIH_9m.png", "", sizes, widths %}
</div>

_converted from a twitter thread:
[Mon Oct 31 20:33:59 2022](https://twitter.com/Buntworthy/status/1587181111003815936)_