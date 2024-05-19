import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { CGFtexture } from '../../lib/CGF.js';
/**
* MyHive
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyHive extends CGFobject {
    constructor(scene, cube) {
        super(scene);
        this.cube = cube;
        this.initBuffers();
    }

    initBuffers() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, "images/wood.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
    }

    display() {
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 35, 0);
        this.scene.scale(25, 40, 25);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, 10, 10);
        this.scene.scale(3, 35, 3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-10, 10, 10);
        this.scene.scale(3, 35, 3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, 10, -10);
        this.scene.scale(3, 35, 3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-10, 10, -10);
        this.scene.scale(3, 35, 3);
        this.cube.display();
        this.scene.popMatrix();
    }

}