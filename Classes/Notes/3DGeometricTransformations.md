# 3D Geometric Transformations

3D Geometric Transformations expand upon 2D Geometric Transformations by including the Z coordinate.

| Axis | Positive direction of rotation |
| ---- | ---- |
| x | y to z |
| y | z to x |
| z | x to y |

Now with 3 dimensions, we need to add one more row and column to the matrices:

- 3D Translation
- 3D Scaling
- 3D Rotation

## 3D Translation

We can write a 3D translation as follows:

$$
\begin{bmatrix}
x_T \\
y_T \\
z_T \\
1
\end{bmatrix} =
\begin{bmatrix}
1 & 0 & 0 & T_x \\
0 & 1 & 0 & T_y \\
0 & 0 & 1 & T_z \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

## 3D Scaling

We can write a 3D scaling as follows:

$$\begin{bmatrix}
x_S \\
y_S \\
z_S \\
1
\end{bmatrix} =
\begin{bmatrix}
S_x & 0 & 0 & 0 \\
0 & S_y & 0 & 0 \\
0 & 0 & S_z & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}$$

## 3D Rotation

### Rotation around canonical axis

Rotation in 3D is a little more tricky, because it depends on the axis which we are rotation from. Therefore, there is a different form of writing a 3D rotation for each axis.

For a rotation around the Z axis, where Z remains constant:

$$
\begin{bmatrix}
x_{Rz} \\
y_{Rz} \\
z_{Rz} \\
1
\end{bmatrix} =
\begin{bmatrix}
cos(a) & -sin(a) & 0 & 0 \\
sin(a) & cos(a) & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

For a rotation around the X axis, where X remains constant:

$$
\begin{bmatrix}
x_{Rx} \\
y_{Rx} \\
z_{Rx} \\
1
\end{bmatrix} =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
cos(a) & -sin(a) & 0 & 0 \\
sin(a) & cos(a) & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

For a rotation around the Y axis, where Y remains constant:

$$
\begin{bmatrix}
x_{Ry} \\
y_{Ry} \\
z_{Ry} \\
1
\end{bmatrix} =
\begin{bmatrix}
cos(a) & sin(a) & 0 & 0 \\
0 & 1 & 0 & 0 \\
-sin(a) & cos(a) & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

### Rotation around non-canonical axis

For non-canonical axis, we need to apply the pivot point strategy, while also rotating the object so it coincides with one of the canonical axes:

1. Translate the object to place the axis of rotation passing through the origin of the coordinate system
2. Rotate the object so it coincide with a canonical axis of rotation
3. Apply the desired rotation upon this axis
4. Apply the inverse of the first rotation
5. Apply the inverse of the translation
