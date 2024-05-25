import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
/**
* MyLeg
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyLeg extends CGFobject {
    constructor(scene, cylinder, legNum, radius, legLength, legRotation) {
        super(scene);
        this.cylinder = cylinder;
        this.legNum = legNum;
        this.radius = radius;
        this.legLength = legLength;
        this.legRotation = legRotation;
        this.initBuffers();
    }
    initBuffers() {
        this.pos = [];
    }

    display() {
        this.pos = [0.0, 0.0, 0.0];
        for (let l = 1; l <= this.legNum; l++) {
            let prevPoint = [this.pos[0] - this.radius * Math.cos(((l % 2 == 0) ? Math.PI : 0) + this.legRotation[l - 1]), this.pos[1] - this.radius * Math.sin(((l % 2 == 0) ? Math.PI : 0) + this.legRotation[l - 1])];
            let thisPoint = [this.pos[0] + this.radius * Math.cos(((l % 2 == 0) ? 0 : Math.PI) - this.legRotation[l]), this.pos[1] - this.radius * Math.sin(((l % 2 == 0) ? 0 : Math.PI) - this.legRotation[l])];
            let vector = [
                prevPoint[0] - thisPoint[0],
                prevPoint[1] - thisPoint[1]
            ];
            this.scene.pushMatrix();

            this.scene.translate(this.pos[0] + vector[0], this.pos[1] + vector[1], this.pos[2]);

            this.scene.rotate(this.legRotation[l], 0, 0, 1);

            this.scene.scale(this.radius, this.legLength[l], this.radius);
            this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.cylinder.display();

            this.scene.popMatrix();
            this.pos[0] += vector[0] + this.legLength[l] * Math.cos(Math.PI / 2 + this.legRotation[l]);
            this.pos[1] += vector[1] + this.legLength[l] * Math.sin(Math.PI / 2 + this.legRotation[l]);
        }
    }
}