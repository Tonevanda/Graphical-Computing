import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
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
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.gui.add(this.scene, 'gardenRows', 1, 10).step(1).onChange(function (value) {
            this.scene.garden.updateGarden(value, this.scene.gardenColumns);
        }.bind(this));
        this.gui.add(this.scene, 'gardenColumns', 1, 10).step(1).onChange(function (value) {
            this.scene.garden.updateGarden(this.scene.gardenRows, value);
        }.bind(this));

        return true;
    }
}