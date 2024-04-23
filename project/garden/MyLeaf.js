import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
/**
* MyLeaf
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyLeaf extends CGFobject {
    constructor(scene, triangle, cylinder, radius, height) {
        super(scene);
        this.triangle = triangle;
        this.cylinder = cylinder;
        this.radius = radius;
        this.height = height;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.height, this.radius, this.radius);
        this.scene.rotate(Math.PI / 2.0, 0, 1, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.height * 5 / 8, 0, this.radius);
        this.scene.scale(this.height * 3 / 4, 0, this.height * 3 / 4)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.height * 5 / 8, 0, -this.radius);
        this.scene.scale(this.height * 3 / 4, 0, this.height * 3 / 4)
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

    }
}