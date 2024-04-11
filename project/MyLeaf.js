import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPetal } from './MyPetal.js';
/**
* MyLeaf
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyLeaf extends CGFobject {
    constructor(scene, radius, height, angle) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.angle = angle;
        this.initBuffers();
    }
    initBuffers() {
        this.petal = new MyPetal(this.scene, this.radius * 3, 0.5);
        this.cylinder = new MyCylinder(this.scene, 100, 50);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, 1);
        this.scene.scale(this.radius, this.height, this.radius);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, 1);
        this.scene.translate(0, this.height / 2, 0);
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-this.angle, 0, 0, 1);
        this.scene.translate(-this.radius, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.petal.display();
        this.scene.popMatrix();
    }
}