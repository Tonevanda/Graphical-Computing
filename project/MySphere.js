import { CGFobject } from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted = false) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var step = 2 * Math.PI / this.slices;
        var stackStep = Math.PI / this.stacks;

        for (var i = 0; i <= this.slices; i++) {
            for (var j = 0; j <= this.stacks; j++) {
                var sin_ang = Math.sin(ang);
                var cos_ang = Math.cos(ang);
                var sin_stack = Math.sin(stackStep * j - Math.PI / 2);
                var cos_stack = Math.cos(stackStep * j - Math.PI / 2);

                var x = cos_ang * cos_stack;
                var y = sin_ang * cos_stack;
                var z = sin_stack;

                this.vertices.push(x, y, z);
                (this.inverted) ? this.normals.push(-x, -y, -z) : this.normals.push(x, y, z);

                if (i > 0 && j > 0) {
                    var vertices = this.vertices.length / 3;
                    if (this.inverted) {
                        this.indices.push(vertices - 1, vertices - 2, vertices - this.stacks - 3);
                        this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - this.stacks - 2);
                    } else {
                        this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - 2);
                        this.indices.push(vertices - 1, vertices - this.stacks - 2, vertices - this.stacks - 3);
                    }
                }
            }
            ang += step;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}