import { CGFobject, CGFappearance } from '../../lib/CGF.js';
/**
 * MyBladeGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBladeGrass extends CGFobject {
    constructor(scene, stacks = 10, height = 5, width = 2) {
        super(scene);
        this.stacks = stacks;
        this.height = height / stacks;
        this.width = width;
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        // Front Face

        for (var i = 0; i < this.stacks - 1; i++) {

            this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - (i + 1)), (i + 1) * this.height, 0); // top right
            this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - (i + 1)), (i + 1) * this.height, 0); // top left
            this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom right
            this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom left

            this.normals.push(0, 0, 1); // top right
            this.normals.push(0, 0, 1); // top left
            this.normals.push(0, 0, 1); // bottom right
            this.normals.push(0, 0, 1); // bottom left

            this.indices.push(i * 4, i * 4 + 1, i * 4 + 2); // first triangle
            this.indices.push(i * 4 + 1, i * 4 + 3, i * 4 + 2); // second triangle

            this.texCoords.push(1, (i + 1) / this.stacks); // top right
            this.texCoords.push(0, (i + 1) / this.stacks); // top left
            this.texCoords.push(1, i / this.stacks); // bottom right
            this.texCoords.push(0, i / this.stacks); // bottom left
        }

        // Triangle on top

        this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom left
        this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom right
        this.vertices.push(0, (i + 1) * this.height, 0); // top

        this.normals.push(0, 0, 1); // bottom left
        this.normals.push(0, 0, 1); // bottom right
        this.normals.push(0, 0, 1); // top

        this.indices.push(i * 4, i * 4 + 1, i * 4 + 2);
        this.indices.push(i * 4, i * 4 + 2, i * 4 + 1);

        this.texCoords.push(0, i / this.stacks); // bottom left
        this.texCoords.push(1, i / this.stacks); // bottom right
        this.texCoords.push(0, (i + 1) / this.stacks); // top

        // Back Face

        for (var i = 0; i < this.stacks - 1; i++) {
            this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - (i + 1)), (i + 1) * this.height, 0); // top right
            this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - (i + 1)), (i + 1) * this.height, 0); // top left
            this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom right
            this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom left

            this.normals.push(0, 0, -1); // top right
            this.normals.push(0, 0, -1); // top left
            this.normals.push(0, 0, -1); // bottom right
            this.normals.push(0, 0, -1); // bottom left

            this.indices.push(i * 4, i * 4 + 2, i * 4 + 1); // first triangle
            this.indices.push(i * 4 + 1, i * 4 + 2, i * 4 + 3); // second triangle

            this.texCoords.push(1, (i + 1) / this.stacks); // top right
            this.texCoords.push(0, (i + 1) / this.stacks); // top left
            this.texCoords.push(1, i / this.stacks); // bottom right
            this.texCoords.push(0, i / this.stacks); // bottom left
        }

        // Triangle on top

        this.vertices.push(-((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom left
        this.vertices.push(((this.width / 2) / this.stacks) * (this.stacks - i), i * this.height, 0); // bottom right
        this.vertices.push(0, (i + 1) * this.height, 0); // top

        this.normals.push(0, 0, -1); // bottom left
        this.normals.push(0, 0, -1); // bottom right
        this.normals.push(0, 0, -1); // top

        this.indices.push(i * 4, i * 4 + 2, i * 4 + 1);

        this.texCoords.push(1, i / this.stacks); // bottom right
        this.texCoords.push(0, i / this.stacks); // bottom left
        this.texCoords.push(0, (i + 1) / this.stacks); // top

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}