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

    display(scene) {
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

        scene.pushMatrix();
        scene.multMatrix(matrixTranslate);
        scene.multMatrix(matrixRotate);
        this.diamond.display();
        scene.popMatrix();

        scene.scale(2, 2, 1);

        scene.pushMatrix();
        scene.translate(-1.7, 1.4, 0);
        scene.scale(0.5, -0.5, 1);
        scene.rotate((45 * Math.PI) / 180, 0, 0, 1);
        this.parallelogram.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(-0.5, 0.5, 0);
        scene.scale(0.5, 0.5, 1);
        this.triangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(0, 1, 0);
        scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleSmall.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(1, 0, 0);
        this.triangleSmall.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(-0.5, 0, 0);
        scene.scale(0.5, 0.5, 1);
        scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.triangleSmall.display();
        scene.translate(-3, 0, 0);
        this.triangleSmall.display();
        scene.popMatrix();

        scene.scale(0.5, 0.5, 1);
        

        // ---- END Primitive drawing section
    }
}