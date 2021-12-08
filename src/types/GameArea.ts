/**
 * The area of the canvas that is being used by the game.
 * All "sprites" can only move within that area. The remaining
 * space of the canvas is being used for things like scores or
 * other game metrics. The game area is also divided in a grid-like
 * coordinates system.
 */
interface GameArea {
    /**
     * Width (in pixel) of the game area.
     */
    width: number,
    
    /**
     * Height (in pixel) of the game area.
     */
    height: number,

    /**
     * Offset (left) on the x-axis of the game area.
     * Used to be able to center the game area on the canvas.
     */
    offsetX: number,

    /**
     * Offset (top) on the y-axis of the game area.
     * Used to be able to center the game area on the canvas.
     */
    offsetY: number,
}