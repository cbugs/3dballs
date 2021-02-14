import { Game } from './Game/Game.js';

function main() {
  const container = document.querySelector('#scene-container');

  const game = new Game(container);

  game.start();
}

main();