---
title: From feature space to input space
date: "2020-08-05"
description: An article looking at the connection between input space and feature space in deep neural networks and how various novel methods have been invented by generalising techniques between the two.
cover: flowers-cut.jpg
---

## Input space and Feature space are different sides of the looking glass

{% blogImage "./ext-alice1.jpg", "alice in wonderland"%}

Neural networks (for image tasks) take in images and put them through a series of, typically convolutional, transformations. The world of those input images consisting of red, green, and blue pixel values we can call **input space** and the intermediate values that get computed in the network, the transformed versions of the images, we might call **feature space**.

There are many different levels of feature space, one for each layer in the network, and there is much work to try and understand what the values and dimensions in this space represent[^feature-vis]. But fundamentally these internal representations computed by the network just look like images, ones with (generally) many more channels that the three colours we are familiar with.

TODO find nice diagram of input space and feature space in the network

## How is Feature space just like Input space?

As pointed out in the original batchnorm paper we can consider any portion of a network as a "sub-network" which takes in some activations from the previous layers and applies transforms to this. **In this sense the previous layer's feature space is just the input space for the later layers.**

Given that there is such a strong connection between input and feature space, it makes sense that anything we can do to improve the training process of the network in one space might be useful to also do in the other.

## Batch normalisation is just input normalisation in feature space

> It has been  long  known that the network training converges faster if its inputs are whitened – i.e., linearly transformed to have zero means and unit variances, and decorrelated. As each layer observes the inputs produced by the layers below, it would be advantageous to achieve the same whitening of the inputs of each layer.[^ioffe2015batch]

It is standard practice to normalise the inputs of a machine learning model, at least ensuring the inputs have mean zero and a standard deviation of 1. The logic which inspired batch normalisation is that if such an operation is beneficial in input space, it is logical to expect it to also be of benefit in feature space.

> Convergence is usually faster if the average of each input variable over the training set is close to zero. [^lecun-backprop]

The invention of batch normalisation was extremely important important in deep learning, it allowed efficient training of increasingly large networks at higher learn rates and has become standard practice in many neural network architectures. Since the original paper's discussion of how batchnorm helps by reducing "internal covariate shift" there has been some confusion as to how exactly it works, but for the best discussion I've seen, look at this Twitter thread by David Page:

https://twitter.com/dcpage3/status/1171867587417952260

Clearly, adapting the concept of input normalisation to feature space is not trivial, and batch normalisation requires various new mechanisms and non-obvious assumptions to work (e.g. that batch statistics are sufficient, learned scale and offset parameters, and changes in behaviour between train and test time). In fact many of these unusual features of mean that Batch Normalisation turns out to often be a problematic layer.

## Dropout works in feature space

{% blogImage "ext-alice2.jpg", "" %}

This pattern of taking concepts from one space and translating them to the other has also been applied to the regularisation technique of dropout. In dropout we randomly set the activations of some neurons to zero during training. It was popularised by use in AlexNet and for a while was extremely common practice in deep learning. The fact that this rather extreme procedure of setting (often significant) amounts of the feature space pixels to zero should actually work, let alone be beneficial, is not at first glance obvious (at least not to me), but there are various intuitive explanations for why this should be.[^thinking-about-dropout]

Nowadays dropout is less prevalent than it used to be. This would seem to be in large part due to the fact that it was predominantly used in the final fully connected layers of networks which are no longer common. It doesn't work so well for convolutional layers, but this is something we'll come back to later.

## Cutout is dropout in Input space

{% blogImage "ext-scissors.jpg", "" %}

So if dropout was a successful approach for regularisation which works by zeroing pixels in feature space, can this be translated to input space? One problem is that dropout only seems to work well for fully connected layers and not so much for convolutional ones.

> While dropout was found to be very effective at regular-izing fully-connected layers, it appears to be less powerfulwhen used with convolutional layers ...
>
> ... neighbouring pixels in images share much of the same information.  If any of them are dropped out then the information they contain will likely still be passed on from the neighbouring pixels that are still active. [^cutout]

That same reasoning is also going to apply to images, but like we saw before porting these ideas from one space to another is never quite straightforward (if it was, it would have been done already).

DeVries and Taylor introduced a data augmentation method called Cutout in the paper "Improved Regularization of Convolutional Neural Networks with Cutout" where they set random rectangles of the input images to be zero, and as they point out:

> Cutout can be interpreted as applying a spatial prior to dropout in input space [^cutout]

