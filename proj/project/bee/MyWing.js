import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
/**
* MyWing
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyWing extends CGFobject {
    constructor(scene, triangle) {
        super(scene);
        this.triangle = triangle;
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(-0.3, 0, 1, 0);
        this.scene.scale(1.3, 1, 3);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.118, 0, 2.854);
        this.scene.rotate(2.489, 0, 1, 0);
        this.scene.scale(0.7, 1, 3.7);
        this.triangle.display();
        this.scene.popMatrix();
    }
}