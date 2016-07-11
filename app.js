var Board = new function() {
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
                this.board[i][j] = Math.floor(Math.random() * 2) + 1;
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
                if (this.board[i][j] == 1) {
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
     * 
     */
    this.checkNeighbors = function() {
        var count = 0;
        i = this.i;
        j = this.j;
        if (typeof this.board[i + 1] !== 'undefined') {
            if (typeof this.board[i + 1][j] !== 'undefined') {
                if (this.board[i + 1][j] == 1) {
                    count++;
                }
            }

            if (typeof this.board[i + 1][j + 1] !== 'undefined') {
                if (this.board[i + 1][j + 1] == 1) {
                    count++;
                }
            }

            if (typeof this.board[i + 1][j - 1] !== 'undefined') {
                if (this.board[i + 1][j - 1] == 1) {
                    count++;
                }
            }
        }

        if (typeof(this.board[i - 1]) != 'undefined') {
            if (typeof(this.board[i - 1][j]) != 'undefined') {
                if (this.board[i - 1][j] == 1) {
                    count++;
                }
            }

            if (typeof this.board[i - 1][j + 1] !== 'undefined') {
                if (this.board[i - 1][j + 1] == 1) {
                    count++;
                }
            }

            if (typeof this.board[i - 1][j + 1] !== 'undefined') {
                if (this.board[i - 1][j + 1] == 1) {

                }
            }
        }

        if (typeof this.board[i][j + 1] !== 'undefined') {
            if (this.board[i][j + 1] == 1) {
                count++;
            }
        }

        if (typeof this.board[i][j - 1] !== 'undefined') {
            if (this.board[i][j - 1] == 1) {
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
        Board = [];
        for (var i = 0; i < this.blocks; i++) {
            Board[i] = [];
            for (var j = 0; j < this.blocks; j++) {
                this.i = i;
                this.j = j;
                var neighbours = self.checkNeighbors();
                if (neighbours == 3 && this.board[i][j] == 2) {
                    Board[i][j] = 2;
                }

                if (((neighbours > 3) || (neighbours < 2)) && this.board[i][j] == 2) {
                    Board[i][j] = 1;
                }
            }
        }

        for (var i = 0; i < this.blocks; i++)
            for (var j = 0; j < this.blocks; j++)
                this.board[i][j] = Board[i][j];

        self.fillBoard();
        setTimeout(function() {
            self.newBoard();
        }, 3000)
    };
}