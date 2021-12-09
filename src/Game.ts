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
     * Area of the canvas that is being used by the game.
     * "Sprites" can only move within that area.
     * Divided into a grid-like coordinates system.
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
     * Most points gained in a single game so far by a user.
     */
    public highScore: number;

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
     * The active instance of the `DataStorage` object.
     */
    public dataStorage: DataStorage;

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

        // Get width and height of canvas.
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        // Calculate game area dimensions in a 4:3 aspect ratio.
        let gameAreaWidth = Math.floor(this.canvas.width / 1.7);
        let gameAreaHeight =  Math.floor((gameAreaWidth / 4) * 3);
        // Calculate offsetX (x-axis; left) and offsetY (y-axis; top).
        let offsetX = ((canvasWidth - gameAreaWidth) / 2) * 1.3;
        let offsetY = (canvasHeight - gameAreaHeight) / 2;

        this.gameArea = {
            width: gameAreaWidth,
            height: gameAreaHeight,
            offsetX: offsetX,
            offsetY: offsetY
        };

        // Organize game area in the canvas as a "grid".
        this.rows = Math.floor(gameAreaWidth / 30);
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
        this.keyboardListener = new KeyboardListener(this.handleKeyPress);
        // Initialize CollisionDetection.
        this.collisionDetection = new CollisionDetection(this);
        // Initialize DataStorage.
        this.dataStorage = new DataStorage();

        // Try to get user's high score (if existent).
        this.highScore = this.dataStorage.getHighscore();
    };

    /**
     * Resets score, positions of snake and food and shrinks
     * the snake to original size.
     * Also takes care of saving the high score.
     */
    public restart = () => {
        // If score is bigger than high score, save new high score.
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.dataStorage.saveHighscore(this.score);
        }
        
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
     * Handler function for keyboard events.
     */
    private handleKeyPress = (event: KeyboardEvent) => {
        // Direction the snake is now supposed to use.
        var direction: Direction;
        
        // The key pressed on the keyboard.
        var key = event.key;

        // Determine direction by looking up the pressed key.
        switch (key) {
            case 'ArrowUp':
                // Bail early because snake can't go through itself.
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
                // Bail early because snake can't go through itself.
                if (this.snake.direction === Direction.RIGHT
                    && this.snake.parts.length >= 2) break;
                direction = Direction.LEFT;
                this.snake.direction = direction;
                break;

            case 'ArrowRight':
                // Bail early because snake can't go through itself.
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
     * Draw the current state of game (using HTML5 canvas).
     */
    public draw = () => {
        // The canvas element's width and height.
        var width = this.canvas.width;
        var height = this.canvas.height;
        
        // Fill canvas with background color.
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

        // Draw score count and high score (next to game area).
        this.ctx.fillStyle = 'white';
        this.ctx.font = '35px sans-serif';
        this.ctx.fillText(`Score: ${ this.score }`, 25, this.gameArea.offsetY + 50);
        this.ctx.font = '30px sans-serif';
        this.ctx.fillText(`High score: ${ this.highScore }`, 25, this.gameArea.offsetY + 100);
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText('Created by @fabiancdng.', 25, this.canvas.height- 50);


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