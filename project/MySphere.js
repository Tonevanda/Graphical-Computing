import { CGFobject } from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param inverted - whether the sphere is seen from inside or outside
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
        this.texCoords = [];

        var step = 2 * Math.PI / this.slices;
        var stackStep = Math.PI / this.stacks;

        for (var i = 0; i <= this.slices; i++) {
            var ang = step * i;
            for (var j = 0; j <= this.stacks; j++) {
                var stackAng = stackStep * (this.stacks - j) - Math.PI / 2;

                var x = Math.sin(ang) * Math.cos(stackAng);
                var y = Math.sin(stackAng);
                var z = Math.cos(ang) * Math.cos(stackAng);

                this.vertices.push(x, y, z);

                // normalization
                var nsize = Math.sqrt(x * x + y * y + z * z);
                x /= nsize;
                y /= nsize;
                z /= nsize;

                (this.inverted) ? this.normals.push(-x, -y, -z) : this.normals.push(x, y, z);
                this.texCoords.push(i / this.slices, j / this.stacks);

                if (i > 0 && j > 0) {
                    var vertices = this.vertices.length / 3;
                    if (this.inverted) {
                        this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - 2);
                        this.indices.push(vertices - 1, vertices - this.stacks - 2, vertices - this.stacks - 3);
                    } else {
                        this.indices.push(vertices - 1, vertices - 2, vertices - this.stacks - 3);
                        this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - this.stacks - 2);
                    }
                }
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}