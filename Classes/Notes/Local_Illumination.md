# Local Illumination Models

## Table of Contents

- [Introduction](#introduction)
- [Elementary Model](#elementary-model)
    - [Ambient Lighting](#ambient-lighting)
    - [Diffuse Reflection](#diffuse-reflection)
    - [Specular Reflection / Phong Model](#specular-reflection--phong-model)
        - [Attenuation with distance](#attenuation-with-distance)
    - [Refraction in transparent objects](#refraction-in-transparent-objects)
    - [Halfway Vector](#halfway-vector)
- [Improved Model](#improved-model)
    - [Attenuation factor of the light source](#attenuation-factor-of-the-light-source)
    - [Color](#color)
    - [Atmospheric Attenuation](#atmospheric-attenuation)

## Introduction

The lighting models express the lighting components that define the intensity of light reflected from a given surface, allowing the calculation of the color of each point of the surface of the objects in the image.

There are 2 ways that light is reflected on an object:

- **Diffuse Reflection**: Reflects light in all directions with equal intensity value due to the roughness of the reflecting surface.
- **Specular Reflection**: Light sources produce over-illuminated areas on the reflective surface.


## Elementary Model

### Ambient Lighting

Corresponds to a diffuse light, where many light rays come from the reflection point.

$$ I = k_a \cdot I_a $$

Where:

- $k_a$ is the coefficient ambient reflection (diffuse) of the face and ranges from 0 to 1.
- $I$ is the intensity observed
- $I_a$ is constant in all directions. If only this component illuminates an object then all faces of the object have the same illumination intensity.

### Diffuse Reflection

The diffuse reflection due to a point light source is calculated according to Lambert's law: the intensity of reflected light depends on the angle of illumination.

The intensity of the light in the observed object varies depending on the orientation of the surface and the distance from the light source.

$$I_d = \frac{k_d \cdot I_p}{d^2}\cdot \cos(\theta)$$
Where:

- $\theta$ is the angle of incidence of the light source on the object's surface
- $I_p$ is the intensity of the light source
- $k_d$ is the diffuse reflection coefficient
- $d$ is the distance the light travels from the light source to the object's surface

**Note**: The intensity of the light does not depend on the position of the observer, it depends on the angle of incidence of the light on the object's surface.

**Note**: Although Lambert's Law implies $d$ to be squared,  if $d$ is squared in computations the intensity falls off way too fast, so it is usually not squared.

### Specular Reflection / Phong Model

Specular reflection is the observable reflection on polished / shiny surfaces.

![Pasted image 20240307155905.png](./images/Pasted%20image%2020240307155905%201.png)

$$I_s = \frac{k_s\cdot I_p}{d^2}\cdot \cos^n(\alpha)$$
Where:

- $R$ is direction of maximum reflection
- $\alpha$ is the angle between $R$ and the direction of the observer $V$.
- $k_s$ is a constant that depends on the material as well as the exponent $n$.

The specular reflection depends on the position of the observer.

In an ideal specular surface (ideal mirror), light is reflected only in the direction R.

The intensity of the specular reflection is proportional to $\cos^n(\alpha)$, In which $n$ depends on the surface characteristics (value 1 for non polished faces and 200 for perfectly polished faces).

![Pasted image 20240307160239.png](./images/Pasted%20image%2020240307160239%201.png)

As we can see, the higher the $n$, the less the light is reflected between 0 and 90 degrees, meaning the surface is more polished.



- So the full expression for the local illumination is:

$$I = k_a\cdot I_a + \frac{k_d\cdot I_p}{d^2}\cdot \cos(\theta) + \frac{k_s\cdot I_p}{d^2}\cdot \cos^n(\alpha)$$

- Reflection coefficients:
	- $K_a$ and $K_d$ are usually equal

#### Attenuation with distance

Denominator $d^2$ represents **quadratic attenuation**, which is too strong. A small increase in $d$ generates large decrease in $I$

There are 2 alternatives:

- Denominator $d$: **Linear attenuation**, not as strong as **quadratic attenuation**
- Denominator $1$: **No attenuation**, very common and leads to a faster calculation


### Refraction (in transparent objects)

When the object is transparent, it is necessary to provide the light that passes through a face: it is called transmitted light or refracted light.

Due to the speed of light being different in different materials, the angle of refraction is than the the angle of incidence.

![Pasted image 20240307163553.png](./images/Pasted%20image%2020240307163553%201.png)

$n_i$ is the refraction index of material 1 (air)

$n_r$ is the refraction index of material 2 (water)

**Snell's Law**:

$$\sin(\theta_r) = \frac{n_i}{n_r}\cdot \sin(\theta_i)$$

### Halfway Vector

![Pasted image 20240312175249.png](./images/Pasted%20image%2020240312175249%201.png)

$\vec{R}$ is defined as:

$$\vec{R} = 2\cdot \vec{N}\cdot(\vec{N}\cdot \vec{L}) - \vec{L}$$
- Computationally, this is a rather complex operation, but we need the angle $\alpha$ for the specular component of illumination. 
- Because of this, a workaround was developed that uses a ***halfway vector H***. 
- This vector $\vec{H}$ is used to calculate $\vec{N}\cdot \vec{H}$, instead of $\vec{R}\cdot \vec{V}$.
- Although $\beta \neq \alpha$, it is an approximation that saves a fair bit of processing power.

On flat surfaces we can consider the light source and the observer are sufficiently far from the object:

- $\vec{V}$, $\vec{N}$ and $\vec{L}$ are constant over the entire surface so $\cos(\theta) = \vec{R}\cdot \vec{V}$ results well.

On non-planar surfaces, this is not possible:

$$\vec{H} = \frac{\vec{L} + \vec{V}}{|\vec{L} + \vec{V}|}$$
The calculation $\vec{N}\cdot \vec{H}$, using the **halfway vector H** requires fewer operations than $\vec{V}\cdot \vec{R}$.

## Improved Model

The improved model makes a few changes to the elementary model, namely:

- Attenuation factor
- Color lights and Objects
- Atmospheric attenuation

### Attenuation factor of the light source

With the Phong model, if two parallel faces with the same characteristics appear overlapped, the observer can not distinguish between the end of a face and the beginning of the other, regardless of distance.
The factor $\frac{1}{d_L^2}$ would not work well since, for far light sources this factor does not vary sufficiently whereas for close light sources, very large variations appear for objects not that far apart.
Therefore, the attenuation factor $f_{att}$ was added to decrease luminance with distance from the light source to the illuminated point.

The attenuation factor $f_{att}$ is defined as:

$$f_{att} = min(1,\frac{1}{k_c + k_l\cdot d + k_q\cdot d^2})$$

Therefore, with this change, the **Intensity** $I$ of the light reflected on a point is defined as:

$$I = k_aI_a + f_{att}\cdot [k_d(\vec{N}\cdot \vec{L_{ls}}) + k_s\cdot(\vec{V}\cdot \vec{R_{ls}})^n]\cdot I_{ls}$$

### Color

The spectrum of light is reduced down to RGB components:
- The **diffuse color** of an object is defined by ($O_{dR}$, $O_{dG}$, $O_{dB}$ )
- The light source is characterized by intensities for each component ($I_{pR}$, $I_{pG}$, $I_{pB}$ )

Therefore, with this change, the light model is defined by three equations, one for each component **(R, G, B)**.

$$I_\lambda = k_aI_{a\lambda}O_{d\lambda} + f_{att}I_{p\lambda}[k_dO_{d\lambda}(\vec{N}\cdot\vec{L}) + k_sO_{s\lambda}(\vec{R}\cdot\vec{V})^n]$$

Where each component is represented as:

$$I_R = k_aI_{aR}O_{dR} + f_{att}I_{pR}[k_dO_{dR}(\vec{N}\cdot\vec{L}) + k_sO_{sR}(\vec{R}\cdot\vec{V})^n]\cdot I_{pR}$$
$$I_G = k_aI_{aG}O_{dG} + f_{att}I_{pG}[k_dO_{dG}(\vec{N}\cdot\vec{L}) + k_sO_{sG}(\vec{R}\cdot\vec{V})^n]\cdot I_{pG}$$
$$I_B = k_aI_{aB}O_{dB} + f_{att}I_{pB}[k_dO_{dB}(\vec{N}\cdot\vec{L}) + k_sO_{sB}(\vec{R}\cdot\vec{V})^n]\cdot I_{pB}$$

### Atmospheric attenuation

The lighting of an object with atmospheric attenuation, with z decreasing with the distance to the observer, is defined as:

$$l_{\lambda} = s_0I_\lambda + (1-s_0)I_{dc\lambda}$$

With $s_0$ defined as:

$$s_0 = s_b+\frac{(z_0-z_b)(s_f-s_b)}{z_f-z_b}$$

![Pasted image 20240312184200.png](./images/Pasted%20image%2020240312184200%201.png)
Where:

- $l_\lambda$    is the lighting/color with atmospheric attenuation
- $I_\lambda$    is the lighting/color of the object with no atmospheric attenuation
- $I_{dc\lambda}$ is the lighting/color of the ***atmosphere***
- $s_f, s_b$ are scale factors (typically with values 1 and 0, respectively)
- $z_0$    is the object's distance
- $z_f, z_b$ are the distances to the front plane and back plane, respectively
