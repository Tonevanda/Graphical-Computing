## Shadow Projection

## Table of Contents

- [Athertion & Weiller](#atherton--weiller-using-2-steps)
- [Ray Casting](#ray-casting)
- [Volumes of Shadows (BSP)](#volumes-of-shadows-bsp)

## Introduction

Shadow projetion algorithms are used to determine what objects from a scene are not in the direct path of a light source.
Because of this, some visibility algorithms, like the Athertone & Weiller algorithm, can be used as shadow projection algorithms, since, to calculate what objects are not visible from the perspective of an observer, would be the same as calculating what objects are not visible from the perspective of a light source.

## Atherton & Weiller using 2 steps

1. Consider the position of the light source as the position of the observer and determine the visible parts (lit). The result is the classification in shadow or lit.
2. Determine the parts visible to the viewer. The visible parts are rendered as lit and the others as in shadow.

## Ray Casting

A light ray is emitted from the viewpoint through the center of a *pixel* to "inside" of the scene. The point of intersection between the ray and the nearest object defines the object visible at that *pixel*

**Shadow**: a shadow feeler is sent from the point of intersection to the light source. If any object is intersected, then this point is in shadow.

![Pasted image 20240312185516 1.png](./images/Pasted%20image%2020240312185516%201.png)

## Volumes of Shadows (BSP)

Starting from a light source, a pyramid of shade is created for each polygon found at the scene. Subsequently, any object or part of it that is in there is stated as being in shadow.

The BSP-Binary Space Partition is particularly suitable for representation of shadow volumes

![Pasted image 20240312190528.png](./images/Pasted%20image%2020240312190528.png)
