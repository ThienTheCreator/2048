class gameState {
  constructor(a, b, c, d) {
    // m x n grid
    this.m = 4;
    this.n = 4;

    // constructore to copy a gameState instance
    if (a?.constructor.name == "gameState") {
      this.board = structuredClone(a.board);
      this.score = a.score;
      this.hasWon = a.hasWon;
      this.hasLost = a.hasLost;
    } else {
      this.board = Array(this.m)
        .fill()
        .map(() => Array(this.n).fill(0));
      this.score = 0;
      this.hasWon = false;
      this.hasLost = false;

      if (a != undefined) {
        this.board = a;
      }
      if (b != undefined) {
        this.score = b;
      }
      if (c != undefined) {
        this.hasWon = c;
      }
      if (d != undefined) {
        this.hasLost = d;
      }
    }
  }
}

let mainGame = new gameState();
