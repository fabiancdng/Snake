/**
 * A listener listening for key press events and
 * adjusting the direction of the snake accordingly.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class KeyboardListener {
    /**
     * The active instance of the `Snake` object.
     */
    public snake: Snake;

    /**
     * Constructor to create and initialize a KeyboardListener.
     */
    public constructor(snake: Snake) {
        // Register global event listener.
        window.addEventListener('keydown', event => this.handleKeyPress(event));
        
        // Get the active instance of the `Snake` object.
        this.snake = snake;
    };

    /**
     * Handler function for the 'keydown' event listener.
     */
    public handleKeyPress = (event: KeyboardEvent) => {
        // Direction the snake is now supposed to use.
        var direction: Direction;
        
        // The key pressed on the keyboard.
        var key = event.key;

        // Determine direction by looking up the pressed key.
        switch (key) {
            case 'ArrowUp':
                if (this.snake.direction === Direction.DOWN
                    && this.snake.parts.length >= 2) break;
                direction = Direction.UP;
                this.snake.direction = direction;
                break;

            case 'ArrowDown':
                // Bail early because snake can't go through itself.
                if (this.snake.direction === Direction.UP
                    && this.snake.parts.length >= 2) break;
                direction = Direction.DOWN;
                this.snake.direction = direction;
                break;

            case 'ArrowLeft':
                if (this.snake.direction === Direction.RIGHT
                    && this.snake.parts.length >= 2) break;
                direction = Direction.LEFT;
                this.snake.direction = direction;
                break;

            case 'ArrowRight':
                if (this.snake.direction === Direction.LEFT
                    && this.snake.parts.length >= 2) break;
                direction = Direction.RIGHT;
                this.snake.direction = direction;
                break;

            default:
                return;
        }
    };

    /**
     * Removes event listener and stops the KeyboardListener
     * from listening for further key press events.
     */
    public destroyListener = () => {
        // Remove global event listener.
        window.removeEventListener('keydown', this.handleKeyPress);
    };

}