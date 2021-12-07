/**
 * Object representing the food.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
 class Food {
    /**
     * Current position of the food.
     */
    public position: Position;

    /**
     * The number of rows the whole game has.
     */
    public rows: number;

    /**
     * The number of columns the whole game has.
     */
    public columns: number;

    /**
     * Constructor to create a new instance of the `Food`
     * object.
     */
    public constructor(rows: number, columns: number) {
        // Get number of total rows and columns the game has.
        this.rows = rows;
        this.columns = columns;

        // Set initial position of the food.
        this.position = { x: 7, y: 3 };
    };

    /**
     * Places a piece of food in a random position in the
     * game / on the canvas.
     */
    public place = () => {
        // Randomly generate coordinates for the food.
        let foodX = Math.floor(Math.random() * this.columns);
        let foodY = Math.floor(Math.random() * this.rows);

        // Change position of the current food object to create
        // the "illusion" of a new piece of food spawning.
        this.position = { x: foodX, y: foodY };
    };
};