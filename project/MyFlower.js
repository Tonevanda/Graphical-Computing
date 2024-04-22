import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyUtils } from './MyUtils.js';
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
    constructor(scene, triangle, sphere, cylinder, petalRadius, petalNum, receptacleRadius, unionMax, unionMin, stemRadius, stemNum, petalAppearance, receptacleAppearance, stemAppearance, leafAppearance) {
        super(scene);
        this.petalRadius = petalRadius;
        this.petalNum = petalNum;
        this.receptacleRadius = receptacleRadius;
        this.unionMax = unionMax;
        this.unionMin = unionMin;
        this.stemRadius = stemRadius;
        this.stemNum = stemNum;
        this.petalAppearance = petalAppearance;
        this.receptacleAppearance = receptacleAppearance;
        this.initBuffers(triangle, sphere, cylinder, stemAppearance, leafAppearance);
    }
    initBuffers(triangle, sphere, cylinder, stemAppearance, leafAppearance) {
        let util = new MyUtils();
        this.petal = new MyPetal(this.scene, triangle, this.petalRadius, Math.PI / 5);
        this.stem = new MyStem(this.scene, triangle, cylinder, this.stemRadius, this.stemNum, this.receptacleRadius * 2, stemAppearance, leafAppearance);
        this.stemPos = [];
        this.receptacle = new MyReceptacle(this.scene, sphere, this.receptacleRadius);
        this.unionAngle = [];
        for (let p = 0; p < this.petalNum; p++) {
            this.unionAngle[p] = util.getRandomNum(this.unionMin, this.unionMax);
        }
        this.petalColor = [util.getRandomNum(0.0, 1.0), util.getRandomNum(0.0, 1.0), util.getRandomNum(0.0, 1.0)];
    }

    display() {
        this.petalAppearance.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        //stem
        this.stem.display();
        this.stemPos = this.stem.getPos();
        //receptacle
        this.receptacleAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.stemPos[0], this.stemPos[1] + this.receptacleRadius - 1, this.stemPos[2]);
        this.receptacle.display();
        this.scene.popMatrix();
        //petal
        this.petalAppearance.apply();
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