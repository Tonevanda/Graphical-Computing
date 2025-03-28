import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5,  0.5,  0.5,	    //0
			-0.5, -0.5,  0.5,	    //1
			0.5,   0.5,  0.5,	    //2
			0.5,  -0.5,  0.5,		//3
            -0.5,  0.5, -0.5,	    //4
            -0.5, -0.5, -0.5,	    //5
            0.5,   0.5, -0.5,	    //6
            0.5,  -0.5, -0.5,	    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,	// Front face
			1, 3, 2,	// Front face
			4, 6, 5,	// Back face
			5, 6, 7, 	// Back face
			4, 5, 0,	// Left face
			5, 1, 0,	// Left face
			2, 3, 6,	// Right face
			3, 7, 6,	// Right face
			1, 5, 3,	// Bottom face
			5, 7, 3,	// Bottom face
			4, 0, 6,	// Top face
			0, 2, 6,	// Top face
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

