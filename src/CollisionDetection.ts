import Game from "./Game";
import Position from "./types/Position";

/**
 * Object for detecting collision of game objects and handling them
 * accordingly.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
export default class CollisionDetection {
    /**
     * The active instance of the `Game` object.
     */
    private game: Game;

    /**
     * Constructor to create a new instance of the `CollisionDetection`
     * object.
     */
    public constructor(game: Game) {
        this.game = game;
        return;
    };

    /**
     * Checks whether game object 1 and 2 have collided at at least
     * one position / coordinate pair.
     */
    public haveCollided = (
        positionsOfObject1: Array<Position>,
        positionsOfObject2: Array<Position>): boolean => {
            // Check whether one position / coordinate pair is the same in
            // both arrays.
            let collided = positionsOfObject1.some(
                position1 => positionsOfObject2.some(
                    position2 => position1.x === position2.x
                                    && position1.y === position2.y
                )
            );
            
            // Return result of check.
            return collided;
        };

    /**
     * Checks whether the game object has collided with the wall
     * at at least one coordinate.
     */
    public hasCollidedWithWall = (
        positionsOfObject: Array<Position>,
        rows: number,
        columns: number) => {
            // Check whether at least one position of the object has
            // collided with the wall.
            let collided = positionsOfObject.some(
                position => position.x < 0
                            || position.x > columns - 1
                            || position.y < 0
                            || position.y > rows - 1
            );
            
            // Return result of check.
            return collided;
        };

    /**
     * Checks whether any of the pre-defined objects have collided
     * or have collided with the wall (snake with food, snake with wall,
     * snake with itself).
     */
    public checkForAndHandleCollisions = () => {
        // Define attributes in local scope for easy reference.
        var game = this.game;
        var snake = this.game.snake;
        var food = this.game.food;
        var rows = this.game.rows;
        var columns = this.game.columns;

        // Check if snake head (!) and food have collided.
        if (this.haveCollided([snake.parts[0]], [food.position])) {
            // Move food to different (random) coordinates.
            food.relocate();
            // Increase score by 1.
            game.score = game.score + 1;
            // Grow snake by one square.
            snake.grow();
            return;
        }

        // Check if any part of the snake has collided with a wall / edge.
        if (this.hasCollidedWithWall(snake.parts, rows, columns)) {
            game.gameOver = true;
            alert(`Game over! Score: ${ game.score }`);
        }

        // Check if snake has collided with itself.
        if (this.haveCollided([snake.parts[0]], snake.parts.slice(1))) {
            game.gameOver = true;
            alert(`Game over! Score: ${ game.score }`);
        }
    };
};