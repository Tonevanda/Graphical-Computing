# Light and Color

## Table of Contents

- [Introduction](#introduction)
- [HSV Model](#hsv-model)
- [Energy Distribution](#energy-distribution)
- [CIE Model](#cie-model)
- [CMY Model](#cmy-model)
- [Conversion](#conversions)
    - [RGB to HSV](#rgb-to-hsv)
    - [HSV to RGB](#hsv-to-rgb)

## Introduction

We evaluate **Chromatic Light** by the following parameters:

- **Hue**: Distinguish between colors like red, green, etc.
- **Saturation**: Refers to how *pure* a color is
	- Red is pure (**saturated**), but if we add some green to it it becomes less saturated
- **Intensity**: Reflected intensity
- **Brightness**: Emitted intensity (by a light source)

Artists specify colors as different **tints**, **shades** and **tones** of a **pure pigment**:

- **Tints**: Result from mixing white pigment to a pure pigment (**less saturated**)
- **Shades**: Result from mixing black pigment to a pure pigment (**decreases intensity**)
- **Tones**: Result from mixing white and black pigment to a pure pigment
- **Grays**: Result of mixing white and black pigment

The colors obtained by any of these mixtures as the same **hue**, just with different **intensity** and **saturation**.

## HSV Model

Representation of colors using an inverted 6 faced pyramid:

![Pasted image 20240314153403.png](./images/Pasted%20image%2020240314153403.png)

-  The **H** represents the **hue**, ranging from 0º to 360º :

	- Red: 0º
	- Yellow: 60º
	- Green: 120º
	- Cyan: 180º
	- Blue: 240º
	- Magenta: 300º

- The **S** represents the **saturation**, ranging from 0% to 100%:

	- 0%: The color is a shade of **gray**
	- 100%: The color is pure and vivid

- The **V** represents the **brightness**, ranging from 0% to 100%:

	- 0%: No brightness, a.k.a **black**
	- 100%: Maximum brightness


## Energy Distribution

![Pasted image 20240314154626.png](./images/Pasted%20image%2020240314154626.png)

$E_d$ - Dominant Energy
$E_w$ - Energy for White

The higher $E_d - E_w$, the purer the color will be.

$E_w = 0$: 100% purity

$E_w = E_d$: 0% purity (white)


$$Saturation = \frac{E_d - E_w}{E_d}$$

## CIE Model

**Primary Colors**:

- Imaginary: **X**, **Y** and **Z**
- **Y** coincides with the luminous-efficiency function

$$C = xX + yY + zZ$$

The following image shows the conical volume that contains the visible colors:

![Pasted image 20240314155427.png](./images/Pasted%20image%2020240314155427.png)

The **values of Chromaticity** are defined by normalizing against $X + Y + Z$

$$x = \frac{X}{X+Y+Z},y = \frac{Y}{X+Y+Z}, z = \frac{Z}{X+Y+Z}$$

## CMY Model

The **CMY Model** is pretty much the inverse of the **RGB Model**.

The colors range from 0 to 255, but are subtractive instead of additive.

Therefore, to convert between RGB and CMY we just need to subtract from 255:

$$RGB(128,64,255) = CMY(255-128,255-64,255-255) = CMY(127,191,0)$$

## Conversions

### RGB to HSV

1. Divide each RGB component by 255
2. Calculate V $$V = max(R,G,B)$$
3. Calculate S $$S = \frac{V-min(R,G,B)}{V}, V \neq 0$$
4. Calculate H
	```
	If R = G = B, H = 0
	Else if V = R, H = 60 * (G - B) / (V - min(R, G, B))
	Else if V = G, H = 120 + 60 * (B - R) / (V - min(R, G, B))
	Else if V = B, H = 240 + 60 * (R - G) / (V - min(R, G, B))
	If H < 0, H = H + 360
	```


### HSV to RGB

1. Calculate the chroma (C): $$C = V*S$$
2. Calculate the hue sector: $$H' = H/60$$
3. Calculate the X value: $$X = C(1-|(\frac{H}{60} \mod 2)-1|)$$
4. Calculate intermediate values (R', G', B'):
```
- If the hue sector is 0, R' = C, G' = X, B' = 0.
- If the hue sector is 1, R' = X, G' = C, B' = 0.
- If the hue sector is 2, R' = 0, G' = C, B' = X.
- If the hue sector is 3, R' = 0, G' = X, B' = C.
- If the hue sector is 4, R' = X, G' = 0, B' = C.
- If the hue sector is 5, R' = C, G' = 0, B' = X.
```

5. Calculate the final **R** value: $$R = R' * 255$$
6. Calculate the final **G** value: $$G = G' * 255$$
7. Calculate the final **B** value: $$B = B' * 255$$
