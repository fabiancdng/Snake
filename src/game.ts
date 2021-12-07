/**
 * Game class representing the whole game.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class Game {
    /**
     * The HTML5 canvas element.
     */
    public canvas: HTMLCanvasElement;

    /**
     * 2D context of the HTML5 canvas element.
     */
    public ctx: CanvasRenderingContext2D;

    /**
     * The number of rows the whole game has.
     */
    public rows: number;

    /**
     * The number of columns the whole game has.
     */
    public columns: number;

    /**
     * The active instance of the `Snake` object.
     */
    public snake: Snake;

    /**
     * The active instance of the `Food` object.
     */
    public food: Food;

    /**
     * Width of a single cell.
     */
    public cellWidth: number;

    /**
     * Height of a single cell.
     */
    public cellHeight: number;

    /**
     * The active instance of the `KeyboardListener` object.
     */
    public keyboardListener: KeyboardListener;

    /**
     * Constructor to create a new instance of the game.
     */
    public constructor() {
        // Get canvas and its 2D context.
        this.canvas = <HTMLCanvasElement> document.getElementById('snake-canvas');
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        
        // Set width and size of the canvas.
        this.canvas.width = 600;
        this.canvas.height = 600;

        // Organize canvas as a "grid".
        this.rows = 20;
        this.columns = 20;
        this.cellWidth = this.canvas.width / this.columns;
        this.cellHeight = this.canvas.height / this.rows;

        // Instantiate `Snake` and `Food`.
        this.snake = new Snake();
        this.food = new Food(this.rows, this.columns);

        // Initialize KeyboardListener and pass snake (so it can control the snake).
        this.keyboardListener = new KeyboardListener(this.snake);
    };

    /**
     * Draw the current state of game (using HTML5 canvas).
     */
    public draw = () => {
        // The canvas element's width and height.
        var width = this.canvas.width;
        var height = this.canvas.height;

        // Fill canvas with a black background color.
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, width, height);

        // Draw each part of the snake in a white color.
        this.ctx.fillStyle = 'white';
        this.snake.parts.forEach(snakePart => {
            this.ctx.fillRect(
                snakePart.x * this.cellWidth,
                snakePart.y * this.cellHeight,
                this.cellWidth,
                this.cellHeight
            );
        });

        // Draw the piece of food in a green color.
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            this.food.position.x * this.cellWidth,
            this.food.position.y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );

        // Redraw game when any coordinate has changed.
        requestAnimationFrame(this.draw);
    };

    /**
     * Method representing the game loop.
     */
    public loop = () => {
        this.snake.shiftParts();

        // Move snake according to the current direction.
        switch (this.snake.direction) {
            case Direction.UP:
                this.snake.parts[0].y --;
                break;

            case Direction.DOWN:
                this.snake.parts[0].y ++;
                break;
                
            case Direction.LEFT:
                this.snake.parts[0].x --;
                break;

            case Direction.RIGHT:
                this.snake.parts[0].x ++;
                break;
            
            default:
                return;
        }

        // Detect whether snake and food have collided in the
        // current iteration of the game loop.
        // TODO: Abstracted/dedicated collision detection.
        if (this.snake.parts[0].x === this.food.position.x
            && this.snake.parts[0].y === this.food.position.y) {
                // Move food to different (random) coordinates.
                this.food.relocate();

                // Grow snake by one square.
                this.snake.grow();
            }
    };
};