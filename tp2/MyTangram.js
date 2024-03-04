import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

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
        this.triangleSmall = new MyTriangleSmall(scene);
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

        this.scene.pushMatrix();
        this.scene.multMatrix(matrixTranslate);
        this.scene.multMatrix(matrixRotate);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.scale(2, 2, 1);

        this.scene.pushMatrix();
        this.scene.translate(-1.7, 1.4, 0);
        this.scene.scale(0.5, -0.5, 1);
        this.scene.rotate((45 * Math.PI) / 180, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.translate(-3, 0, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.scale(0.5, 0.5, 1);
        

        // ---- END Primitive drawing section
    }
}