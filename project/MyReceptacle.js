import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyReceptacle
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.sphere = new MySphere(this.scene, 100, 100);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, "images/center.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.appearance.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}