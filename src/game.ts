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
     * Constructor to create a new instance of the game.
     */
    public constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById('snake-canvas');
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
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