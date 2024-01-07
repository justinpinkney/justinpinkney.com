---
title: Würstchen v2 Pokémon
date: "2024-01-07"
description: A quick experiment in fine tuning Würstchen v2 for text to Pokémon generation
tags: ["diffusion", "pokemon"]
cover:  "pokemon-004750.jpeg"
---

{% blogImage "pokemon-004750.jpeg", "" %}

<div class="caption">
Outputs of the Pokemon fine-tuned Würstchen v2 model for prompts: "Hello Kitty", "Old man looking at the moon", "Donald Trump", adn "Yoda". Top row EMA weights bottom row normal.
</div>

The second half of 2023 saw a ton of image generation models come out (including our own Midjourney v6 😊), some open source some not and most interesting in their own way.

One particularly neat little model was Würstchen v2. Würstchen v2 makes the interesting choice of learning a [Latent Diffusion Model](https://arxiv.org/abs/2112.10752) which is conditional not on text embeddings like Stable Diffusion but on spatial image features extracted by and EfficientNet model, this acts like a very compressed latent representation of the original image. Finally a second diffusion model is trained to generate these spatial image features conditional on text embeddings. Essentially this is training a Stable Diffusion like text to image model but using a super compressed (42x) latent space rather than the typical 8x compression for Latent Diffusion models.

{% blogImage "w2-arch.png", "" %}

<div class="caption">
Architecture of the Würstchen family of models, figure from "Wuerstchen: An Efficient Architecture for Large-Scale Text-to-Image Diffusion Models"
</div>

The full pipeline ends up being 3 models: Stage C, a text to very compressed latent image diffusion model; Stage B, a very compressed to less compressed latent image diffusion model; Stage A, the typical latent decoder. With the advantage that Stage B and C can remain fixed for fine tuning, and only Stage C needs to be trained, and given the small spatial dimensions it operates on it can be done so quite efficiently.

To try it out I tested fine tuning with my dataset of cpationed{% sidenote 1, "My original dataset was captioned using BLIP, which is a quite out of date captioning model by today's standards. If you're after more detailed captions [Sayak Paul](https://sayak.dev/) kindly shared [a version captioned with GPT4](https://huggingface.co/datasets/diffusers/pokemon-gpt4-captions)" %} Pokemon images (the same one I used to make [text-to-pokemon](/blog/2022/pokemon-generator)). After a few tweaks to the [training script](https://github.com/justinpinkney/Wuerstchen/blob/main/train_stage_C.py) which didn't seem to be set up for thev v2 model at the time {% sidenote 2, "Since then it looks like there is a [training script](https://huggingface.co/docs/diffusers/training/wuerstchen) for the Diffusers version of the model. I haven't used it myself but it's probably an easier place to get started yourself. The example even uses the same dataset but I didn't find any example outputs." %}, I could run a quick fine-tune and start making Pokemon out of text again. After about 5000 training steps the model behaved in a pretty similar way to my original Stable Diffusion version. You can put in names unrelated to Pokemon and get a "Pokemon-ified" version out.

Here are some more example outputs of "Mario", "Girl with a Pearl Earring", "Boris Johnson", and "Ramen". You can compare some of these to the example outputs in my previous [Stable Diffusion based model](/blog/2022/pokemon-generator) which overall worked marginally better I think.

{% blogImage "mario.jpeg", "" %}
{% blogImage "pearl.jpeg", "" %}
{% blogImage "boris.jpeg", "" %}
{% blogImage "ramen.jpeg", "" %}