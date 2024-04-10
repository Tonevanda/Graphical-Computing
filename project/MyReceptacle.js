import { CGFobject } from '../lib/CGF.js';
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
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}