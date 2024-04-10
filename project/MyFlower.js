import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
* MyFlower
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyFlower extends CGFobject {
    constructor(scene, petalRadius, petalNum, receptacleRadius, unionMax, unionMin, stemRadius, stemHeight) {
        super(scene);
        this.petalRadius = petalRadius;
        this.petalNum = petalNum;
        this.receptacleRadius = receptacleRadius;
        this.unionMax = unionMax;
        this.unionMin = unionMin;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.initBuffers();
    }
    initBuffers() {
        this.petal = new MyPetal(this.scene, this.petalRadius, Math.PI / 5);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemHeight);
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius);
        this.unionAngle = [];
        for (var p = 0; p < this.petalNum; p++) {
            this.unionAngle[p] = Math.random() * (this.unionMax - this.unionMin + 0.1) + this.unionMin;
        }
    }

    display() {
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.translate(0, this.stemHeight + this.receptacleRadius - 1, 0);
        this.receptacle.display();
        this.scene.popMatrix();
        for (var p = 0; p < this.petalNum; p++) {
            this.scene.pushMatrix();
            this.scene.rotate(p * (2 * Math.PI / this.petalNum), 0, 1, 0);
            this.scene.translate(this.receptacleRadius - 1, this.stemHeight + this.receptacleRadius - 1, 0);
            this.scene.rotate(this.unionAngle[p], 0, 0, 1);
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}