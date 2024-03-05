import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var step = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {

            var sin_ang = Math.sin(ang);
            var sin_next = Math.sin(ang + step);
            var cos_ang = Math.cos(ang);
            var cos_next = Math.cos(ang + step);

            var normal = [
                sin_next - sin_ang, cos_ang - cos_next, 0
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            this.vertices.push(cos_ang, sin_ang, 0);
            this.vertices.push(cos_next, sin_next, 0);
            this.vertices.push(cos_ang, sin_ang, 1);
            this.vertices.push(cos_next, sin_next, 1);

            this.indices.push((i * 4) + (i * 2 * (this.stacks - 1)), (i * 4) + (i * 2 * (this.stacks - 1)) + 1, (i * 4) + (i * 2 * (this.stacks - 1)) + 2);
            this.indices.push((i * 4) + (i * 2 * (this.stacks - 1)) + 3, (i * 4) + (i * 2 * (this.stacks - 1)) + 2, (i * 4) + (i * 2 * (this.stacks - 1)) + 1);

            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            for (var j = (1 / this.stacks); j < 1; j += (1 / this.stacks)) {
                this.vertices.push(cos_ang, sin_ang, j);
                this.vertices.push(cos_next, sin_next, j);

                this.normals.push(...normal);
                this.normals.push(...normal);
            }

            ang += step;
        }

        this.vertices.push(0, 0, 0);
        this.vertices.push(0, 0, 1);

        for (var i = 0; i < this.slices; i++) {
            this.indices.push((i * 4) + (i * 2 * (this.stacks - 1)), this.vertices.length / 3 - 2, (i * 4) + (i * 2 * (this.stacks - 1)) + 1);
            this.indices.push((i * 4) + (i * 2 * (this.stacks - 1)) + 3, this.vertices.length / 3 - 1, (i * 4) + (i * 2 * (this.stacks - 1)) + 2);


        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

