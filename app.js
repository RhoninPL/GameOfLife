var Game = new function() {
    this.board = []; // status: 1 dead, 2 alive
    this.i = 0;
    this.j = 0;
    this.sizeBlock = 16;
    this.blocks = 50;
    var self = this;

    /**
     * Wypełnia tablicę losowymi stanami
     */
    this.fillBoardArray = function() {
        for (var i = 0; i < this.blocks; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.blocks; j++) {
                self.board[i][j] = Math.floor(Math.random() * 2) + 1;
            }
        }
    };

    /**
     *     Wypełnia element canvas w kwadraty
     */
    this.fillBoard = function() {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        for (var i = 0; i < this.blocks; i++) {
            for (var j = 0; j < this.blocks; j++) {
                if (self.board[i][j] == 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(i * this.sizeBlock, j * this.sizeBlock, this.sizeBlock, this.sizeBlock);
                } else {
                    ctx.fillStyle = "#404040";
                    ctx.fillRect(i * this.sizeBlock, j * this.sizeBlock, this.sizeBlock, this.sizeBlock);
                }
            }
        }
    };

    /**
     * Sprawdzanie sąsiadów
     */
    this.checkNeighbors = function() {
        var count = 0;
        i = this.i;
        j = this.j;
        if (typeof this.board[i + 1] !== 'undefined') {
            if (typeof this.board[i + 1][j] !== 'undefined') {
                if (this.board[i + 1][j] == 2) {
                    count++;
                }
            }

            if (typeof this.board[i + 1][j + 1] !== 'undefined') {
                if (this.board[i + 1][j + 1] == 2) {
                    count++;
                }
            }

            if (typeof this.board[i + 1][j - 1] !== 'undefined') {
                if (this.board[i + 1][j - 1] == 2) {
                    count++;
                }
            }
        }

        if (typeof(this.board[i - 1]) != 'undefined') {
            if (typeof(this.board[i - 1][j]) != 'undefined') {
                if (this.board[i - 1][j] == 2) {
                    count++;
                }
            }

            if (typeof this.board[i - 1][j + 1] !== 'undefined') {
                if (this.board[i - 1][j + 1] == 2) {
                    count++;
                }
            }

            if (typeof this.board[i - 1][j + 1] !== 'undefined') {
                if (this.board[i - 1][j + 1] == 2) {
                    count++;
                }
            }
        }

        if (typeof this.board[i][j + 1] !== 'undefined') {
            if (this.board[i][j + 1] == 2) {
                count++;
            }
        }

        if (typeof this.board[i][j - 1] !== 'undefined') {
            if (this.board[i][j - 1] == 2) {
                count++;
            }
        }


        return count;
    };

    /**
     * Główna metoda do uruchamiania 
     */
    this.run = function() {
        this.fillBoardArray();
        this.fillBoard();
        this.newBoard();
    };

    /**
     * Metoda generuje nową planszę i odwołuje samą do siebie po pewnym czasie
     */
    this.newBoard = function() {
        var boardtmp = [];

        for (var i = 0; i < this.blocks; i++) {
            boardtmp[i] = [];
            for (var j = 0; j < this.blocks; j++) {
                self.i = i;
                self.j = j;
                var neighbours = this.checkNeighbors();
                if (neighbours == 3) {
                    boardtmp[i][j] = 2;
                } else if (((neighbours > 3) || (neighbours < 2))) {
                    boardtmp[i][j] = 1;
                } else {
                    boardtmp[i][j] = this.board[i][j];
                }
            }
        }

        for (var i = 0; i < this.blocks; i++) {
            for (var j = 0; j < this.blocks; j++) {
                self.board[i][j] = boardtmp[i][j];
            }
        }

        self.fillBoard();
        setTimeout(function() {
            self.newBoard();
        }, 3000)
    };
}