The spatial prior they mention above is the fact that they remove a contiguous patch of the input images (they use a rectangle but state that the shape is not important) rather than zeroing random pixels as in dropout.

{% blogImage "flowers-cut.jpg", "" %}

One other difference here is the difference in training and test time weight scaling that is used in dropout is no longer required. For the input space we centre our data around zero (which is not true in feature space), so as long as we fill our patches zero won't affect the expected bias.

## Feature space to input space and back again...

In fact those same modifications to dropout that made it work for input space can be ported back to feature space to solve the problem we pointed out earlier: dropout doesn't work well for convolution layers.

The Dropblock paper shows how the idea of zeroing out a contiguous region allows us to use dropout it feature space effectively. As the authors state "DropBlock generalizes Cutout by applying Cutout at every feature map in a convolutional networks."[^dropblock]

Unfortunately getting dropblock to work effectively seems to require hyper-parameter tuning, in terms of block size and where it is applied, as well as tweaking training by gradually increasing the amount of drop. The paper also states that "Although Cutout improves accuracy on the CIFAR-10 dataset ... it does not improve the accuracy on the ImageNet dataset in our experiments".

## What other innovations can be made by generalising ideas between spaces?

So that's a couple of examples of how generalising ideas which were successful in one space to the other space can lead to useful innovations in deep learning, and there are more like MixUp and Manifold MixUp.

What others concepts could be transferred from one space to the other? One possibility is the use of image transforms for data augmentation. Random horizontal flips, or small amount of resizing are commonly applied to input images. Could the same be applied to feature space? One complication, particularly for horizontal reflection, is that pixels in feature space are likely to have some directionality that pixels in image space do not. So maybe random rescaling is a better place to start? But as we've seen above, methods often need some modification to be relevant in the other space.

In fact we can also look for other "spaces" to apply our ideas. For example the parameters of the network itself can be considered to be a high-dimensional **weight space**. And although the properties of this are likely to be somewhat different to feature or input space, perhaps some of the ideas can also transition.[^weight-standardisation]


### Image credits

- [Illustrations of Through the Looking Glass by John Tenniel](https://commons.wikimedia.org/wiki/Category:John_Tenniel%27s_illustrations_of_Through_the_Looking-Glass_and_What_Alice_Found_There)
- [The Editor and the Giraffe by Frederick Stuart Church](https://www.si.edu/object/editor-and-giraffe:chndm_1938-57-1070-184)

[^feature-vis]: For beautiful visuals and great insights into what this feature space represents see the fantastic work on feature visualisation and the follow ups by Chris Olah. <br /><br /> Olah, Chris, Alexander Mordvintsev, and Ludwig Schubert. ‘Feature Visualization’. Distill 2, no. 11 (7 November 2017): e7. https://doi.org/10.23915/distill.00007.

[^ioffe2015batch]: Ioffe, Sergey, and Christian Szegedy. ‘Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift’. ArXiv:1502.03167 [Cs], 2 March 2015. http://arxiv.org/abs/1502.03167.

[^cutout]: DeVries, Terrance, and Graham W. Taylor. ‘Improved Regularization of Convolutional Neural Networks with Cutout’. ArXiv:1708.04552 [Cs], 29 November 2017. http://arxiv.org/abs/1708.04552.

[^thinking-about-dropout]: There are various different ways to interpret how dropout is working: simply adding noise, approximating averaging an ensemble, or prevent co-adaptation. The original paper outlines these and it would be interesting to revist what evidence there is for what intuition is correct.

[^lecun-backprop]: LeCun, Yann A., Léon Bottou, Genevieve B. Orr, and Klaus-Robert Müller. ‘Efficient BackProp’. In Neural Networks: Tricks of the Trade: Second Edition, edited by Grégoire Montavon, Geneviève B. Orr, and Klaus-Robert Müller, 9–48. Lecture Notes in Computer Science. Berlin, Heidelberg: Springer, 2012. https://doi.org/10.1007/978-3-642-35289-8_3.

[^dropblock]: Ghiasi, Golnaz, Tsung-Yi Lin, and Quoc V. Le. ‘DropBlock: A Regularization Method for Convolutional Networks’. ArXiv:1810.12890 [Cs], 30 October 2018. http://arxiv.org/abs/1810.12890.

[^weight-standardisation]: Qiao, Siyuan, Huiyu Wang, Chenxi Liu, Wei Shen, and Alan Yuille. ‘Weight Standardization’. ArXiv:1903.10520 [Cs], 25 March 2019. http://arxiv.org/abs/1903.10520.
