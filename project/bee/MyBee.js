import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyEye } from './MyEye.js';
import { MyLeg } from './MyLeg.js';
import { MyWing } from './MyWing.js';
/**
* MyBee
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBee extends CGFobject {
    constructor(scene, triangle, sphere, cylinder) {
        super(scene);
        this.triangle = triangle;
        this.sphere = sphere;
        this.cylinder = cylinder;
        this.initBuffers();
    }
    initBuffers() {
        this.abdomenAppearance = new CGFappearance(this.scene);
        this.abdomenAppearance.setTexture(new CGFtexture(this.scene, "images/bee_abdomen.jpg"));
        this.abdomenAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.abdomenAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.abdomenAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.abdomenAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.toraxAppearance = new CGFappearance(this.scene);
        this.toraxAppearance.setTexture(new CGFtexture(this.scene, "images/fur.jpg"));
        this.toraxAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.toraxAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.toraxAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setTexture(new CGFtexture(this.scene, "images/bee_eye.jpg"));
        this.eyeAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.eyeAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eyeAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eyeAppearance.setSpecular(1.0, 1.0, 1.0, 1.0);

        this.legAppearance = new CGFappearance(this.scene);
        this.legAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.legAppearance.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.legAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.wingAppearance = new CGFappearance(this.scene);
        this.wingAppearance.setAmbient(1.0, 1.0, 1.0, 0.1);
        this.wingAppearance.setDiffuse(1.0, 1.0, 1.0, 0.2);
        this.wingAppearance.setSpecular(0.5, 0.5, 0.5, 0.1);
        this.wingAppearance.setEmission(1.0, 1.0, 1.0, 0.2);
        this.wingAppearance.setShininess(0);

        this.eye = new MyEye(this.scene, this.sphere);
        this.antenna = new MyLeg(this.scene, this.cylinder, 2, 0.05, [0.0, 0.3, 0.6], [0.0, -0.2, 0.9]);
        this.wing = new MyWing(this.scene, this.triangle);
        this.frontLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.5, 0.9, 0.3], [0.0, -0.2, 0.9, -0.3]);
        this.midLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.4, 1.1, 0.3], [0.0, -0.4, 0.9, 0]);
        this.backLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.6, 1, 0.3], [0.0, -0.2, 0.8, -0.2]);
    }

    display() {
        // Abdomen
        this.abdomenAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(2.8, -0.35, 0);
        this.scene.rotate(-0.2, 0, 0, 1);
        this.scene.scale(2, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.sphere.display();
        this.scene.popMatrix();

        // Torax
        this.toraxAppearance.setDiffuse(1.0, 1.0, 0.7, 1.0);
        this.toraxAppearance.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.2, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.sphere.display();
        this.scene.popMatrix();

        // Left Eye
        this.eyeAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.78, 0.2, 0.38);
        this.scene.rotate(0.4, 0, 1, 0);
        this.eye.display();
        this.sphere.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-1.78, 0.2, -0.38);
        this.scene.rotate(-0.4, 0, 1, 0);
        this.eye.display();
        this.sphere.display();
        this.scene.popMatrix();

        // Head
        this.toraxAppearance.setDiffuse(0.4, 0.4, 0.1, 1.0);
        this.toraxAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0, 0);
        this.scene.rotate(-0.3, 0, 0, 1)
        this.scene.scale(0.5, 0.8, 0.8);
        this.sphere.display();
        this.scene.popMatrix();

        //Left Antenna
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0.6, 0.2);
        this.scene.rotate(1.2, 0, 0, 1);
        this.scene.rotate(0.4, 0, 1, 0);
        this.antenna.display();
        this.scene.popMatrix();

        //Right Antenna
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0.6, -0.2);
        this.scene.rotate(1.2, 0, 0, 1);
        this.scene.rotate(-0.4, 0, 1, 0);
        this.antenna.display();
        this.scene.popMatrix();

        //Front Left Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.6, -0.2, 0.8);
        this.scene.rotate(-0.6, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.frontLeg.display();
        this.scene.popMatrix();

        //Mid Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.2, 0.9);
        this.scene.rotate(-0.2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.midLeg.display();
        this.scene.popMatrix();

        //Back Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.9, -0.2, 0.6);
        this.scene.rotate(0.8, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.backLeg.display();
        this.scene.popMatrix();

        //Front Right Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.6, -0.2, -0.8);
        this.scene.rotate(0.6, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.frontLeg.display();
        this.scene.popMatrix();

        //Mid Right Leg
        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.2, -0.9);
        this.scene.rotate(0.2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.midLeg.display();
        this.scene.popMatrix();

        //Back Right Leg
        this.scene.pushMatrix();
        this.scene.translate(0.9, -0.2, -0.6);
        this.scene.rotate(-0.8, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.backLeg.display();
        this.scene.popMatrix();

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        // Left Wing
        this.wingAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 2);
        this.wing.display();
        this.scene.popMatrix();

        // Right Wing
        this.wingAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, -2);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }
}