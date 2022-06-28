console.log('Om');

let board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
let gameOver = false;

window.onload = () => {
    setGame()
}

function setGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    for (let r = 0; r < 3; r++) {

        for (let c = 0; c < 3; c++) {

            let tile = document.createElement("div")

            //<div id="0-0"></div>
            tile.id = r.toString() + "-" + c.toString()

            tile.classList.add("tile")

            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line")
            }
            tile.innerText = "";

            document.getElementById("board").appendChild(tile)

            tile.addEventListener("click", setTile)
        }

    }
}

function setTile() {

    if (gameOver) { return; }

    let coords = this.id.split("-"); //["0","1"]

    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // console.log(coords);

    if (board[r][c] != "") {
        //already taken
        return;
    }


    board[r][c] = currPlayer;// means 0
    this.innerText = currPlayer // on screen= 0

    if (currPlayer == playerO) {

        currPlayer = playerX;

    } else {

        currPlayer = playerO;

    };

    checkWinner();

}

function checkWinner() {

    //horizontally, check 3 rows,console.log(coords) for logic understanding in horizontally by clicking

    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != "") {
            //if we found the winning row
            //apply the winner style to that row
            for (i = 0; i < 3; i++) {
                // console.log('done');

                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
                // console.log('done2');


            }
            gameOver = true;
            return;

        }


    }


    //vertically, check 3 columns

    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != '') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "") {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //  anti-diagonally

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "") {

        let tile = document.getElementById("0-2");

        tile.classList.add("winner");

        tile = document.getElementById("1-1");

        tile.classList.add("winner");

        tile = document.getElementById("2-0");

        tile.classList.add("winner");

        gameOver = true;
        return;
    }
}