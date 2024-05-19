import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./shapes/MyCylinder.js";
import { MyGarden } from "./garden/MyGarden.js";
import { MyPanorama } from "./sky/MyPanorama.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyRockSet } from "./rocks/MyRockSet.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyTriangle } from "./shapes/MyTriangle.js";
import { MyBee } from "./bee/MyBee.js";
import { MyPollen } from "./hive/MyPollen.js";
import { MyHive } from "./hive/MyHive.js";
import { MyCube } from "./shapes/MyCube.js";
import { MyGrassField } from "./grass/MyGrassField.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {

  constructor() {
    super();
  }

  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Textures
    this.panoramaTexture = new CGFtexture(this, "images/panorama.jpg");
    this.rockTexture = new CGFtexture(this, "images/rock.jpg");
    this.pollenTexture = new CGFtexture(this, "images/pollen.png");
    this.planeTexture = new CGFtexture(this, "images/grass.jpg");
    this.grassBladeTexture = new CGFtexture(this, "images/grassBlade.jpg");
    this.cloudHeightMap = new CGFtexture(this, "images/cloudMap.jpg");

    // Shaders
    this.shaders = [
      new CGFshader(this.gl, "shaders/wind.vert", "shaders/wind.frag"),
      new CGFshader(this.gl, "shaders/clouds.vert", "shaders/clouds.frag")
    ];
    this.shaders[0].setUniformsValues({ timeFactor: 0 });
    this.shaders[1].setUniformsValues({ panoramaTexture: 0, cloudHeightMap: 1 });

    // Variables
    this.gardenRows = 1;
    this.gardenColumns = 1;
    this.grassFieldRows = 50;
    this.grassFieldCols = 50;
    this.curTime = Date.now(); //ms
    this.appStartTime = Date.now(); //ms
    this.speedFactor = 1;
    this.scaleFactor = 0.5;

    //Initialize primitive objects
    this.plane = new MyPlane(this, this.planeTexture, 30);
    this.triangle = new MyTriangle(this);
    this.sphere = new MySphere(this, 100, 100);
    this.cylinder = new MyCylinder(this, 100, 50);
    this.pollen = new MyPollen(this, 100, 100);
    this.cube = new MyCube(this);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns, this.triangle, this.sphere, this.cylinder, this.pollen, this.pollenTexture);
    this.rockSet = new MyRockSet(this, 5, 5, this.rockTexture);
    this.bee = new MyBee(this, this.triangle, this.sphere, this.cylinder, this.pollen, [0, 0, 0], 0, 0, this.pollenTexture);
    this.hive = new MyHive(this, this.cube);
    this.grassField = new MyGrassField(this, this.grassBladeTexture, 50, 50);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    // set the scene update period 
    // (to invoke the update() method every 50ms or as close as possible to that )
    this.setUpdatePeriod(50);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      2.0, //FOV
      0.1, //min dist
      1000, //max dist
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
      this.bee.accelerate(this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      this.bee.accelerate(-this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
      this.bee.turn(this.speedFactor / 6);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed = true;
      this.bee.turn(-this.speedFactor / 6);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.bee.reset();
    }
    if (this.gui.isKeyPressed("KeyF")) {
      text += " F ";
      keysPressed = true;
      this.bee.goDown(this.gardenRows, this.gardenColumns);
    }
    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      keysPressed = true;
      this.bee.goingUp = true;
    }
    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      keysPressed = true;
      this.bee.goHive((this.garden.flowerSpacing * this.gardenColumns / 2) + 60 / Math.log2(this.gardenColumns + 1), 0);
    }
    if (keysPressed)
      console.log(text);
  }

  update(t) {
    this.shaders[0].setUniformsValues({ timeFactor: t / 1000 % 100 });
    this.shaders[1].setUniformsValues({ timeFactor: t / 1000 % 100 });
    this.checkKeys();
    let delta_t = (t - this.curTime) / 1000;
    this.curTime += t - this.curTime;

    let timeSinceAppStart = (t - this.appStartTime) / 1000.0;
    this.bee.update(delta_t, timeSinceAppStart);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // Drawing section


    // Sky-Sphere
    this.setActiveShader(this.shaders[1]);
    this.cloudHeightMap.bind(1);
    this.panorama.display();
    this.setActiveShader(this.defaultShader);

    // Ground
    this.translate(0, -50, 0);
    this.pushMatrix();
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    // Garden
    this.garden.display();

    // Grass Field
    this.pushMatrix();
    this.scale(2, 2, 2);
    this.setActiveShader(this.shaders[0]);
    //this.grassField.display();
    this.setActiveShader(this.defaultShader);
    this.popMatrix();

    //Hive and Rock set
    this.pushMatrix();
    this.translate((this.garden.flowerSpacing * this.gardenColumns / 2) + 60 / Math.log2(this.gardenColumns + 1), 0, 0);
    this.hive.display();
    this.scale(0.5, 0.5, 0.5);
    this.rockSet.display();
    this.popMatrix();

    this.translate(0, 50, 0);

    this.bee.display(this.scaleFactor);
    // ---- END Primitive drawing section
  }


}
