import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
/**
* MyPetal
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyPetal extends CGFobject {
    constructor(scene, triangle, radius, angle) {
        super(scene);
        this.radius = radius;
        this.angle = angle;
        this.triangle = triangle;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.radius, 0, 0);
        this.scene.rotate(-this.angle, 0, 0, 1);
        this.scene.scale(this.radius, 1, this.radius);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.radius, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(this.radius, 1, this.radius);
        this.triangle.display();
        this.scene.popMatrix();
    }
}