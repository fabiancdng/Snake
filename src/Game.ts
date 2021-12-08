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
     * Points gained so far (in this game).
     */
    public score: number;

    /**
     * Boolean to indicate whether or not the game is over.
     */
    public gameOver: boolean;

    /**
     * Width of a single cell.
     */
    public cellWidth: number;

    /**
     * Height of a single cell.
     */
    public cellHeight: number;

    /**
     * The active instance of the `CollisionDetection` object.
     */
    public collisionDetection: CollisionDetection;

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
        
        // Set width and size of the canvas according to display.
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Organize canvas as a "grid".
        this.rows = 20;
        this.columns = 20;
        this.cellWidth = this.canvas.width / this.columns;
        this.cellHeight = this.canvas.height / this.rows;

        // Instantiate `Snake` and `Food`.
        this.snake = new Snake();
        this.food = new Food(this.rows, this.columns);
        
        // Initialize score and `gameOver` boolean.
        this.score = 0;
        this.gameOver = false;

        // Initialize KeyboardListener and pass snake (so it can control the snake).
        this.keyboardListener = new KeyboardListener(this.snake);
        // Initialize CollisionDetection.
        this.collisionDetection = new CollisionDetection();
    };

    /**
     * Resets score, positions of snake and food and shrinks
     * the snake to original size.
     */
    public restart = () => {
        this.snake.reset();
        this.food.relocate();
        this.changeScore(0);
        this.gameOver = false;
    };

    /**
     * Changes `this.score` to the passed score.
     * Also updates all references in the DOM.
     */
    public changeScore = (score: number) => {
        // Update score attribute of the game.
        this.score = score;

        // Update displayed score in the game.
        let scoreHolder = <HTMLElement> document.getElementById('score');
        scoreHolder.innerText = `Score: ${ this.score }`;
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
        // Restart game when over.
        if (this.gameOver == true) this.restart();

        // Shift all parts of the snake. 
        this.snake.shiftParts();
    
        // Move head of the snake according to the current direction.
        this.snake.move();

        // Check whether one of the pre-defined collisions have happened
        // in the current iteration of the game loop.
        this.collisionDetection.checkForAndHandleCollisions(this);
    };
};