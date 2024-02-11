---
title: Abstract landscapes in Blender
date: "2014-08-25"
description: "A tutorial on making procedural, height map driven landscapes in Blender"
cover: "craters1-copy-copy.jpg"
tags: ["blender", "cutsquash"]
---

{% blogImage  "craters1-copy-copy.jpg", "Abstract 3D pillar landscape created in Blender" %}

I recently saw some great work by Lee Riggs, using Maya to create wonderful <a
    href="https://leegriggs.wordpress.com/2014/06/28/xgen-color/" target="_blank">abstract landscapes</a> out of millions
of small coloured block or pillars. They're fantastic images, and I wanted to try and emulate the effect in Blender as
part of my <a title="Exporting from Processing to Blender"
    href="https://www.cutsquash.com/2014/04/exporting-processing-blender/" target="_blank">ongoing</a> <a
    title="Low poly" href="https://www.cutsquash.com/2014/02/low-poly/" target="_blank">efforts</a> to try and get to
grips with the program. It turns out it was a lot easier than I expected, just using a couple of modifiers and some
duplication you can create some fairly nice effects. So here is a tutorial on how to achieve that blocky abstract
landscape look with just an interesting image and some modifiers. Although it wasn't hard to get the basics in place,
they're still not a patch on the originals, but the next plan is to generate some interesting images in Processing and
use these as the basis for a landscape.

<h2>Blender abstract landscape tutorial</h2>
<h3>1. Find an image</h3>
First off find an image to turn into a landscape. Something colourful (or not?) and with some interesting structures
seem to work well. I chose this stunning microscope image from Eckhard Völcker, any of his beautiful images would be
fantastic, (his <a href="https://www.wunderkanone.de/" target="_blank">website</a> and <a
    href="httpss://www.flickr.com/photos/wunderkanone/" target="_blank">Flickr stream</a> are highly recommended).

{% blogImage "colour_map.jpg", "Osmunda regalis, 10x by Eckhard Völcker"  %}

Load the image into your favourite image editing program and resize or crop the image to be square (it makes scaling the
image correctly later a little easier).  Save a colour copy, and save one in black and white (you might want to adjust
the black and white conversion to try and get the height map you want), bear in mind that light areas will appear higher
than dark.

{% blogImage "height_map.jpg", "Height map from Osmunda regalis, 10x by Eckhard Völcker" %}
<div class="caption">
The height map generated from the original image, white is higher.
</div>

<h3>2. Add some shapes</h3>
Fire up Blender and delete the starting cube. Add a plane, set the scale and dimension to 1 in both the x and y
dimensions. Press tab to enter edit mode, and subdivide the plane 10 times.

Next, add your base object, it can be anything, but a cylinder or cube is a good starting point. Generally it’s going to
have to be long and thin, but the exact dimensions will depend on how many subdivisions you’re going to apply to the
parent object later.

Set up the dupliverts, as explained <a
    href="https://wiki.blender.org/index.php/Doc:2.6/Manual/Modeling/Objects/Duplication/DupliVerts"
    target="_blank">here</a>. Basically, set the parent (Ctrl-P) of the object you created above, to be the plane, then
go into the object menu and set duplication to vertices. So we have a grid of object that are going to make up our
landscape, now we need a hell of a lot more and them, and also some landscape!

<h3>3. Add modifiers</h3>
We’ll add two modifiers, a displace modifier to create the landscape and a subsurf modifier to increase the number of
vertices, and therefore landscape elements, we have in our scene.

First, add a simple subsurf modifier to increase the number of landscape elements. I've been using a number of
subdivisions anywhere from 4 – 7 (7 of which gives you well over a million landscape elements, so be prepared for a bit
of a slowdown when trying to find a good view in the scene). You’ll also probably want to adjust the x and y dimensions
of the landscape elements to accommodate the changes in number caused by the different subdivision levels.

Next, add a displace modifier, and set the displacement texture to be the grayscale height map you created earlier.
You’ll have to tune the strength of the displacement to give you the effect you want, but that’s a little tricky to tell
until you have the elements set up. In general though a strength of 1 will be too much.

{% blogImage "displace-copy-copy.jpg", "Landscape tutorial screen shot" %}


<h3>4. Set up the material</h3>
Set up the material of the landscape elements by selecting the original element and assigning a material something like
the one illustrated in the image below.

Basically we are using the colour image as a texture input to the colour of the element, using the object info node to
give the position of the element on the image. You’ll also have to add 0.5 to both the x and y values of the object
position vector to make sure the origin of the image isn't in the middle of your plane.

{% blogImage "material1.jpg", "Material node set up for tutorial" %}

<h3>5. Render!</h3>
Now you’re all set up, find a good view point, adjust the materials, lighting set-up, and geometry of the landscape
elements and let Blender render the scene (I've been using Cycle rather than Blender internal). Some more example images
I've generated are below.

<strong>Update:</strong> I've uploaded one of my .blend file that you can download <a
    href="https://assets.justinpinkney.com/cutsquash/Landscape%20tut.zip">here</a>. I've been really happy to see people posting
some examples they've made following this tutorial: <a href="https://imgur.com/hpMLOnk" target="_blank">1</a>, <a
    href="https://imgur.com/quaACxs" target="_blank">2</a>, <a href="https://imgur.com/15ivLm1" target="_blank">3</a>, <a
    href="https://imgur.com/UusD3gd" target="_blank">4</a>, and possibly <a href="https://imgur.com/arHw4wH"
    target="_blank">5</a>, let me know if you make any more!

{% blogImage "abstract-landscape.jpg", "Abstract 3D pillar landscape created in Blender" %}
{% blogImage "3D-abstract-pillars.jpg", "Abstract 3D pillar landscape created in Blender" %}
{% blogImage "Blurred-pillars.jpg", "Abstract blurred 3D pillar landscape created in"  %}
{% blogImage "blocky-river-render.jpg", "Abstract 3D river landscape created in Blender" %}