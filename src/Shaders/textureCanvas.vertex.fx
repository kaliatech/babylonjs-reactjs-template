// Attributes
attribute vec2 position;

// Output
varying vec2 vPosition;
varying vec2 vLocalUV;
varying vec2 vWorldUV;

// Uniforms
uniform mat4 rotationMatrix;
uniform vec2 pivotPoint;
uniform vec2 translation;
uniform vec2 scaling;
uniform vec2 skewing;

const vec2 madd = vec2(0.5, 0.5);

void main(void) {
    vec2 skewed = vec2(position.x + skewing.x * position.y, position.y + skewing.y * position.x);
    vec2 transformed = (vec4(skewed * scaling + translation - pivotPoint, 0.0, 0.0) * rotationMatrix).xy + pivotPoint;

    gl_Position = vec4(transformed, 0.0, 1.0);

    vPosition = position;
	vLocalUV = position * madd + madd;
    vWorldUV = gl_Position.xy * madd + madd;
}
