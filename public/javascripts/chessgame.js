
const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard")

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board()
    boardElement.innerHTML = ""

    const inCheck = chess.in_check();
    console.log("In Check is : ", inCheck)
    let kingSquare = null;


    if (inCheck) {
        // Find the row and column where the checked king is located
        const king = board.flat().find(square => square && square.type === 'k' && square.color === chess.turn());
        console.log("THis is king : ", king)
        if (king) {
            kingSquare = {
                row: board.findIndex(row => row.includes(king)),
                col: board.find(row => row.includes(king)).indexOf(king)
            };
            console.log("King's square position:", kingSquare);
        }
    }
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div")
            squareElement.classList.add(
                "square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            // ➡️ <div data-row="rowindex_value" data-col="squareindex_value"></div>
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;


            // Highlight the king's square if in check
            if (inCheck && kingSquare && rowindex === kingSquare.row && squareindex === kingSquare.col) {
                squareElement.classList.add("check");
            }

            if (square) {
                const pieceElement = document.createElement("div")
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = GetPieceUnicode(square)
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex }
                        e.dataTransfer.setData("text/plain", "")       // drag korar somoy kono problem jate na hoi...
                    }
                })

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null
                    sourceSquare = null
                })

                squareElement.append(pieceElement)
            }

            squareElement.addEventListener("dragover", function (e) {
                e.preventDefault()
            })

            squareElement.addEventListener("drop", function (e) {
                e.preventDefault()
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    }

                    handleMove(sourceSquare, targetSource)
                }
            })
            boardElement.appendChild(squareElement)
        })
    })

    if (playerRole === "b") {
        boardElement.classList.add("flipped")
    }
    else {
        boardElement.classList.remove("flipped")
    }
}


const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q"
    }

    socket.emit("move", move)
}

const GetPieceUnicode = (piece) => {
    const unicodePieces = {

        p: " ♙ ",
        r: " ♜ ",
        n: " ♞ ",
        b: " ♝ ",
        q: " ♛ ",
        k: " ♚ ",
        P: " ♙ ",
        R: " ♖ ",
        N: " ♘ ",
        B: " ♗ ",
        Q: " ♕ ",
        K: " ♔ ",

    }
    return unicodePieces[piece.type] || "";
}


socket.on("playerRole", function (role) {
    playerRole = role
    renderBoard()
})


socket.on("spectatorRole", function () {
    playerRole = null
    renderBoard()
})


socket.on("boardState", function (fen) {
    chess.load(fen)
    renderBoard()
})

socket.on("move", function (move) {
    chess.move(move)
    renderBoard()
})

renderBoard()