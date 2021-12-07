/**
 * A listener listening for key press events and
 * adjusting the direction of the snake accordingly.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class KeyListener {
    /**
     * The active instance of the `Snake` object.
     */
    public snake: Snake;

    /**
     * Constructor to create and initialize a KeyListener.
     */
    public constructor(snake: Snake) {
        // Register global event listener.
        window.addEventListener('keydown', event => this.handleKeyPress);
        
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
                direction = Direction.UP;
                this.snake.changeDirection(direction);
                break;

            case 'ArrowDown':
                direction = Direction.DOWN;
                this.snake.changeDirection(direction);
                break;

            case 'ArrowLeft':
                direction = Direction.LEFT;
                this.snake.changeDirection(direction);
                break;

            case 'ArrowRight':
                direction = Direction.RIGHT;
                this.snake.changeDirection(direction);
                break;

            default:
                return;
        }
    };

    /**
     * Removes event listener and stops the KeyListener
     * from listening for further key press events.
     */
    public destroyListener = () => {
        // Remove global event listener.
        window.removeEventListener('keydown', this.handleKeyPress);
    }

}