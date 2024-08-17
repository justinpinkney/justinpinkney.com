---
title: Trailer Faces HQ Dataset
date: "2024-08-17"
description: "A dataset of 187k high res images of faces with varied expressions from movie trailers."
tags: ["dataset","faces"]
cover:  "tfhq-3panel.jpg"
---

#### A dataset of 187 thousand high resolution face images from movie trailers! Download it from [huggingface](https://huggingface.co/datasets/justinpinkney/trailer-faces-hq).

{% blogImage "tfhq-3panel.jpg", "examples from the tfhq dataset" %}

Before the advent of giant web scale image datasets [FFHQ](https://github.com/NVlabs/ffhq-dataset) used to be considered a big dataset full of images of faces on which many, many GANs were trained. One of the many issues with FFHQ (side note: don’t get me wrong there are lots of others, but I was focused on this one at the time) is the lack of diversity in expressions on people’s faces, being scraped from Flickr it tends to mostly be fairly bland smiles all round. At the time I was working on a project related to extracting latent directions corresponding to different emotions and the lack of emotions in ffhq is very noticeable, both in the original dataset as well as the ability of the stylegan model to represent those non smiling/neutral expressions.


## Finding emotions

After this I was on a hunt for a large diverse high resolution dataset of faces with varied emotions, unfortunately none of the exist ones seemed to fit the bill examples?

I guess that meant I had to collect my own. Trying to think of places that had high res closeups of faces in a great variety of emotional states, movies seemed an obvious possibility.

At the time it turned out that the apple trailers website was very easy to scrape, it was literally just a list of links to .mov files, and they were at very high bit rate and resolution, generally showing much less compression than a similar trailer on YouTube. High bit rate is important as it’s not often obvious just how bad any still from even a 4k trailer look with typical web levels of compression. The use of trailers also meant there was a good variety of faces compared to tv shows for example which just have the same few faces over and over again.

## TFHQ dataset

In the end I collected around 186 thousand high resolution face images to make my new dataset, if you’re interested in some of the details they are listed below:{% sidenote 1, "These bits were expanded from a paper that never went anywhere." %}

Todo picking which trailers to process

- I downloaded all movie trailers and featurettes listed on the Apple Movie Trailers website as of August 2022. That resulted in  15,379 trailers at Full HD (1080p) resolution, amounting to approximately 2 TB/507 hours of video.
- to detect faces I used the pre-trained Yolov5-face large model [32] rejecting any detections with bounding box less than 256 px in height, or confidence less than 0.5.
- One clear challenge was deduplication, film sequences obviously contain many similar frames and these are often motion blurred due to the low frame rate of movies. That means I would get face detection of the same face over the course of a shot and I needed a way to choose only the sharpest frame and discard the rest. First I computed an image similarity metric using a pre-trained CLIP ViT-B/32 [33] to detect sequences of detections which were very similar. Then I  measured the variance of the Laplacian over the images as an approximate relative sharpness metric. The for each set of similar frames I discarded all but the sharpest images, the similarity threshold was tuned by hand, considering frames where there was no significant motion, or significant changes in expression as similar, e.g consecutive frames of a person talking without much head motion should be consider similar.
- Finally I did the usual FFHQ alignment on the faces crops [21]. This also involved a lot of frames which needed padding due to the aspect ratio of movies tending to crop the top of the head, for this I did the usual reflection and blur padding used for ffhq.
- many of the final images had undesirable properties such as occlusion, non-photographic faces, or overlaid text. To get only the best quality images and remove any false detections from the face detector I did further perform quality filtering by training a classifier on several hundred subjectively determined “good”/“bad” example images, and use this to exclude predicted “bad” images leaving a total of 186,553 images in the dataset.

## Face identification

In order to train my [face identity conditioned diffusion model](/blog/2024/face-mixer-diffusion) I also wanted to extract face identity information for the dataset and associate different image of the same person with each other for building a retreival based training dataset. I extracted face embedding vectors for every image using a pretrained model from [InsightFace_Pytorch](https://github.com/TreB1eN/InsightFace_Pytorch) (specifically the IR-SE50 model) and then I created a .json file which for every file listed all the other image files with a high cosine similarity of face embeddings of greater than 0.5 (side note I also added a threshold to prevent any matches with a clip similarity greater than 0.9 to avoid very similar images). This gives a dataset where for every image you can easily access the other images of the same identiy in different poses or settings.

This produces a .json file with entries which looks like:

```
{
  "00000000.jpg": [],
  "00000001.jpg": ["00024932.jpg", "00036845.jpg", ...],
  ... etc
```

empty lists indicate that a given image has no face id matches. For those with matches the face identifier gives pretty satisifactory results:

{% blogImage "ret-example.jpg", "Example of a query image and the matching faces retreived" %}

## Usage

The dataset is released under the [Creative Commons BY-SA](https://creativecommons.org/licenses/by-sa/4.0/)![https://creativecommons.org/licenses/by-sa/4.0/](https://i.creativecommons.org/l/by-sa/4.0/80x15.png) license. If you use it for something cool please [let me know](https://x.com/Buntworthy)! And if you want to cite the dataset, here is a bibtex entry:

```
@misc{pinkney2023tfhq,
      author = {Pinkney, Justin N. M.},
      title = {Trailer Faces HQ dataset},
      year={2023},
      howpublished= {\url{https://www.justinpinkney.com/blog/2024/trailer-faces}}
}
```