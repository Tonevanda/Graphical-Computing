import { CGFobject } from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

        for (var i = 0; i <= this.slices; i++) {

            var sin_ang = Math.sin(ang);
            var cos_ang = Math.cos(ang);

            var normal = [
                cos_ang, sin_ang, 0
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
            this.vertices.push(cos_ang, sin_ang, 1);

            this.normals.push(...normal);
            this.normals.push(...normal);

            for (var j = (1 / this.stacks); j < 1; j += (1 / this.stacks)) {
                this.vertices.push(cos_ang, sin_ang, j);
                this.normals.push(...normal);
            }

            if (i == 0) continue;

            this.indices.push(((i - 1) * 2) + (i - 1) * (this.stacks - 1), (i * 2) + i * (this.stacks - 1), ((i - 1) * 2) + (i - 1) * (this.stacks - 1) + 1);
            this.indices.push(((i - 1) * 2) + (i - 1) * (this.stacks - 1) + 1, (i * 2) + i * (this.stacks - 1), (i * 2) + i * (this.stacks - 1) + 1);

            ang += step;
        }

        this.indices.push((this.slices * 2) + this.slices * (this.stacks - 1), 0, (this.slices * 2) + this.slices * (this.stacks - 1) + 1);
        this.indices.push((this.slices * 2) + this.slices * (this.stacks - 1) + 1, 0, 1);

        this.vertices.push(0, 0, 0);
        this.vertices.push(0, 0, 1);

        for (var i = 0; i < this.slices; i++) {
            this.indices.push((i * 2) + (i * (this.stacks - 1)), this.vertices.length / 3 - 2, ((i + 1) * 2) + (i + 1) * (this.stacks - 1));
            this.indices.push(((i + 1) * 2) + (i + 1) * (this.stacks - 1) + 1, this.vertices.length / 3 - 1, (i * 2) + (i * (this.stacks - 1)) + 1);
        }
        this.indices.push((this.slices * 2) + (this.slices * (this.stacks - 1)), this.vertices.length / 3 - 2, 0);
        this.indices.push(1, this.vertices.length / 3 - 1, (this.slices * 2) + (this.slices * (this.stacks - 1)) + 1);

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    /**
 * Called when user interacts with GUI to change object's complexity.
 * @param {integer} complexity - changes number of slices
 */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

