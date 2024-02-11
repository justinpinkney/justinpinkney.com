---
title: Better OBJ model loading in Processing
date: "2015-04-12"
description: "Better loading of complex obj geometry in Processing"
cover: "2015-04-12_screenshot_001.jpg"
tags: ["processing", "cutsquash"]
---

{% blogImage "2015-04-12_screenshot_001.jpg", "OBJ model loaded in Processing" %}

Processing is a great at many things, it's so easy to do so much, including displaying things in 3D. Still it's easy to make things grind to a halt when trying to do to much. But there are a lot of things you can do to speed things up like <a href="https://processing.org/tutorials/pshape/" target="_blank">PShape recording</a>, using <a href="https://github.com/processing/processing/wiki/Advanced-OpenGL" target="_blank">Vertex Arrays to display lots of points,</a> or <a href="https://processing.org/tutorials/pshader/" target="_blank">writing GLSL Shaders</a>.

Loading a .obj model in Processing is as easy as using loadShape(), but loading a reasonably complicated textured obj models things slow down dramatically. Things seem to run happily when there are no textures involved. I think it's something to do with the fact that each face of the model is loaded as an individual PShape, that are all lumped together (but it's for a <a href="https://github.com/processing/processing/issues/2873" target="_blank">good reason</a>).


<p align="center">
<video controls src="objModel2.mp4" loop="true"></video>
</p>

You can pretty easily speed things up by taking the PShape made by loadShape and grabbing all the child shapes and putting them into a single PShape. You can't mix quads and triangles in a single PShape, and different textures and material properties would need to be split up too. Still from a crawling 4 fps, we easily get back up to 60 fps. Which is cool, hopefully that's helpful to someone, as it took me ages to figure out why things were going so slowly. And at some point I might have a crack at writing my own version of the OBJ loader.

```java
PShape objShape, triShape, quadShape;

void setup() {
  size(720, 360, P3D);
  // Load the obj model normally
  objShape = loadShape("heartDecim.obj");

  // Make a PShape with the all the faces with three vertices
  triShape = createShapeTri(objShape);
  // Make a PShape with the all the faces with four vertices
  quadShape = createShapeQuad(objShape);
}

public void draw() {
  background(255);

  translate(width/2, height/2, 0);
  scale(20);
  rotateX(PI);
  rotateY(mouseX/100.0);
  shape(triShape);
  shape(quadShape);
  //shape(objShape);

  lights();
  println(frameRate);
}

PShape createShapeTri(PShape r) {
  PImage tex = loadImage("HeartC.JPG");
  PShape s = createShape();
  s.beginShape(TRIANGLES);
  s.noStroke();
  s.texture(tex);
  s.textureMode(NORMAL);
  for (int i=100; i&lt;r.getChildCount (); i++) {
    if (r.getChild(i).getVertexCount() ==3) {
      for (int j=0; j&lt;r.getChild (i).getVertexCount(); j++) {
        PVector p = r.getChild(i).getVertex(j);
        PVector n = r.getChild(i).getNormal(j);
        float u = r.getChild(i).getTextureU(j);
        float v = r.getChild(i).getTextureV(j);
        s.normal(n.x, n.y, n.z);
        s.vertex(p.x, p.y, p.z, u, v);
      }
    }
  }
  s.endShape();
  return s;
}

PShape createShapeQuad(PShape r) {
  PImage tex = loadImage("HeartC.JPG");
  PShape s = createShape();
  s.beginShape(QUADS);
  s.noStroke();
  s.texture(tex);
  s.textureMode(NORMAL);
  for (int i=100; i&lt;r.getChildCount (); i++) {
    if (r.getChild(i).getVertexCount() ==4) {
      for (int j=0; j&lt;r.getChild (i).getVertexCount(); j++) {
        PVector p = r.getChild(i).getVertex(j);
        PVector n = r.getChild(i).getNormal(j);
        float u = r.getChild(i).getTextureU(j);
        float v = r.getChild(i).getTextureV(j);
        s.normal(n.x, n.y, n.z);
        s.vertex(p.x, p.y, p.z, u, v);
      }
    }
  }
  s.endShape();
  return s;
}
```
