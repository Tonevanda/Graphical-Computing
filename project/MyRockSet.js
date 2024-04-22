import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.rockTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.appearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.appearance.setSpecular(0.3, 0.3, 0.3, 1.0);

        this.rocks = [];
        this.vertScale = []
        this.horScale = []
        let util = new MyUtils();
        for (let i = 0; i < this.row * this.col; i++) {
            const stacks = util.getRandomIntNum(10, 20);
            const slices = util.getRandomIntNum(40, 80);
            // Creates a new rock for each position in the set and randomizes its scale
            this.rocks[i] = new MyRock(this.scene, stacks, slices);
            this.vertScale[i] = util.getRandomNum(3.0, 5.0);
            this.horScale[i] = util.getRandomNum(3.0, 5.0);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(0, 1.0, 0)
        for (let i = 0; i < this.row; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i * 15);
            for (let j = 0; j < this.col; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j * 15, 0, 0);

                this.scene.pushMatrix();
                this.scene.scale(this.horScale[i * this.col + j], this.vertScale[i * this.col + j], this.horScale[i * this.col + j]);
                this.rocks[i * this.col + j].display();
                this.scene.popMatrix();

                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}