import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';
/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.initBuffers();
    }
    initBuffers() {
        this.sphere = new MySphere(this.scene, 100, 100, true);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }
}