import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
* MyFlower
* @constructor
 * @param scene - Reference to MyScene object
 * @param petalRadius
 * @param petalNum
 * @param receptacleRadius
 * @param unionMax - Max angle at which the petals join the receptacle
 * @param unionMin - Min angle at which the petals join the receptacle
 * @param stemRadius
 * @param stemNum
*/
export class MyFlower extends CGFobject {
    constructor(scene, petalRadius, petalNum, receptacleRadius, unionMax, unionMin, stemRadius, stemNum) {
        super(scene);
        this.petalRadius = petalRadius;
        this.petalNum = petalNum;
        this.receptacleRadius = receptacleRadius;
        this.unionMax = unionMax;
        this.unionMin = unionMin;
        this.stemRadius = stemRadius;
        this.stemNum = stemNum;
        this.initBuffers();
    }
    initBuffers() {
        this.petal = new MyPetal(this.scene, this.petalRadius, Math.PI / 5);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemNum, this.receptacleRadius * 2);
        this.stemPos = [];
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius);
        this.unionAngle = [];
        for (let p = 0; p < this.petalNum; p++) {
            this.unionAngle[p] = Math.random() * (this.unionMax - this.unionMin + 0.1) + this.unionMin;
        }
    }

    display() {
        this.stem.display();
        this.stemPos = this.stem.getPos();
        this.scene.pushMatrix();
        this.scene.translate(this.stemPos[0], this.stemPos[1] + this.receptacleRadius - 1, this.stemPos[2]);
        this.receptacle.display();
        this.scene.popMatrix();
        for (let p = 0; p < this.petalNum; p++) {
            let pAngle = p * (2 * Math.PI / this.petalNum);
            this.scene.pushMatrix();
            this.scene.translate(this.stemPos[0] + (this.receptacleRadius - 1) * Math.cos(pAngle), this.stemPos[1] + this.receptacleRadius - 1, this.stemPos[2] + (this.receptacleRadius - 1) * -Math.sin(pAngle));
            this.scene.rotate(pAngle, 0, 1, 0);
            this.scene.rotate(this.unionAngle[p], 0, 0, 1);
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}