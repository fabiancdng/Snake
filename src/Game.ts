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
     * The area of the canvas that is being used by the game.
     * All "sprites" can only move within that area. The remaining
     * space of the canvas is being used for things like scores or
     * other game metrics. The game area is also divided in a grid-like
     * coordinates system.
     */
    public gameArea: GameArea;

    /**
     * The number of rows the game area is divided in.
     */
    public rows: number;

    /**
     * The number of columns the game area is divided in.
     */
    public columns: number;

    /**
     * Width of a single cell in the game area.
     */
    public cellWidth: number;
 
    /**
     * Height of a single cell in the game area.
     */
    public cellHeight: number;

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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Calculate game area width and offset.
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        
        // Calculate game area dimensions in a 4:3 aspect ratio.
        let gameAreaWidth = Math.floor(this.canvas.width / 1.7);
        let gameAreaHeight =  Math.floor((gameAreaWidth / 4) * 3);

        this.gameArea = {
            width: gameAreaWidth,
            height: gameAreaHeight,
            offsetX: (canvasWidth - gameAreaWidth) / 2,
            offsetY: (canvasHeight - gameAreaHeight) / 2
        };

        // Organize game area in the canvas as a "grid".
        this.rows = Math.floor(gameAreaWidth / 20);
        this.columns = Math.floor(gameAreaHeight / 20);
        this.cellWidth = gameAreaWidth / this.columns;
        this.cellHeight = gameAreaHeight / this.rows;

        // Instantiate `Snake` and `Food`.
        this.snake = new Snake();
        this.food = new Food(this);
        
        // Initialize score and `gameOver` boolean.
        this.score = 0;
        this.gameOver = false;

        // Initialize KeyboardListener and pass snake (so it can control the snake).
        this.keyboardListener = new KeyboardListener(this.snake);
        // Initialize CollisionDetection.
        this.collisionDetection = new CollisionDetection(this);
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
    };

    /**
     * Draw the current state of game (using HTML5 canvas).
     */
    public draw = () => {
        // The canvas element's width and height.
        var width = this.canvas.width;
        var height = this.canvas.height;
        
        // Fill canvas with a black background color.
        this.ctx.fillStyle = '#0b0c23';
        this.ctx.fillRect(0, 0, width, height);

        // Draw game area (in different color).
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(
            this.gameArea.offsetX,
            this.gameArea.offsetY,
            this.gameArea.width,
            this.gameArea.height
        );

        // Draw score count (next to game area).
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px sans-serif';
        this.ctx.fillText(`Score: ${ this.score }`, 20, this.gameArea.offsetY);

        // Draw each part of the snake in a white color.
        this.ctx.fillStyle = 'white';
        this.snake.parts.forEach(snakePart => {
            this.ctx.fillRect(
                this.gameArea.offsetX + snakePart.x * this.cellWidth,
                this.gameArea.offsetY + snakePart.y * this.cellHeight,
                this.cellWidth,
                this.cellHeight
            );
        });

        // Draw the piece of food in a green color.
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            this.gameArea.offsetX + this.food.position.x * this.cellWidth,
            this.gameArea.offsetY + this.food.position.y * this.cellHeight,
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
        this.collisionDetection.checkForAndHandleCollisions();
    };
};