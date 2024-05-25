import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyCylinder } from '../shapes/MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';
import { MyUtils } from '../MyUtils.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyStem extends CGFobject {
    constructor(scene, triangle, cylinder, radius, stemNum, leafHeight, stemAppearance, leafAppearance) {
        super(scene);
        this.cylinder = cylinder;
        this.radius = radius;
        this.stemNum = stemNum;
        this.leafHeight = leafHeight;
        this.stemAppearance = stemAppearance;
        this.leafAppearance = leafAppearance;
        this.initBuffers(triangle);
    }
    initBuffers(triangle) {
        let util = new MyUtils();
        this.stemHeight = [0.0];
        this.stemRotation = [0.0];
        this.stemPos = [];
        for (let s = 1; s <= this.stemNum; s++) {
            this.stemHeight[s] = util.getRandomNum(this.leafHeight, this.leafHeight * 2);
            this.stemRotation[s] = util.getRandomNum(0, Math.PI / 8) * ((s % 2 == 0) ? 1 : -1);
        }
        this.leaf = new MyLeaf(this.scene, triangle, this.cylinder, this.radius / 2, this.leafHeight);
    }

    getPos() {
        return this.stemPos;
    }

    display() {
        this.stemPos = [0.0, 0.0, 0.0];
        for (let s = 1; s <= this.stemNum; s++) {
            let prevPoint = [this.stemPos[0] - this.radius * Math.cos(((s % 2 == 0) ? Math.PI : 0) + this.stemRotation[s - 1]), this.stemPos[1] - this.radius * Math.sin(((s % 2 == 0) ? Math.PI : 0) + this.stemRotation[s - 1])];
            let thisPoint = [this.stemPos[0] + this.radius * Math.cos(((s % 2 == 0) ? 0 : Math.PI) - this.stemRotation[s]), this.stemPos[1] - this.radius * Math.sin(((s % 2 == 0) ? 0 : Math.PI) - this.stemRotation[s])];
            let vector = [
                prevPoint[0] - thisPoint[0],
                prevPoint[1] - thisPoint[1]
            ];
            this.scene.pushMatrix();

            this.scene.translate(this.stemPos[0] + vector[0], this.stemPos[1] + vector[1], this.stemPos[2]);

            if (s != 1) {
                this.scene.pushMatrix();
                if (s % 2 != 0) this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.rotate(0.2, 0, 0, 1);
                this.leafAppearance.apply();
                this.leaf.display();
                this.scene.popMatrix();
            }
            this.scene.rotate(this.stemRotation[s], 0, 0, 1);

            this.scene.scale(this.radius, this.stemHeight[s], this.radius);
            this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.stemAppearance.apply();
            this.cylinder.display();

            this.scene.popMatrix();
            this.stemPos[0] += vector[0] + this.stemHeight[s] * Math.cos(Math.PI / 2 + this.stemRotation[s]);
            this.stemPos[1] += vector[1] + this.stemHeight[s] * Math.sin(Math.PI / 2 + this.stemRotation[s]);
            /*
            if (s != this.stemNum - 1) {
                this.scene.pushMatrix();
                let xAcert = this.stemPos[0] + ((this.radius - Math.cos(this.leafAngle) * this.radius) * Math.cos(this.leafRotation[s]));
                let yAcert = this.stemPos[1] - (Math.sin(this.leafAngle) * this.radius);
                let zAcert = this.stemPos[2] - ((this.radius - Math.cos(this.leafAngle) * this.radius) * Math.sin(this.leafRotation[s]));
                this.scene.translate(xAcert, yAcert, zAcert);
                this.scene.rotate(this.leafRotation[s], 0, 1, 0);
                this.leaf.display();
                this.scene.popMatrix();
                xAcert = this.stemPos[0] + ((Math.cos(Math.PI / 2 + this.leafAngle) * this.leafHeight + (this.radius - Math.cos(this.leafAngle) * this.radius) + 0.1) * Math.cos(this.leafRotation[s]));
                yAcert = this.stemPos[1] + (Math.sin(Math.PI / 2 + this.leafAngle) * this.leafHeight) - (Math.sin(this.leafAngle) * this.radius) * 2;
                zAcert = this.stemPos[2] - ((Math.cos(Math.PI / 2 + this.leafAngle) * this.leafHeight + (this.radius - Math.cos(this.leafAngle) * this.radius) + 0.1) * Math.sin(this.leafRotation[s]));
                this.stemPos = [xAcert, yAcert, zAcert];
            }*/
        }
    }
}