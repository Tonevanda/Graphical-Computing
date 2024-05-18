import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.activeKeys = {};
    }

    // For when the user presses a key
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    // For when the user releases a key
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'gardenRows', 1, 10).step(1).onChange(function (value) {
            this.scene.garden.updateGarden(value, this.scene.gardenColumns);
        }.bind(this));
        this.gui.add(this.scene, 'gardenColumns', 1, 10).step(1).onChange(function (value) {
            this.scene.garden.updateGarden(this.scene.gardenRows, value);
        }.bind(this));

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).step(0.1).onChange(function (speedFactor) {
            this.scene.speedFactor = speedFactor;
        }.bind(this));
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).step(0.1).onChange(function (scaleFactor) {
            this.scene.scaleFactor = scaleFactor;
        }.bind(this));

        this.initKeys();
        return true;
    }
}