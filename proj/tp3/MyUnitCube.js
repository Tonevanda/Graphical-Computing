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
			-0.5,  0.5,  0.5,	    //8
			-0.5, -0.5,  0.5,	    //9
			0.5,   0.5,  0.5,	    //10
			0.5,  -0.5,  0.5,		//11
            -0.5,  0.5, -0.5,	    //12
            -0.5, -0.5, -0.5,	    //13
            0.5,   0.5, -0.5,	    //14
            0.5,  -0.5, -0.5,	    //15
			-0.5,  0.5,  0.5,	    //16
			-0.5, -0.5,  0.5,	    //17
			0.5,   0.5,  0.5,	    //18
			0.5,  -0.5,  0.5,		//19
            -0.5,  0.5, -0.5,	    //20
            -0.5, -0.5, -0.5,	    //21
            0.5,   0.5, -0.5,	    //22
            0.5,  -0.5, -0.5,	    //23		
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,	// Front face
			1, 3, 2,	// Front face
			4, 6, 5,	// Back face
			5, 6, 7, 	// Back face
			12, 5, 8,	// Left face
			13, 9, 8,	// Left face
			10, 11, 14,	// Right face
			11, 15, 14,	// Right face
			9, 21, 11,	// Bottom face
			21, 23, 11,	// Bottom face
			12, 16, 22,	// Top face
			16, 10, 22,	// Top face
		];

		this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1,	//2
			0, 0, 1,	//3
			0, 0, -1,	//4
			0, 0, -1,	//5
			0, 0, -1,	//6
			0, 0, -1,	//7
			-1, 0, 0,	//8
			-1, 0, 0,	//9
			1, 0, 0,	//10
			1, 0, 0,	//11
			-1, 0, 0,	//12
			-1, 0, 0,	//13
			1, 0, 0,	//14
			1, 0, 0,	//15
			0, 1, 0,	//16
			0, -1, 0,	//17
			0, 1, 0,	//18
			0, -1, 0,	//19
			0, 1, 0,	//20
			0, -1, 0,	//21
			0, 1, 0,	//22
			0, -1, 0,	//23
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

