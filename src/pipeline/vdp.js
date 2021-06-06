const fragShader = `
#define SHADER_NAME VDP_POSTFX_FS

precision mediump float;

uniform sampler2D uMainSampler;

varying vec2 outTexCoord;
varying float outTintEffect;
varying vec4 outTint;

void main ()
{
    vec4 texture = texture2D(uMainSampler, outTexCoord);

    float r = floor(texture.r * 8.0) / 8.0;
    float g = floor(texture.g * 8.0) / 8.0;
    float b = floor(texture.b * 8.0) / 8.0;

    gl_FragColor = vec4(r, g, b, texture.w);
}
`;

export default class VDPPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline
{
    constructor (game)
    {
        super({
            game,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler'
            ]
        });
    }

    onPreRender ()
    {
    }
}