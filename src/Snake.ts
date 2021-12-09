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
        this.direction = Direction.RIGHT;
    };

    /**
     * Move the snake to the current direction.
     * Only the head is being moved. `shiftParts()`
     * has to be called after this to move the rest of
     * the snake..
     */
    public move = () => {
        // Move head of the snake according to the current direction.
        switch (this.direction) {
            case Direction.UP:
                this.parts[0].y --;
                break;

            case Direction.DOWN:
                this.parts[0].y ++;
                break;
                
            case Direction.LEFT:
                this.parts[0].x --;
                break;

            case Direction.RIGHT:
                this.parts[0].x ++;
                break;
            
            default:
                return;
        }
    }

    /**
     * Grow the snake (increase length by another square).
     */
    public grow = () => {
        this.parts.push({
            x: this.parts[0].x,
            y: this.parts[0].y
        });
    };

    /**
     * Shifts all parts of the snake (only the first part is being moved
     * directly and this method is "adjusting the rest of the snake to
     * the head").
     */
    public shiftParts = () => {
        for (let i = this.parts.length - 1; i > 0; i--) {
            // Get position of current and previous part.
            const currentPart = this.parts[i];
            const previousPart = this.parts[i - 1];

            // Swap positions.
            currentPart.x = previousPart.x;
            currentPart.y = previousPart.y;
        }
    };

    /**
     * Resets snake to original size and relocates it to the
     * initial coordinates.
     */
    public reset = () => {
        // Go back to original direction.
        this.direction = Direction.RIGHT;
        // Go back to original length and coordinates.
        this.parts = [{ x: 7, y: 3 }];
    };
};