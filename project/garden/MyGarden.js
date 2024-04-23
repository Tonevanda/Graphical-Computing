import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyUtils } from '../MyUtils.js'
/**
* MyGarden
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyGarden extends CGFobject {
    constructor(scene, row, col, triangle, sphere, cylinder) {
        super(scene);
        this.row = row;
        this.col = col;
        this.triangle = triangle;
        this.sphere = sphere;
        this.cylinder = cylinder;
        this.initBuffers();
    }
    initBuffers() {
        //appearances
        let petalAppearance = new CGFappearance(this.scene);
        petalAppearance.setTexture(new CGFtexture(this.scene, "images/petal.jpg"));
        petalAppearance.setTextureWrap('REPEAT', 'REPEAT');
        petalAppearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        petalAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        let receptacleAppearance = new CGFappearance(this.scene);
        receptacleAppearance.setTexture(new CGFtexture(this.scene, "images/center.jpg"));
        receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');
        receptacleAppearance.setAmbient(1.0, 1.0, 0.0, 1.0);
        receptacleAppearance.setDiffuse(1.0, 1.0, 0.0, 1.0);
        receptacleAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        let stemAppearance = new CGFappearance(this.scene);
        stemAppearance.setTexture(new CGFtexture(this.scene, "images/stem.jpeg"));
        stemAppearance.setTextureWrap('REPEAT', 'REPEAT');
        stemAppearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        stemAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        stemAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        let leafAppearance = new CGFappearance(this.scene);
        leafAppearance.setTexture(new CGFtexture(this.scene, "images/leaf.jpg"));
        leafAppearance.setTextureWrap('REPEAT', 'REPEAT');
        leafAppearance.setAmbient(0.0, 0.0, 0.0, 1.0);
        leafAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        leafAppearance.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.flowers = [];
        let util = new MyUtils();
        for (let i = 0; i < this.row * this.col; i++) {
            const petalNum = util.getRandomIntNum(10, 30);
            const receptacleRadius = util.getRandomNum(1.5, 4);
            const petalRadius = util.getRandomNum(receptacleRadius * 3 / 2, receptacleRadius * 2);
            const stemRadius = util.getRandomNum(receptacleRadius / 4, receptacleRadius / 3);
            const stemNum = util.getRandomIntNum(2, 4);
            this.flowers[i] = new MyFlower(this.scene, this.triangle, this.sphere, this.cylinder, petalRadius, petalNum, receptacleRadius, 0.4, -0.4, stemRadius, stemNum, petalAppearance, receptacleAppearance, stemAppearance, leafAppearance);
        }
        // 4*petalRadius*cos(Math.PI/5) + 2*receptacleRadius = 3 to 7
        // 4 * receptacleRadius *0.8 * 3 / 2 + 2* receptacleRadius = 6.8 * receptacleRadius = 3 to 7
    }

    updateGarden(rows, cols) {
        this.row = rows;
        this.col = cols;
        this.initBuffers();
    }

    display() {
        this.scene.translate(-this.col / 2 * 30, 0, -this.row / 2 * 30);
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