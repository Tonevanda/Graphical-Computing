import { CGFobject, CGFappearance } from '../../lib/CGF.js';
/**
* MyCube
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let z = 0; z < 2; z++) {
            for (let y = 0; y < 2; y++) {
                for (let x = 0; x < 2; x++) {
                    this.vertices.push(x * 2 - 1, y * 2 - 1, z * 2 - 1);
                    this.normals.push(x * 2 - 1, y * 2 - 1, z * 2 - 1);
                    this.texCoords.push(x, y);
                }
            }
        }

        this.indices = [
            0, 2, 1, 1, 2, 3, // front
            4, 5, 6, 5, 7, 6, // back
            0, 1, 4, 1, 5, 4, // bottom
            2, 6, 3, 3, 6, 7, // top
            0, 4, 2, 2, 4, 6, // left
            1, 3, 5, 3, 7, 5  // right
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}