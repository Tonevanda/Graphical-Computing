# 2D Geometric Transformations

## Table of Contents

- [Types of Transformations](#types-of-transformations)
    - [Translation](#translation)
    - [Scaling](#scaling)
    - [Rotation](#rotation)
- [Homogeneous Coordinates](#homogeneous-coordinates)
    - [Translation Matrix](#translation-matrix)
    - [Escalation Matrix](#escalation-matrix)
    - [Rotation Matrix](#rotation-matrix)
- [Pivot Points](#pivot-points)
- [Inverse Transformations](#inverse-transformations)
    - [Inverse Translation](#inverse-translation)
    - [Inverse Scaling](#inverse-scaling)

## Types of Transformations

There are 3 types of transformations on a 2D plane:

- [Translation](#translation)
- [Scaling](#scaling)
- [Rotation](#rotation)

### Translation

Translation is changing the position of the object either horizontally or vertically, or both, in 2D, by adding a fixed value to every coordinate of a shape.

For every vertex, xT is defined as:

$$xT\ =\ x\ +\ Tx$$

where x is the original x value of the vertex, Tx is the translation value applied to x and xT is the new x value of the vertex.

Applying the same logic to the y axis, we get:

$$yT\ =\ y\ +\ Ty$$

We can represent this using matrices:

$$
\begin{bmatrix} 
xT \\ 
yT 
\end{bmatrix} = 
\begin{bmatrix} 
x \\ 
y 
\end{bmatrix} + 
\begin{bmatrix} 
Tx \\ 
Ty 
\end{bmatrix}$$

Representing this in a matrix multiplication:

$$\begin{bmatrix}
x_T \\ 
y_T 
\end{bmatrix} =  
\begin{bmatrix} 
1 & 0 & T_x \\ 
0 & 1 & T_y 
\end{bmatrix} \cdot 
\begin{bmatrix} 
x \\ 
y \\ 
1 
\end{bmatrix}$$


### Scaling

Scaling consists in multiplying every vertex's coordinate by a fixed value, making the shape increase in size.

For every vertex, xS is defined as:

$$x_S=\ x\ \cdot\ S_x$$

where x is the original x value of the vertex, Sx is the scaling value applied to x and xS is the new x value of the vertex.

Applying the same logic to the y axis we get:

$$y_S\ =\ y\ \cdot\ S_y$$

We can represent this in a matrix multiplication in the following way:

Scale factor:

- \> 1 Increases the object size
    
- < 1 Decreases the object size
    
- Sx = Sy Uniform scaling factor -> does not distort the object

### Rotation

Rotation consists in changing the direction which the object faces

In matrix form, we can define the rotation of an object in the following way:

Note: b is positive in the counter-clockwise direction

![rotation direction](/Classes/Notes/images/direction.png)


## Homogeneous Coordinates

Taking the first transformation sequence in the following image as an example

![order](/Classes/Notes/images/order.png)

We can write it as:

1.
$$
\begin{bmatrix}
x_{R1} \\
y_{R1}
\end{bmatrix} =
\begin{bmatrix}
cos(a) & -sin(a) \\
sin(a) & cos(a)
\end{bmatrix} \cdot
\begin{bmatrix}
x \\
y
\end{bmatrix}$$

2.
$$
\begin{bmatrix}
x_{T2} \\
y_{T2}
\end{bmatrix} =
\begin{bmatrix}
1 & 0 & T_x \\
0 & 1 & T_y
\end{bmatrix} \cdot
\begin{bmatrix}
x_{R1} \\
y_{R1} \\
1
\end{bmatrix}$$

<br>
However, the above transformations can also be written as homogeneous coordinates like so:

$$
\begin{bmatrix} 
x_{R1} & y_{R1} & 1 
\end{bmatrix} = 
\begin{bmatrix} 
cos(a) & -sin(a) & 0 \\ 
sin(a) & cos(a) & 0 \\ 
0 & 0 & 1 
\end{bmatrix} \cdot 
\begin{bmatrix} 
x \\ 
y \\ 
1 
\end{bmatrix} = R(a) \cdot 
\begin{bmatrix} 
x \\ 
y \\ 
1 
\end{bmatrix}$$

$$
\begin{bmatrix} 
x_{T2} \\ 
y_{T2} 
\end{bmatrix} = 
\begin{bmatrix} 
1 & 0 & T_x \\ 
0 & 1 & T_y \\ 
0 & 0 & 1 
\end{bmatrix} \cdot 
\begin{bmatrix} 
x_R1 \\ 
y_R1 \\ 
1 
\end{bmatrix} = T(T_x,T_y) \cdot 
\begin{bmatrix} 
x_{R1} \\ 
y_{R1} \\ 
1 
\end{bmatrix}$$


By representing the rotation of angle _a_ as R(a) and the translation as T(Tx, Ty) we can then write:


$$
\begin{bmatrix} 
x_{R2} \\ 
y_{R2} \\ 
1 
\end{bmatrix} = T(T_x,T_y) \cdot R(a) \cdot 
\begin{bmatrix} 
x \\ 
y \\ 
1 
\end{bmatrix}$$


In homogeneous coordinates, an object in _n_ dimensions is represented in a space of _n+1_ dimensions

The following are the standard homogeneous coordinates of every transformation:

- [Translation Matrix](#translation-matrix)
- [Escalation Matrix](#escalation-matrix)
- [Rotation Matrix](#rotation-matrix)

### Translation Matrix

The translation matrix can be written as:

$$
T(T_x,T_y) =
\begin{bmatrix}
1 & 0 & T_x \\
0 & 1 & T_y \\
0 & 0 & 1
\end{bmatrix}$$

A translation followed by another translation can be written as:

$$
\begin{bmatrix}
1 & 0 & d_{x2} \\
0 & 1 & d_{y2} \\
0 & 0 & 1
\end{bmatrix} \cdot
\begin{bmatrix}
1 & 0 & d_{x1} \\
0 & 1 & d_{y1} \\
0 & 0 & 1
\end{bmatrix} =
\begin{bmatrix}
1 & 0 & d_{x2} + d_{x1} \\
0 & 1 & d_{y2} + d_{y1} \\
0 & 0 & 1
\end{bmatrix}$$

As such:

$$T(d_{x2},d_{y2}) * T(d_{x1},d_{y1}) = T(d_{x2} + d_{x1},d_{y2} + d_{y1})$$

### Escalation Matrix

The escalation matrix can be written as:

$$
S(S_x,S_y) =
\begin{bmatrix}
S_x & 0 & 0 \\
0 & S_y & 0 \\
0 & 0 & 1
\end{bmatrix}$$

A scaling followed by another scaling can be written as:

$$
\begin{bmatrix}
S_{x2} & 0 & 0 \\
0 & S_{y2} & 0 \\
0 & 0 & 1
\end{bmatrix} 
\cdot
\begin{bmatrix}
S_{x1} & 0 & 0 \\
0 & S_{y1} & 0 \\
0 & 0 & 1
\end{bmatrix} =
\begin{bmatrix}
S_{x2} * S_{x1} & 0 & 0 \\
0 & S_{y2} * S_{y1} & 0 \\
0 & 0 & 1
\end{bmatrix}$$

As such:

$$S(s_{x2},s_{y2}) * S(s_{x1},s_{y1}) = S(s_{x2} * s_{x1},s_{y2} * s_{y1})$$

### Rotation Matrix

The rotation matrix can be written as:

$$
R(a) = 
\begin{bmatrix} 
cos(a) & -sin(a) & 0 \\ 
sin(a) & cos(a) & 0 \\ 
0 & 0 & 1 
\end{bmatrix}$$

A rotation followed by another rotation can be written as:

$$
\begin{bmatrix}
cos(b) & -sin(b) & 0 \\
sin(b) & cos(b) & 0 \\
0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
cos(a) & -sin(a) & 0 \\
sin(a) & cos(a) & 0 \\
0 & 0 & 1
\end{bmatrix} =
\begin{bmatrix}
cos(a+b) & -sin(a+b) & 0 \\
sin(a+b) & cos(a+b) & 0 \\
0 & 0 & 1
\end{bmatrix}$$

As such:

$$R(b) * R(a) = R(b+a)$$

## Pivot Points

To make transformations on an arbitrary point (pivot) of an object, we can:

1. Translate the object so that the pivot coincides with the origin
    
2. Apply the desired transformations
    
3. Translate the object so that the pivot returns to its original position

![pivot](/Classes/Notes/images/pivot.png)

## Inverse Transformations

If a complex transformation is given by a matrix _M_, then the inverse transformation _M1_ is the one that puts the object in its initial position.

- [Inverse Translation](#inverse-translation)
- [Inverse Scaling](#inverse-scaling)

### Inverse Translation

Given a translation T, the inverse translation is defined as:

$$
T^{-1} =
\begin{bmatrix}
1 & 0 & -t_x \\
0 & 1 & -t_y \\
0 & 0 & 1
\end{bmatrix}$$

### Inverse Scaling

Given a scaling S, the inverse scaling is defined as:

$$
S^{-1} =
\begin{bmatrix}
\frac{1}{s_x} & 0 & 0 \\
0 & \frac{1}{s_y} & 0 \\
0 & 0 & 1
\end{bmatrix}$$
