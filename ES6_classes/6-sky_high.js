import Building from './5-building.js';

export default class SkyHighBuilding extends Building {
    constructor(squareFeet, floors) {
        super(squareFeet);
        this._floors = floors;
    }

    get floors() {
        return this._floors;
    }

    evacuationWarningMessage() {
        return `Evacuate slowly the ${this._floors} floors`;
    }
}
