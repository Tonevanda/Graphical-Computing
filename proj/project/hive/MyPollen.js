import { CGFobject } from '../../lib/CGF.js';
/**
* MyPollen
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPollen extends CGFobject {
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
        this.texCoords = [];

        let step = 2 * Math.PI / this.slices;
        let stackStep = Math.PI / this.stacks;

        for (let i = 0; i <= this.slices; i++) {
            let ang = step * i;
            for (let j = 0; j <= this.stacks; j++) {
                let stackAng = stackStep * (this.stacks - j) - Math.PI / 2;

                let x = Math.sin(ang) * Math.cos(stackAng);
                let y = (j < this.stacks / 2) ? Math.sin(stackAng) * 1.5 : Math.sin(stackAng);
                let z = Math.cos(ang) * Math.cos(stackAng);

                this.vertices.push(x, y, z);

                // normalization
                let nsize = Math.sqrt(x * x + y * y + z * z);
                x /= nsize;
                y /= nsize;
                z /= nsize;

                this.normals.push(x, y, z);
                this.texCoords.push(i / this.slices, j / this.stacks);

                if (i > 0 && j > 0) {
                    let vertices = this.vertices.length / 3;
                    this.indices.push(vertices - 1, vertices - 2, vertices - this.stacks - 3);
                    this.indices.push(vertices - 1, vertices - this.stacks - 3, vertices - this.stacks - 2);
                }
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}