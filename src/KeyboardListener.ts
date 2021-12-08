/**
 * A listener listening for key press events and
 * calling corresponding callback functions.
 * 
 * @author Fabian Reinders <https://github.com/fabiancdng>
 */
class KeyboardListener {
    /**
     * Function called when a key has been pressed.
     * Event `KeyboardEvent` is passed to that function.
     */
    private callback: Function;

    /**
     * Constructor to create and initialize a KeyboardListener.
     */
    public constructor(callback: Function) {
        this.callback = callback;

        // Register global event listener.
        window.addEventListener('keydown', event => this.callback(event));
    };

    /**
     * Removes event listener and stops the KeyboardListener
     * from listening for further key press events.
     */
    public destroyListener = () => {
        // Remove global event listener.
        window.removeEventListener('keydown', event => this.callback(event));
    };

}