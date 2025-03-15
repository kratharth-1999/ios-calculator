const resultContainer = document.getElementById("result");
/* This is to keep the number clicked before clicking on any opeartion */
let firstOperand = 0;
/* To store the current number typed */
let currentOperand = 0;
/* To store the operation to do before the user hits = */
let operationToDo = "";
/*  This is to reset the number if the user clicks on a number after clicking = 
    This is also to not allow the user to hit backspace immediately after clicking =
*/
let operationJustExecuted = false;

function handleClick(text) {
    if (!isNaN(Number(text))) {
        /* If it is a number */
        if (operationJustExecuted) {
            currentOperand = 0;
            operationJustExecuted = false;
        }
        currentOperand += text;
        currentOperand = Number(currentOperand);
    } else {
        /* If it is an operation */
        switch (text) {
            case "+":
            case "-":
            case "x":
            case "/":
                operationToDo = text;
                firstOperand = currentOperand;
                currentOperand = 0;
                break;
            case "C":
                firstOperand = 0;
                currentOperand = 0;
                operationToDo = "";
                break;
            case "<-":
                if (!operationJustExecuted)
                    currentOperand = Math.floor(currentOperand / 10);
                break;
            case "=":
                performOperation();
                break;
            default:
                console.error("Unknown operation", text);
        }
    }
    resultContainer.innerText = currentOperand;
}

function performOperation() {
    switch (operationToDo) {
        case "+":
            currentOperand = firstOperand + currentOperand;
            break;

        case "-":
            currentOperand = firstOperand - currentOperand;
            break;

        case "x":
            currentOperand = firstOperand * currentOperand;
            break;

        case "/":
            currentOperand = firstOperand / currentOperand;
            break;

        default:
            console.error("No valid operation selected");
    }
    operationToDo = "";
    operationJustExecuted = true;
}

document
    .getElementById("button-container")
    .addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON")
            handleClick(event.target.innerText);
    });
