import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from './MyTriangleBig.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers(scene);
    }

    initBuffers(scene) {
        //Initialize scene objects
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall0 = new MyTriangleSmall(scene, 0);
        this.triangleSmall1 = new MyTriangleSmall(scene, 1);
        this.triangleBig0 = new MyTriangleBig(scene, 0);
        this.triangleBig1 = new MyTriangleBig(scene, 1);

        this.material = new CGFappearance(scene);
        this.material.loadTexture('images/tangram.png');
    }

    display() {
        var matrixTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -4.1, 2.1, 0, 1
        ];

        var matrixRotate = [
            Math.cos((45 * Math.PI) / 180), Math.sin((45 * Math.PI) / 180), 0, 0,
            - Math.sin((45 * Math.PI) / 180), Math.cos((45 * Math.PI) / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        // ---- BEGIN Primitive drawing section
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.multMatrix(matrixTranslate);
        this.scene.multMatrix(matrixRotate);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3.4, 2.82, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate((45 * Math.PI) / 180, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleBig0.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.triangleBig1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleSmall0.display();
        this.scene.translate(-3, 0, 0);
        this.triangleSmall1.display();
        this.scene.popMatrix();
        // ---- END Primitive drawing section
    }
}