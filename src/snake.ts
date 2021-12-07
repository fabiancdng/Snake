/**
 * Object representing the snake.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
 class Snake {
    /**
     * Position of each part of the snake in the
     * game / on the canvas.
     */
    public parts: Array<Position>;

    /**
     * Direction the snake is heading in.
     */
    public direction: Direction;

    /**
     * Constructor to create a new instance of the game.
     */
    public constructor() {
        // Set initial position of the snake.
        this.parts = [{ x: 7, y: 3 }];
        
        // Set initial direction of the snake.
        this.direction = Direction.LEFT;
    };

    /**
     * Change the direction the snake is headed in.
     */
    public changeDirection = (direction: Direction) => {
        this.direction = direction;
    };
};