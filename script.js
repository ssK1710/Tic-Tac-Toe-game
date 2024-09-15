
//Select all boxes, buttons and message container elements from the DOM
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#reset-new");
let msgContainer = document.querySelector(".print-msg");
let msg = document.querySelector("#msg");

//Initialize game state
let turnO = true; //true value for player O turn and false for player X turn
let movecount = 0; //Track number of moves

//Define winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//Function to reset the game state
const resetGame = ()=>{
    turnO = true; //Player O turn
    movecount = 0; //reset move count
    enableBoxes(); //Functioncall for enable all boxes and clear their content
    msgContainer.classList.add("hide"); //Hide the message container
}

//Function to disable all boxes
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true; //Disable each box
    }
}

//Function to enable all boxes and clear their content
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false; //Enable each box
        box.innerText = ""; //Clear text
        box.classList.remove("x", "o"); //Remove styling
    }
}

//Add click event listener to all boxes
boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        //Check whose turn it is and update the box accordingly
        if(turnO){
            box.innerText="O";
            box.classList.add("o");
            turnO=false; //Switch to player X turn
        }
        else{
            box.innerText="X";
            box.classList.add("x");
            turnO=true; //Switch to player O turn
        }
        box.disabled = true; //Disable the clicked box
        movecount++; //Increment move count
        checkWinner(); //FunctionCall to check winner or draw
    });
});

//Function to display the winner message
const showWinner = (winner) =>{
    msg.innerText = `Winner is ${winner}`; //Show winner message
    msgContainer.classList.remove("hide"); //Show message container
    disableBoxes(); //Functioncall for disable all boxes
};

//Function to display a draw message
const showDraw = () => {
    msg.innerText = "Draw!"; //Show draw message
    msgContainer.classList.remove("hide"); //Show message container
    disableBoxes(); //Functioncall for disable all boxes
};

//Function to check if there is winner or draw 
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        //Check if the values in the winning pattern are the same
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val); //Show winner
            }
        }
    }
    //Check if the game is draw
    if(movecount===9){
        showDraw(); //Functioncall for draw message
    }
};

//Add event listeners to the reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
