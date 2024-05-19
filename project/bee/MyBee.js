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
    constructor(scene, triangle, sphere, cylinder, pollen, pos, angle, velocity, pollenTexture) {
        super(scene);

        // Objects
        this.triangle = triangle;
        this.sphere = sphere;
        this.cylinder = cylinder;
        this.pollen = pollen;
        this.pos = pos;
        this.angle = angle;
        this.velocity = velocity;

        // Animations
        this.animVal = 0;
        this.wingAnimVal = 0;

        this.initBuffers(pollenTexture);
    }
    initBuffers(pollenTexture) {
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
        this.eyeAppearance.setDiffuse(0.2, 0.2, 0.2, 1.0);
        this.eyeAppearance.setSpecular(1.0, 1.0, 1.0, 1.0);

        this.pollenApperance = new CGFappearance(this.scene);
        this.pollenApperance.setTexture(pollenTexture);
        this.pollenApperance.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenApperance.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.pollenApperance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.pollenApperance.setSpecular(0.0, 0.0, 0.0, 1.0);

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

        this.goingDown = false;
        this.carryingPollen = false;
        this.goingHive = false;
        this.goingUp = false;
        this.flowerIndice = 0;
        this.closestFlower = [0, 0];
        this.flowerH = 0;
        this.yvelocity = 0;
        this.pollenSize = 0;
        this.hivePos = [0, 0];
        this.flowerSpacing = this.scene.garden.flowerSpacing;

        this.eye = new MyEye(this.scene, this.sphere);
        this.antenna = new MyLeg(this.scene, this.cylinder, 2, 0.05, [0.0, 0.3, 0.6], [0.0, -0.2, 0.9]);
        this.wing = new MyWing(this.scene, this.triangle);
        this.frontLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.5, 0.9, 0.3], [0.0, -0.2, 0.9, -0.3]);
        this.midLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.4, 1.1, 0.3], [0.0, -0.4, 0.9, 0]);
        this.backLeg = new MyLeg(this.scene, this.cylinder, 3, 0.08, [0.0, 0.6, 1, 0.3], [0.0, -0.2, 0.8, -0.2]);
    }

    reset() {
        this.pos = [0, 0, 0];
        this.velocity = 0;
        this.angle = 0;
        this.goingDown = false;
        this.goingHive = false;
        this.goingUp = false;
    }

    update(t, timeSinceAppStart) {
        this.animVal = Math.sin(timeSinceAppStart * 2 * Math.PI);
        this.wingAnimVal = Math.sin(timeSinceAppStart * 8 * Math.PI) / 2 - 0.5;

        this.pos[0] += t * Math.cos(this.angle) * Math.sqrt(Math.pow(Math.cos(this.angle) * this.velocity, 2) + Math.pow(Math.sin(this.angle) * this.velocity, 2));
        this.pos[2] += t * -Math.sin(this.angle) * Math.sqrt(Math.pow(Math.cos(this.angle) * this.velocity, 2) + Math.pow(Math.sin(this.angle) * this.velocity, 2));

        if (this.goingDown) {
            this.pos[1] -= t * this.yvelocity;

            if (this.pos[0] <= this.closestFlower[0] + 2 && this.pos[0] >= this.closestFlower[0] - 2 && this.pos[2] <= this.closestFlower[1] + 2 && this.pos[2] >= this.closestFlower[1] - 2 && this.pos[1] < -(50 - this.flowerH) + 2) {
                this.pos[0] = this.closestFlower[0];
                this.pos[2] = this.closestFlower[1];
                this.velocity = 0;
                this.goingDown = false;
            }
        } else if (this.pos[1] < 0 && this.goingUp) {
            if (this.scene.garden.flowers[this.flowerIndice].notTaken) this.carryingPollen = true;
            this.scene.garden.flowers[this.flowerIndice].notTaken = false;
            this.pos[1] += t * this.yvelocity;
        } else if (this.goingUp) {
            this.pos[1] = 0;
            this.yvelocity = 0;
            this.goingUp = false;
        }

        if (this.goingHive && this.carryingPollen && this.pos[0] <= this.hivePos[0] + 20 && this.pos[0] >= this.hivePos[0] - 20 && this.pos[2] <= this.hivePos[1] + 20 && this.pos[2] >= this.hivePos[1] - 20) {
            this.carryingPollen = false;
            this.velocity = 0;
            this.goingHive = false;
        }
    }

    turn(v) {
        if (this.pos[1] == 0 && !this.goingHive)
            this.angle += v;
    }

    accelerate(v) {
        if (this.pos[1] == 0 && !this.goingHive) {
            this.velocity += v;
            if (this.velocity < 0) {
                this.velocity = 0;
            }
        }
    }

    goDown(gardenRows, gardenColumns) {
        if (this.goingDown || this.carryingPollen || this.pos[1] < 0) return;
        let minDistance = Infinity;
        for (let i = 0; i < gardenRows; i++) {
            for (let j = 0; j < gardenColumns; j++) {
                let flowerPos = [j * this.flowerSpacing - ((this.flowerSpacing / 2) * gardenColumns - (this.flowerSpacing / 2)), i * this.flowerSpacing - ((this.flowerSpacing / 2) * gardenRows - (this.flowerSpacing / 2))]; // [x,z]
                console.log(flowerPos);
                let distance = Math.sqrt(Math.pow(flowerPos[0] - this.pos[0], 2) + Math.pow(flowerPos[1] - this.pos[2], 2));

                if (distance < minDistance) {
                    minDistance = distance;
                    this.flowerIndice = i * gardenColumns + j;
                    this.closestFlower = flowerPos;
                }
            }
        }
        // Info gathering
        this.flowerH = this.scene.garden.flowers[this.flowerIndice].stemPos[1] + this.scene.garden.flowers[this.flowerIndice].receptacleRadius * 5 / 3 + 1;
        this.pollenSize = this.scene.garden.flowers[this.flowerIndice].receptacleRadius / 3;
        this.closestFlower = [this.closestFlower[0] + this.scene.garden.flowers[this.flowerIndice].stemPos[0], this.closestFlower[1] + this.scene.garden.flowers[this.flowerIndice].stemPos[2]];

        //rotate
        let directionVector = [this.closestFlower[0] - this.pos[0], this.closestFlower[1] - this.pos[2]]
        this.angle = Math.atan2(-directionVector[1], directionVector[0]);

        console.log(this.flowerIndice);
        console.log(this.closestFlower);
        //y velocity calc
        let horizontalDist = Math.sqrt(Math.pow(directionVector[0], 2) + Math.pow(directionVector[1], 2));
        this.yvelocity = ((50 - this.flowerH) * this.velocity) / horizontalDist;
        if (this.yvelocity < 0.5) {
            this.yvelocity = 10;
            this.velocity = (this.yvelocity * horizontalDist) / (50 - this.flowerH);

        }

        this.goingDown = true;
    }

    goHive(x, z) {
        if (this.carryingPollen && !this.goingUp) {
            this.goingHive = true;
            this.hivePos = [x, z];
            let directionVector = [x - this.pos[0], z - this.pos[2]]
            this.angle = Math.atan2(-directionVector[1], directionVector[0]);
            if (this.velocity == 0) this.velocity = 20;
        }
    }

    display(scaleFactor) {
        this.scene.pushMatrix();
        this.scene.translate(0, this.animVal, 0);
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
        this.scene.rotate(Math.PI + this.angle, 0, 1, 0);
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

        //Pollen
        if (this.carryingPollen) {
            this.pollenApperance.apply();
            this.scene.pushMatrix();
            this.scene.translate(0, -this.pollenSize - 1, 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.scale(this.pollenSize, this.pollenSize, this.pollenSize);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        // Left Wing
        this.wingAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0.85);
        this.scene.rotate(this.wingAnimVal, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        // Right Wing
        this.wingAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, -0.85);
        this.scene.rotate(-this.wingAnimVal, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);

        this.scene.popMatrix();
    }
}