import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
/**
* MyEye
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyEye extends CGFobject {
    constructor(scene, sphere) {
        super(scene);
        this.sphere = sphere;
        this.initBuffers();
    }

    display() {
        this.scene.rotate(-0.35, 0, 0, 1);
        this.scene.scale(0.2, 0.35, 0.25);
        this.sphere.display();
    }
}