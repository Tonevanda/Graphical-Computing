import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyUtils } from './MyUtils.js'
/**
* MyRockSet
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyRockSet extends CGFobject {
    constructor(scene, row, col, rockTexture) {
        super(scene);
        this.row = row;
        this.col = col;
        this.rockTexture = rockTexture;
        this.initBuffers();
    }
    
    initBuffers() {
        this.rocks = [];
        this.scale = []
        let util = new MyUtils();
        for (let i = 0; i < this.row * this.col; i++) {
            const stacks = util.getRandomIntNum(10, 20);
            const slices = util.getRandomIntNum(40, 80);
            // Creates a new rock for each position in the set and randomizes its scale
            this.rocks[i] = new MyRock(this.scene, stacks, slices, this.rockTexture);
            this.scale[i] = util.getRandomNum(0.5, 1.5);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0)
        for (let i = 0; i < this.row; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i * 5);
            for (let j = 0; j < this.col; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j * 5, 0, 0);

                this.scene.pushMatrix();
                this.scene.scale(this.scale[i * this.col + j], this.scale[i * this.col + j] / 2.5, this.scale[i * this.col + j]);
                this.rocks[i * this.col + j].display();
                this.scene.popMatrix();

                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}