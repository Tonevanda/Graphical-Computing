attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform sampler2D uSampler2;
uniform float normScale;

varying vec2 vTextureCoord;

void main() {
	
	vTextureCoord = aTextureCoord;

	vec3 offset = aVertexNormal * 0.1 * texture2D(uSampler2, vTextureCoord + vec2(timeFactor * 0.005, timeFactor * 0.005)).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

