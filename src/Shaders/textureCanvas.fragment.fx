precision highp float;

varying vec2 vLocalUV;
varying vec2 vWorldUV;

uniform sampler2D diffuseSampler;
uniform sampler2D opacitySampler;
uniform sampler2D backgroundSampler;

uniform vec4 diffuseSamplingRect;
uniform vec4 opacitySamplingRect;
uniform float opacityTextureIntensity;

void main(void) {
    vec4 backgroundPixel = texture2D(backgroundSampler, vWorldUV);
    vec4 diffusePixel = texture2D(diffuseSampler, vLocalUV * diffuseSamplingRect.zw + diffuseSamplingRect.xy);
    vec4 opacityPixel = texture2D(opacitySampler, vLocalUV * opacitySamplingRect.zw + opacitySamplingRect.xy);
    gl_FragColor = mix(backgroundPixel, diffusePixel, opacityPixel.a * opacityTextureIntensity + (1.0 - opacityTextureIntensity) * diffusePixel.a);
}
