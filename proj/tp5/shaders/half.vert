attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
varying vec4 coords;

void main() {
	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);

    gl_Position = uPMatrix * uMVMatrix * vertex;

    coords = gl_Position;
}
