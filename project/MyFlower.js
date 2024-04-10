import { CGFobject } from '../lib/CGF.js';
import { MyLeaf } from './MyLeaf.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
* MyFlower
* @constructor
 * @param scene - Reference to MyScene object
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
        this.leafAngle = 0.3;
        this.initBuffers();
    }
    initBuffers() {
        this.petal = new MyPetal(this.scene, this.petalRadius, Math.PI / 5);
        this.stem = new MyStem(this.scene, this.stemRadius);
        this.stemHeight = [];
        this.stemPos = [];
        for (var s = 0; s < this.stemNum; s++) {
            this.stemHeight[s] = Math.random() * (this.receptacleRadius * 4 - this.receptacleRadius * 3 + 1) + this.receptacleRadius * 3;
        }
        this.leaf = new MyLeaf(this.scene, this.stemRadius, this.receptacleRadius, this.leafAngle);
        this.leafRotation = [];
        for (var l = 0; l < this.stemNum - 1; l++) {
            this.leafRotation[l] = Math.random() * (Math.PI + Math.PI + 1) - Math.PI;
        }
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius);
        this.unionAngle = [];
        for (var p = 0; p < this.petalNum; p++) {
            this.unionAngle[p] = Math.random() * (this.unionMax - this.unionMin + 0.1) + this.unionMin;
        }
    }

    display() {
        this.stemPos = [0, 0, 0];
        for (var s = 0; s < this.stemNum; s++) {
            this.scene.pushMatrix();
            this.scene.translate(this.stemPos[0], this.stemPos[1], this.stemPos[2]);
            this.scene.scale(1, this.stemHeight[s], 1);
            this.stem.display();
            this.scene.popMatrix();
            this.stemPos[1] += this.stemHeight[s];
            if (s != this.stemNum - 1) {
                this.scene.pushMatrix();
                var xAcert = this.stemPos[0] + ((this.stemRadius - Math.cos(this.leafAngle) * this.stemRadius) * Math.cos(this.leafRotation[s]));
                var yAcert = this.stemPos[1] - (Math.sin(this.leafAngle) * this.stemRadius);
                var zAcert = this.stemPos[2] - ((this.stemRadius - Math.cos(this.leafAngle) * this.stemRadius) * Math.sin(this.leafRotation[s]));
                this.scene.translate(xAcert, yAcert, zAcert);
                this.scene.rotate(this.leafRotation[s], 0, 1, 0);
                this.leaf.display();
                this.scene.popMatrix();
                var xAcert = this.stemPos[0] + ((Math.cos(Math.PI / 2 + this.leafAngle) * this.receptacleRadius + (this.stemRadius - Math.cos(this.leafAngle) * this.stemRadius) + 0.1) * Math.cos(this.leafRotation[s]));
                var yAcert = this.stemPos[1] + (Math.sin(Math.PI / 2 + this.leafAngle) * this.receptacleRadius) - (Math.sin(this.leafAngle) * this.stemRadius) * 2;
                var zAcert = this.stemPos[2] - ((Math.cos(Math.PI / 2 + this.leafAngle) * this.receptacleRadius + (this.stemRadius - Math.cos(this.leafAngle) * this.stemRadius) + 0.1) * Math.sin(this.leafRotation[s])); //- Math.sin(this.leafRotation[s]);
                this.stemPos = [xAcert, yAcert, zAcert];
            }
        }

        this.scene.pushMatrix();
        this.scene.translate(this.stemPos[0], this.stemPos[1] + this.receptacleRadius - 1, this.stemPos[2]);
        this.receptacle.display();
        this.scene.popMatrix();
        for (var p = 0; p < this.petalNum; p++) {
            this.scene.pushMatrix();
            this.scene.rotate(p * (2 * Math.PI / this.petalNum), 0, 1, 0);
            this.scene.translate(this.receptacleRadius - 1, this.stemPos[1] + this.receptacleRadius - 1, 0);
            this.scene.rotate(this.unionAngle[p], 0, 0, 1);
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}