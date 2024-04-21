import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';
/**
* MyLeaf
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyLeaf extends CGFobject {
    constructor(scene, radius, height) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }
    initBuffers() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, "images/leaf.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.triangle = new MyTriangle(this.scene);
        this.cylinder = new MyCylinder(this.scene, 100, 50, this.appearance);
    }

    display() {
        this.appearance.apply();

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