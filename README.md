# Local Development Setup

1. Install Node.js. I'm using LTS Version 18.15.0.
2. You'll need npm, but that's usually included in the Node.js install.
3. Run >`npm install` in the root directory. This downloads dependencies.
4. Run >`npm run start` in the root directory. This starts up the game.
5. Game is running at `http://localhost:4200`.

## How to Play

You are a wizard. You awake in an unfamiliar place with little more than a fleeting memory of your once unsurpassed power. This is not the first time this has happened.

You are being pursued. Wherever you awake there is always a nemesis that is seeking you. Hunting you. When they find you it's Game Over, so to speak, and they always find you.

But this time will be different. With nothing but your wits you must harness the latent power from any source that bends to your considerable will. Tap into the memories of your former selves and establish a foothold which will grow to an empire that you can direct how you see fit.

## State of the Game

Core gameplay mechanics are still coming together. The basic outline for Game Moves, the Event Log, Nemesis Timer and Resource Inventory are functional at a basic level. The Focus Game Move hooks into everything it needs to to produce and store random amounts of resources.

My current focus is the Skills portion of the game: Discovering them through using the Learn move action and then the associated skill tree presentation panel with an unlock mechanism. I'm building out the skill tree with nodes that reveal more information as they are discovered. Nodes need to be laid out on the page properly, but I'm getting distracted by conceiving of the backend and thinking about a global gameService that handles everything that the various services is doing now.

## Architecture

### NgRx

### Components

### Constants

### Services
