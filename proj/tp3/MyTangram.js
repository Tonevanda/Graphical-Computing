import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "../tp2/MyDiamond.js";
import { MyParallelogram } from "../tp2/MyParallelogram.js";
import { MyTriangle } from "../tp2/MyTriangle.js";
import { MyTriangleSmall } from "../tp2/MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers(scene);
        this.initMaterials();
    }

    initBuffers(scene) {
        //Initialize scene objects
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
    }

    initMaterials() {
        // Green head
        this.greenHead = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#00FF00");
        this.greenHead.setAmbient(...color);
        this.greenHead.setDiffuse(...color);
        this.greenHead.setSpecular(...color);
        this.greenHead.setShininess(10.0);

        // Yellow neck
        this.yellowNeck = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#FFFF00");
        this.yellowNeck.setAmbient(...color);
        this.yellowNeck.setDiffuse(...color);
        this.yellowNeck.setSpecular(...color);
        this.yellowNeck.setShininess(10.0);

        // Pink upper body
        this.pinkUpperBody = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#FFC0CB");
        this.pinkUpperBody.setAmbient(...color);
        this.pinkUpperBody.setDiffuse(...color);
        this.pinkUpperBody.setSpecular(...color);
        this.pinkUpperBody.setShininess(10.0);

        // Orange mid body
        this.orangeMidBody = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#FFA500");
        this.orangeMidBody.setAmbient(...color);
        this.orangeMidBody.setDiffuse(...color);
        this.orangeMidBody.setSpecular(...color);
        this.orangeMidBody.setShininess(10.0);

        // Blue lower body
        this.blueLowerBody = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#0000FF");
        this.blueLowerBody.setAmbient(...color);
        this.blueLowerBody.setDiffuse(...color);
        this.blueLowerBody.setSpecular(...color);
        this.blueLowerBody.setShininess(10.0);

        // Purple front leg
        this.purpleFrontLeg = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#800080");
        this.purpleFrontLeg.setAmbient(...color);
        this.purpleFrontLeg.setDiffuse(...color);
        this.purpleFrontLeg.setSpecular(...color);
        this.purpleFrontLeg.setShininess(10.0);

        // Red back leg
        this.redBackLeg = new CGFappearance(this.scene);
        var color = this.scene.hexToRgbA("#FF0000");
        this.redBackLeg.setAmbient(...color);
        this.redBackLeg.setDiffuse(...color);
        this.redBackLeg.setSpecular(...color);
        this.redBackLeg.setShininess(10.0);
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
        this.greenHead.apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        this.scene.scale(2, 2, 1);
        
        this.scene.pushMatrix();
        this.scene.translate(-1.7, 1.4, 0);
        this.scene.scale(0.5, -0.5, 1);
        this.scene.rotate((45 * Math.PI) / 180, 0, 0, 1);
        this.yellowNeck.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.pinkUpperBody.apply();
        this.triangle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.orangeMidBody.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.blueLowerBody.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.scene.rotate((180 * Math.PI) / 180, 0, 0, 1);
        this.purpleFrontLeg.apply();
        this.triangleSmall.display();
        this.scene.translate(-3, 0, 0);
        this.redBackLeg.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        
        this.scene.scale(0.5, 0.5, 1);
        
        
        // ---- END Primitive drawing section
    }
    
    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.triangleSmall.enableNormalViz();
    }
    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.triangleSmall.disableNormalViz();
    }

}