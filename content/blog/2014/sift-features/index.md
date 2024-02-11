---
title: Visualising SIFT descriptors
date: "2014-11-02"
description: "Visualising a traditional image processing feature extraction algorithm"
cover: "big-walle.jpg"
tags: ["cutsquash"]
---

{% blogImage "walle1-copy.jpg", "Visualisation of SIFT features of a frame from Wall-E" %}


Having worked on a few computer vision projects at work recently I've been interested in trying to understand what the computer is seeing. A lot of image processing algorithms involve putting the image through filters, or transforms, or extracting local descriptions of portions of the image. Often these are modelled around what the human vision system is understood to be doing, but of course our brain hides this low-levelling processing from us. It seems really interesting to try and visualise some of the intermediate steps of these  algorithms to try and get a better understanding of how the computer is interpreting an image.

Of course it's nothing new, computer vision papers explaining or describing algorithms often tend to contain interesting visualisations (just try searching for <a href="https://www.google.co.uk/search?q=eigenfaces&amp;biw=1536&amp;bih=764&amp;source=lnms&amp;tbm=isch&amp;sa=X&amp;ei=uf1PVMBB1dlqgp-CqAQ&amp;ved=0CAYQ_AUoAQ" target="_blank">eigenfaces </a>or <a href="https://twitter.com/Buntworthy/status/436260777888976896" target="_blank">HOG pedestrian detection</a>). I also came across a few really nice examples of people specifically trying to visualise (or reconstruct from) image features including: <a href="http://web.mit.edu/vondrick/ihog/" target="_blank">visualisation of HOG features</a>, and <a href="https://hal.archives-ouvertes.fr/file/index/docid/567194/filename/weinzaepfel_cvpr11.pdf" target="_blank">image reconstruction from SIFT descriptors</a>, both produce some fantastic and interesting images.

<h2>Visualising SIFT</h2>

The Scale Invariant Feature Transform is a commonly used method for detecting and describing local 'features' in an image, for a good description of what it is and how it works see the <a href="http://www.vlfeat.org/api/sift.html" target="_blank">VLFeat API documentation</a>. Basically SIFT produces features in the image that are local points of likely interest and distinctiveness, these are described by descriptors which take a small patch of pixels and compute local histograms of intensity gradients. I've used these descriptors several times for detecting and matching objects in scenes before, and have always wanted to better understand what the computer is seeing, and what it's giving importance to. Typically SIFT descriptors can be visualised as boxes with many arrows, which do give a hint of what the underlying algorithm is producing, but I wanted to try and produce something a little more visually pleasing (if less accurate).

I came up with a simple visualisation model for a SIFT descriptor. The descriptor is a 128 element vector representing the bins of a histogram of the local intensity gradients in an image over 16 patches around the keypoint. An example of my representation for a few keypoints is shown below:

http://youtu.be/RWi813cNN_k

Using OpenCV (in Python) to do the SIFT detection{% sidenote 1, "There is a good explanation of the slightly confusing OpenCV code for the SIFT keypoints <a href=\"http://stackoverflow.com/questions/17015995/opencv-sift-descriptor-keypoint-radius\">here</a>."%} and descriptions I placed descriptor visualisations into a blank image (scaled and rotated appropriately) and slowly saw some of the original structure of the image reappear in a ghostly form.

{% blogImage "sift_lantern.jpg", "SIFT features of lantern" %}

The colour in the images comes from doing feature detection in the red, green, and blue channels and adding appropriately coloured keypoints to the image. It's surprising just how much of the original details of the image begins to reappear, and it's also interesting to see what the SIFT algorithm pays attention to in the image and what it doesn't, (for example it has no interest in EVE in the frame from Wall-E above, she's just too sleek, uniform and smooth I guess).

The current algorithm is written in Python, and is painfully slow, so rendering short frames of video is fun, but takes a long time (I guess I need to look into how to use Cython, or learn C++...). The shimmering ghostly movement of rendered motion is particularly nice (and would be better if I could render it at higher resolution!)

http://youtu.be/Nw-8KRUAJBg

{% blogImage "big-walle.jpg", "High detail SIFT feature visualiasation" %}
<div class="caption">
Another Wall-E image (in case you couldn't <a href="http://cdn.twitrcovers.com/wp-content/uploads/2012/11/Wall-E-l.jpg">tell</a>)
</div>


