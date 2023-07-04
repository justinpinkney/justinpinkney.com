---
title: Flowers Deconstructed
date: "2021-04-03"
description: Flowers exploded and collaged artwork
tags: ["art"]
draft: true
cover: "flowers-deconstructed-01.jpeg"
---

{% css %}
.full-width {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.gallery {
  max-width: 1600px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}
.gallery-item {
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}


.gallery-item:hover {
	transform: translate(3px, -5px) rotate(0.5deg);
	transform-origin: top left;
	box-shadow: 2px 4px 8px #c24f4faa;
	background-color: #f2fafe;
	border-color: #a7bdc8;
}

.gallery-item img {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  vertical-align: middle;

}

.gallery-item-full  {
  grid-column-start: 1;
  grid-column-end: 4;
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}


@media (max-width: 640px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .gallery-item {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .gallery-item-full  {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
{% endcss %}

Classic paintings of flowers cut and re-arranged.

Created using public domain flower paintings, [U2net](https://arxiv.org/abs/2005.09007) for segmentation and image magick for collaging.

<br />

<div class="full-width">
<br />

    <div class="gallery">
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-00.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-01.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-02.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-09.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-05.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-06.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-07.jpeg", "" %}
        </div>
        <div class="gallery-item">
            {% blogImage "flowers-deconstructed-08.jpeg", "" %}
        </div>
    </div>
</div>