import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyUtils } from './MyUtils.js'
/**
* MyGarden
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyGarden extends CGFobject {
    constructor(scene, row, col) {
        super(scene);
        this.row = row;
        this.col = col;
        this.initBuffers();
    }
    initBuffers() {
        this.flowers = [];
        let util = new MyUtils();
        for (let i = 0; i < this.row * this.col; i++) {
            const petalRadius = util.getRandomNum(7, 20);
            const petalNum = util.getRandomIntNum(20, 50);
            const receptacleRadius = util.getRandomNum(5, 10);
            const stemRadius = util.getRandomNum(1, 5);
            const stemNum = util.getRandomIntNum(1, 5);
            this.flowers[i] = new MyFlower(this.scene, petalRadius, petalNum, receptacleRadius, 0.6, -0.6, stemRadius, stemNum)
            //this.flower = new MyFlower(this, 10, 30, 5, 0.4, -0.4, 3, 3);
        }

    }
    display() {
        for (let i = 0; i < this.row; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i * 30);
            for (let j = 0; j < this.col; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j * 30, 0, 0);
                this.flowers[i * this.col + j].display();
                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
    }
}