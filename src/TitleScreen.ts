/**
 * Class representing the title screen.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class TitleScreen {
    /**
     * The HTML5 canvas element.
     */
    public canvas: HTMLCanvasElement;

    /**
     * 2D context of the HTML5 canvas element.
     */
    public ctx: CanvasRenderingContext2D;

    /**
     * Function to call when user closes the title screen.
     */
    private callback: Function;

    /**
     * The active instance of the `KeyboardListener` object.
     */
    private keyboardListener: KeyboardListener;

    /**
     * Constructor to create a new instance of the game.
     */
    public constructor(callback: Function) {
        this.callback = callback;

        // Get canvas and its 2D context.
        this.canvas = <HTMLCanvasElement> document.getElementById('snake-canvas');
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        
        // Set width and size of the canvas according to display.
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set up `KeyboardListener`.
        this.keyboardListener = new KeyboardListener(this.handleKeyPress);
    };

    /**
     * Handler function for keyboard events.
     */
    public handleKeyPress = (event: KeyboardEvent) => {
        this.keyboardListener.destroyListener();
        this.callback();
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

        // Draw score count and high score (next to game area).
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 45px sans-serif';
        this.ctx.fillText(`Snake`, (width / 2) - 60, (height / 2));
        this.ctx.font = '25px sans-serif';
        this.ctx.fillText(`Press any key to start the game...`, (width / 2) - 165, (height / 2) + 100);
    };
};