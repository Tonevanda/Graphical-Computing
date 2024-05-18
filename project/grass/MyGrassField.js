import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyBladeGrass } from './MyBladeGrass.js';
import { MyUtils } from '../MyUtils.js'

/**
* MyGrassField
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyGrassField extends CGFobject {
    constructor(scene, row = 50, col = 50) {
        super(scene);
        this.row = row;
        this.col = col;
        this.util = new MyUtils();
        this.initBuffers();
    }
    initBuffers() {

        this.grassBlades = [];
        for (let i = 0; i < this.row * this.col; i++) {
            const height = this.util.getRandomIntNum(3, 5);
            this.grassBlades[i] = new MyBladeGrass(this.scene, 10, height);
        }
    }

    updateGrassField(rows, cols) {
        this.row = rows;
        this.col = cols;
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-this.col / 2, 0, -this.row / 2);
        for (let i = 0; i < this.row; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i);
            for (let j = 0; j < this.col; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j, 0, 0);
                this.grassBlades[i * this.col + j].display();
                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}