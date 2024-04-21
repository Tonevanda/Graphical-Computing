import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyUtils } from './MyUtils.js';
/**
* MyPetal
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyPetal extends CGFobject {
    constructor(scene, radius, angle) {
        super(scene);
        this.radius = radius;
        this.angle = angle;
        this.initBuffers();
    }
    initBuffers() {
        let util = new MyUtils();
        this.triangle = new MyTriangle(this.scene);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, "images/petal.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.appearance.setDiffuse(util.getRandomNum(0.0, 1.0), util.getRandomNum(0.0, 1.0), util.getRandomNum(0.0, 1.0), 1.0);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
    }

    display() {
        this.appearance.apply();

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