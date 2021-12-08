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
     * The active instance of the `Game` object.
     */
    private game: Game;

    /**
     * Constructor to create a new instance of the `Food`
     * object.
     */
    public constructor(game: Game) {
        this.game = game;
        // Set initial position of the food.
        this.position = { x: 7, y: 3 };
    };

    /**
     * Places a piece of food in a random position in the
     * game / on the canvas (by relocating the old one).
     */
    public relocate = () => {
        // Randomly generate coordinates for the food.
        var foodX = Math.floor(Math.random() * this.game.columns);
        var foodY = Math.floor(Math.random() * this.game.rows);

        // Change position of the current food object to create
        // the "illusion" of a new piece of food spawning.
        this.position = { x: foodX, y: foodY };
    };
};