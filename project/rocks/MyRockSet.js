import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyUtils } from '../MyUtils.js'
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
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.rockTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.appearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.appearance.setSpecular(0.3, 0.3, 0.3, 1.0);

        this.rocks = [];
        this.yScale = [];
        this.xScale = [];
        this.zScale = [];
        let util = new MyUtils();
        for (let i = 0; i < this.row * this.col; i++) {
            const stacks = util.getRandomIntNum(10, 20);
            const slices = util.getRandomIntNum(40, 80);
            // Creates a new rock for each position in the set and randomizes its scale
            this.rocks[i] = new MyRock(this.scene, stacks, slices);
            this.yScale[i] = util.getRandomNum(4.0, 6.0);
            this.xScale[i] = util.getRandomNum(6.0, 12.0);
            this.zScale[i] = util.getRandomNum(6.0, 12.0);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(0, 5.0, 0);

        let height = 0;
        for (let i = this.row; i > 0; i--) {
            let rockIndex = 0;
            for (let j = 0; j < i; j++) {
                for (let k = 0; k < i; k++) {
                    this.scene.pushMatrix();
                    this.scene.translate(j * 15 - (i - 1) * 7.5, height, k * 15 - (i - 1) * 7.5);

                    this.scene.scale(this.xScale[rockIndex], this.yScale[rockIndex], this.zScale[rockIndex]);
                    this.rocks[rockIndex].display();

                    this.scene.popMatrix();
                    rockIndex++;
                }
            }
            height += 8.0;
        }
        this.scene.popMatrix();
    }
}