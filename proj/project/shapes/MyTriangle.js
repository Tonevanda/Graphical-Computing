import { CGFobject } from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            1, 0, 0,	//0
            0, 0, -0.5,	//1
            0, 0, 0.5,	//2
            1, 0, 0,	//3
            0, 0, -0.5,	//4
            0, 0, 0.5,	//5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            3, 5, 4
        ];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];

        this.texCoords = [
            0.5, 0,
            0, 1,
            1, 1,
            0.5, 0,
            0, 1,
            1, 1
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

