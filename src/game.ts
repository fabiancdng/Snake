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
     * Position of the snake in the game / on the
     * canvas.
     */
    public snake: Position;

    /**
     * Position of the food in the game / on the
     * canvas.
     */
    public food: Position;

    /**
     * Width of a single cell.
     */
    public cellWidth: number;

    /**
     * Height of a single cell.
     */
    public cellHeight: number;

    /**
     * Direction the snake is heading in.
     */
    public direction: Direction;

    /**
     * Constructor to create a new instance of the game.
     */
    public constructor() {
        // Get canvas and its 2D context.
        this.canvas = <HTMLCanvasElement> document.getElementById('snake-canvas');
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        
        // Set initial positions of snake and food.
        this.snake = { x: 2, y: 3 };
        this.food = { x: 7, y: 9 };

        // Organize canvas as a "grid".
        this.rows = 10;
        this.columns = 10;
        this.cellWidth = this.canvas.width / this.columns;
        this.cellHeight = this.canvas.height / this.rows;
        
        // Set initial direction of the snake.
        this.direction = Direction.LEFT;
    };

    /**
     * Draw the current state of game (using HTML5 canvas).
     */
    public draw() {
        // Make canvas the size of the window.
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // The canvas element's width and height.
        var width = this.canvas.width;
        var height = this.canvas.height;

        // Fill canvas with a black background color.
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, width, height);

        // Draw snake in white color.
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(10, 20, 20, 20);
    };

    /**
     * Method representing the game loop.
     */
    public loop() {

    };
};