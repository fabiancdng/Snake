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
     * Position of each part of snake in the game / on the
     * canvas.
     */
    public snake: Array<Position>;

    /**
     * Position of the piece of food in the game / on the
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
        
        // Set width and size of the canvas.
        this.canvas.width = 600;
        this.canvas.height = 600;

        // Set initial positions of snake and food.
        this.snake = [{ x: 2, y: 3 }];
        this.food = { x: 5, y: 5 };

        // Organize canvas as a "grid".
        this.rows = 20;
        this.columns = 20;
        this.cellWidth = this.canvas.width / this.columns;
        this.cellHeight = this.canvas.height / this.rows;
        
        // Set initial direction of the snake.
        this.direction = Direction.LEFT;
    };

    /**
     * Draw the current state of game (using HTML5 canvas).
     */
    public draw() {
        // The canvas element's width and height.
        var width = this.canvas.width;
        var height = this.canvas.height;

        // Fill canvas with a black background color.
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, width, height);

        // Draw each part of the snake in a white color.
        this.ctx.fillStyle = 'white';
        this.snake.forEach(snakePart => {
            this.ctx.fillRect(
                snakePart.x,
                snakePart.y,
                this.cellWidth,
                this.cellHeight
            );
        });

        // Draw the piece of food in a green color.
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            this.food.x * this.cellWidth,
            this.food.y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );
    };

    /**
     * Method representing the game loop.
     */
    public loop() {

    };
};