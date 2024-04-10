import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyStem extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.cylinder = new MyCylinder(this.scene, 100, 50);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, 1, this.radius);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}