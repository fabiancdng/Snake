/**
 * Object for persistently storing values for example scores via localStorage.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class DataStorage {
    /**
     * The user's browser's localStorage object.
     */
    private local: Storage;
    
    /**
     * Constructor to create a new instance of the `Food`
     * object.
     */
    public constructor() {
        this.local = localStorage;
    };

    /**
     * Gets the user's high score from their browser's
     * localStorage.
     */
    public getHighscore = (): number => {
        let highScore = this.local.getItem('highScore');
        if (highScore === null) return 0;
        else return Number(highScore);
    };

    /**
     * Saves the passed highScore in the user's browser's
     * localStorage.
     */
    public saveHighscore = (highScore: number): void => {
        let highScoreString = String(highScore);
        this.local.setItem('highScore', highScoreString);
    }
};