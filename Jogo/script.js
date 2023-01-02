const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector('[data-board]')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-Button]')

let isCircleTurn;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.addEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }


    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
}

const endGame = (isdraw) => {
    if (isdraw) {
        winningMessageText.innerText = 'Draw!'
    }else {
        winningMessageText.innerText = isCircleTurn ? 'Circle Win!' : 'X Win!'
    }
    winningMessage.classList.add("show-winning-message")
}

const checkForWin = (currentPlayer) => {
    return winCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const CheckforDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle')
    }else {
        board.classList.add('x')
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass();
};  

const handleClick = (e) => {
    const cell = e.target;
    
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    
    placeMark(cell, classToAdd);
    
    const iswin = checkForWin(classToAdd);

    const isdraw = CheckforDraw();
    if (iswin) {
        endGame(false);
    }else if (isdraw) {
        endGame(true);
    }else {
        swapTurns();
    }


};
startGame();

restartButton.addEventListener("click", startGame);