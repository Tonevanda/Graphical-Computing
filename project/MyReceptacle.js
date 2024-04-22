import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
/**
* MyReceptacle
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyReceptacle extends CGFobject {
    constructor(scene, sphere, radius) {
        super(scene);
        this.radius = radius;
        this.sphere = sphere;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}