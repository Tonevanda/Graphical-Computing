# Shading & Textures

## Table of Contents

- [Shading](#shading)
    - [Constant Shading](#constant-shading)
    - [Smooth Shading](#smooth-shading)
        - [Gouraud Method](#gouraud-method)
        - [Phong Model](#phong-method)
- [Textures](#textures)
    - [Texture Mapping](#texture-mapping-2d)
    - [Bump Textures](#bump-mapping-textures)

## Shading 

The objective of shading is calculating the color of each point of the visible surfaces

There are different methods to do this:

1. Constant Shading
2. Interpolated shading $\rightarrow$  *Smooth Shading*
	- Gouraud Method
	- Phong Method

### Constant Shading

The color is calculated only for one point of the polygon and replicated in all other points of the same polygon.

This is equivalent to the following:

- The light source if at $\infty$, therefore $\vec{N}\cdot\vec{L}$ is constant at any point of the polygon
- The observer is at $\infty$, therefore $\vec{R}\cdot\vec{V}$ is constant at any point of the polygon
- The face if the flat surface of the model itself, a.k.a, it's not an approximation of a curved surface

### Smooth Shading

Constant shading leads to very noticeable discontinuity in color, especially in objects with non-flat surfaces.

Smooth shading tries to solve this problem by using *interpolation*, which means determining the color of a point based on the vertices of the polygon.

#### Gouraud Method

There are 2 steps to this method:

1. Calculate the color of each vertex using the desired illumination model
2. Calculate the color of the remaining points of the polygon by bi-linear interpolation

![Pasted image 20240313193113.png](./images/Pasted%20image%2020240313193113.png)

Steps to calculate color of point **P**:

1. Calculate **L**, by interpolating color of **V1** and **V2**
2. Calculate **R**, by interpolating color of **V3** and **V4**
3. Calculate **P**, by interpolation color of **L** and **R**

The following image shows the calculation of interpolated values:

![Pasted image 20240313193444.png](./images/Pasted%20image%2020240313193444.png)

**Note**: Using this method, horizontal interpolation is prioritized over vertical interpolation. This is because, when rendering a scene, polygons are typically broken down into pixels on the screen using a process called rasterization. Rasterization typically proceeds horizontally across scanlines, drawing one horizontal row of pixels at a time from left to right. Prioritizing horizontal interpolations means that the intensity values calculated at the vertices are interpolated horizontally across scanlines as the polygons are rasterized. This can lead to more efficient calculations and smoother shading transitions because the interpolation is aligned with the natural progression of pixel rendering.

**Note**: The Mach-Band effect is slightly noticeable with this method.

#### Phong Method

Performs interpolation on the **normals** of the point, instead of the color.

Steps:

1. For each vertex of the polygonal mesh, calculates the surface **normal** vector (by analytical expression or approximated by interpolation)
2. **Normal** in edge points are calculated by linear interpolation of the vertices normals. The normals in points along a scan line are obtained by linear interpolation of the normals in edges.
3. The local illumination model is used at each point.

![Pasted image 20240314151138.png](./images/Pasted%20image%2020240314151138.png)

Steps to calculate the normal of point **R**:

1. Normal in **P** is obtained by interpolation of normals of **V1** and **V2**.
2. Normal in **Q** is obtained by interpolation of normals of **V3** and **V4**.
3. Normal in **R** is obtained by interpolation of normals of **P** and **Q**.

## Textures

Textures are a way to add visual detail without increasing the geometric detail, since they don't increase the polygon count.

Most common types:

- Texture mapping (2D images)
	- An image over a polygon (wallpaper)
- Bump Mapping Textures
	- Besides the 2D image, it creates sense of **roughness**
- 3D Textures
	- The texture evolves continuously "inside" the objects

### Texture Mapping (2D)

- Texture has standard coordinates $(u,v)\in [0,1]$ 
- The pixels of a texture image are called *texels*

Texture mapping involves 2 steps:

1. 4 corners of the *pixel* are mapped to the surface $(s,t)$
2. 4 points $(s,t)$ are mapped to texture space $(u,v)$ 

- The resulting color is extracted from the colors of the *texels* included in the resulting area (*filtering*)

### Bump Mapping Textures

Give a simulation of *roughness* without increasing geometry.

The idea is to calculate the normals of a *rough* face and use them on a normal face, thus simulating the change in the lighting.

Original *rough* surface:

![Pasted image 20240314152250.png](./images/Pasted%20image%2020240314152250.png)

Simulation of the original *rough* surface

![Pasted image 20240314152311.png](./images/Pasted%20image%2020240314152311.png)
