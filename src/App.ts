import Game from './Game';
import TitleScreen from './TitleScreen';

var game = new Game();

function startGame() {
    game.draw();
    setInterval(game.loop, 100);
}

var titleScreen = new TitleScreen(startGame);

titleScreen.draw();