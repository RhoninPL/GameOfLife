var Game = function() {
    var board = []; // status: 1 dead, 2 alive
    var sizeBlock = 16;
    var blocks = 50;
    var self = this;

    /**
     * Wypełnia tablicę losowymi stanami
     */
    fillBoardArray = function() {
        for (var i = 0; i < blocks; i++) {
            board[i] = [];
            for (var j = 0; j < blocks; j++) {
                board[i][j] = Math.floor(Math.random() * 2) + 1;
            }
        }
    };

    /**
     *     Wypełnia element canvas w kwadraty
     */
    fillBoard = function() {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        for (var i = 0; i < blocks; i++) {
            for (var j = 0; j < blocks; j++) {
                if (board[i][j] == 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(i * sizeBlock, j * sizeBlock, sizeBlock, sizeBlock);
                } else {
                    ctx.fillStyle = "#404040";
                    ctx.fillRect(i * sizeBlock, j * sizeBlock, sizeBlock, sizeBlock);
                }
            }
        }
    };

    /**
     * Sprawdzanie sąsiadów
     */
    checkNeighbors = function(i, j) {
        var count = 0;
        if (typeof board[i + 1] !== 'undefined') {
            if (typeof board[i + 1][j] !== 'undefined') {
                if (board[i + 1][j] == 2) {
                    count++;
                }
            }

            if (typeof board[i + 1][j + 1] !== 'undefined') {
                if (board[i + 1][j + 1] == 2) {
                    count++;
                }
            }

            if (typeof board[i + 1][j - 1] !== 'undefined') {
                if (board[i + 1][j - 1] == 2) {
                    count++;
                }
            }
        }

        if (typeof(board[i - 1]) != 'undefined') {
            if (typeof(board[i - 1][j]) != 'undefined') {
                if (board[i - 1][j] == 2) {
                    count++;
                }
            }

            if (typeof board[i - 1][j + 1] !== 'undefined') {
                if (board[i - 1][j + 1] == 2) {
                    count++;
                }
            }

            if (typeof board[i - 1][j + 1] !== 'undefined') {
                if (board[i - 1][j + 1] == 2) {
                    count++;
                }
            }
        }

        if (typeof board[i][j + 1] !== 'undefined') {
            if (board[i][j + 1] == 2) {
                count++;
            }
        }

        if (typeof board[i][j - 1] !== 'undefined') {
            if (board[i][j - 1] == 2) {
                count++;
            }
        }


        return count;
    };

    run = function() {
        fillBoardArray();
        fillBoard();
        generateNewBoard();
    };

    generateNewBoard = function() {
        var boardtmp = [];

        for (var i = 0; i < blocks; i++) {
            boardtmp[i] = [];
            for (var j = 0; j < blocks; j++) {
                var neighbours = checkNeighbors(i, j);
                if (neighbours == 3) {
                    boardtmp[i][j] = 2;
                } else if (((neighbours > 3) || (neighbours < 2))) {
                    boardtmp[i][j] = 1;
                } else {
                    boardtmp[i][j] = board[i][j];
                }
            }
        }

        for (var i = 0; i < blocks; i++) {
            for (var j = 0; j < blocks; j++) {
                board[i][j] = boardtmp[i][j];
            }
        }

        fillBoard();
        setTimeout(function() {
            generateNewBoard();
        }, 3000)
    };

    return {
        run: run
    }
}();