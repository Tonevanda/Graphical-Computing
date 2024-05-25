precision mediump float;

uniform sampler2D panoramaTexture;
uniform sampler2D cloudHeightMap;
uniform float timeFactor;

varying vec2 texCoords;

void main() {

    vec4 panoramaColor = texture2D(panoramaTexture, texCoords);
    
    float height = texCoords.y;
    
    if (height < 0.375 && height > 0.02) {
        
        vec2 movingTexCoords = fract(texCoords + vec2(0.0, timeFactor * 0.0025));
        
        float heightmapValue = texture2D(cloudHeightMap, movingTexCoords).r;
        
        if (heightmapValue > 0.6) {

            vec4 mixColor = vec4(1.0, 1.0, 1.0, 1.0);
            
            panoramaColor = mix(panoramaColor, mixColor, heightmapValue);
        }
    }
    
    gl_FragColor = panoramaColor;
}