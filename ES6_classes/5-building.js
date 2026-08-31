export default class Building {
    constructor(squareFeet) {
        if (new.target !== Building
            && typeof this.evacuationWarningMessage !== 'function'
        ) {
            throw new Error(
                'Class extending Building must override evacuationWarningMessage',
            );
        }

        this._sqft = squareFeet;
    }

    get sqft() {
        return this._sqft;
    }
}
