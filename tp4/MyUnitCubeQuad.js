import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textures) {
        super(scene);
        this.initBuffers(textures);
    }

    initBuffers(textures) {
        this.quad = new MyQuad(this.scene);
        if (textures != undefined && textures.length == 6) {
            this.material = new CGFappearance(this.scene);
            this.material.setAmbient(0.1, 0.1, 0.1, 1);
            this.material.setDiffuse(0.9, 0.9, 0.9, 1);
            this.material.setSpecular(0.1, 0.1, 0.1, 1);
            this.material.setShininess(10.0);
            this.textureTop = new CGFtexture(this.scene, textures[0]);
            this.textureFront = new CGFtexture(this.scene, textures[1]);
            this.textureRight = new CGFtexture(this.scene, textures[2]);
            this.textureBack = new CGFtexture(this.scene, textures[3]);
            this.textureLeft = new CGFtexture(this.scene, textures[4]);
            this.textureBottom = new CGFtexture(this.scene, textures[5]);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.applyTexture(this.textureFront);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.applyTexture(this.textureBack);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.applyTexture(this.textureRight);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.applyTexture(this.textureLeft);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.applyTexture(this.textureTop);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.applyTexture(this.textureBottom);
        this.quad.display();
        this.scene.popMatrix();
    }

    applyTexture(texture) {
        if (this.material != undefined) {
            this.material.setTexture(texture);
            this.material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
    }
}

