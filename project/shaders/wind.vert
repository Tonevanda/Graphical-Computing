attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {

    // Wind animation
    float windEffect = aVertexPosition.y * sin(timeFactor) * 0.1 * aVertexPosition.y;
    vec3 animatedPosition = aVertexPosition + vec3(0.0, 0.0, windEffect);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(animatedPosition, 1.0);
    
    vTextureCoord = aTextureCoord;
}