import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyStem extends CGFobject {
    constructor(scene, radius, stemNum, leafHeight) {
        super(scene);
        this.radius = radius;
        this.stemNum = stemNum;
        this.leafHeight = leafHeight;
        this.leafAngle = 0.3;
        this.initBuffers();
    }
    initBuffers() {
        this.cylinder = new MyCylinder(this.scene, 100, 50);
        this.stemHeight = [];
        this.stemPos = [];
        for (let s = 0; s < this.stemNum; s++) {
            this.stemHeight[s] = Math.random() * (this.leafHeight * 4 - this.leafHeight * 3 + 1) + this.leafHeight * 3;
        }
        this.leaf = new MyLeaf(this.scene, this.radius, this.leafHeight, this.leafAngle);
        this.leafRotation = [];
        for (let l = 0; l < this.stemNum - 1; l++) {
            this.leafRotation[l] = Math.random() * (Math.PI + Math.PI + 1) - Math.PI;
        }
    }

    getPos() {
        return this.stemPos;
    }

    display() {
        this.stemPos = [0.0, 0.0, 0.0];
        for (let s = 0; s < this.stemNum; s++) {
            this.scene.pushMatrix();
            this.scene.translate(this.stemPos[0], this.stemPos[1], this.stemPos[2]);
            this.scene.scale(1, this.stemHeight[s], 1);

            this.scene.scale(this.radius, 1, this.radius);
            this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.cylinder.display();

            this.scene.popMatrix();
            this.stemPos[1] += this.stemHeight[s];
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
                zAcert = this.stemPos[2] - ((Math.cos(Math.PI / 2 + this.leafAngle) * this.leafHeight + (this.radius - Math.cos(this.leafAngle) * this.radius) + 0.1) * Math.sin(this.leafRotation[s])); //- Math.sin(this.leafRotation[s]);
                this.stemPos = [xAcert, yAcert, zAcert];
            }
        }
    }
}