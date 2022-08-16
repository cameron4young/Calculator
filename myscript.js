var all_buttons = document.querySelectorAll(".bluebutton, .redbutton, .membutton");
var output = document.querySelector(".output");
const history = document.getElementById("history");
const memory = document.getElementById("memory");
const number_elements = document.querySelectorAll(".number");
const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
const functions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan','!', 'log', 'ln','E'];
var last_pressed = all_buttons[5];

for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].addEventListener('click', evt=>{
		elem = document.elementFromPoint(evt.x, evt.y);
        // highlights last pressed button as gray and returns second to last pressed button back to original color
        if (last_pressed.classList.contains("redbutton")){
            last_pressed.style.backgroundColor="#763838";
        } else {
             last_pressed.style.backgroundColor="#93d4d6";
        }
		elem.style.backgroundColor="#817c79";
        last_pressed=elem;
        let display = output.innerHTML;
        // evaluates function if equals button is pressed
        if (elem.innerHTML=="="){
            try{
                let evaluation = math.eval(display);
                let result = "<p>"+evaluation+"</p>";
                history.insertAdjacentHTML("afterbegin", result);
                let equation = "<p>"+ display+"=</p>";
                history.insertAdjacentHTML("afterbegin", equation);
                output.innerHTML = evaluation;
            } catch (Error){
                // ensures user's input is a valid equation
                console.log(Error)
                output.innerHTML = "Error";
            }
        // memory functions
        } else if (elem.innerHTML=="STORE"){
            // stores current value/equation in memory
            let num = "<p class='membutton'>"+display+"</p>"
            memory.insertAdjacentHTML("afterbegin", num);
            let stored = memory.firstChild;
            stored.addEventListener('click', evt=>{
                if (output.innerHTML==0||output.innerHTML=="Error"){
                    output.innerHTML = stored.innerHTML;
                } else {
                    output.innerHTML += stored.innerHTML;
                }
            });
        } else if (elem.innerHTML=="RECALL"){
            // returns last element of memory
            output.innerHTML= memory.firstChild.innerHTML;
        } else if (elem.innerHTML=="CLEAR"){
            // clears memory list
            memory.innerHTML=" ";
        } else if (elem.innerHTML=="ADD"){
            // adds last memory element to display value
            try{
                evaluation = math.eval(display);
                sum = math.eval(evaluation+"+"+memory.firstChild.innerHTML);
                output.innerHTML=sum;
            } catch (Error){
                output.innerHTML="Error";
            }
        } else if (elem.innerHTML=="SUBTRACT"){
            // subtracts last memory element to display value
            try{
                evaluation = math.eval(display);
                sum = math.eval(evaluation+"-"+memory.firstChild.innerHTML);
                output.innerHTML=sum;
            } catch (Error){
                output.innerHTML="Error";
            }
        // clear and backspace
        } else if (elem.innerHTML=="AC"){
            output.innerHTML="0";
        } else if (elem.innerHTML=="BACKSPACE"){
            if (display.length==1){
                output.innerHTML= "0"
            } else{
                output.innerHTML = display.slice(0, -1);
            }
        // switches display value from negative to positive
        } else if (elem.innerHTML=="(-)"){
            if (display[0]=="-"){
                output.innerHTML = display.substring(1, display.length);
            } else{
                output.innerHTML = "-" + display;
            }
        // displays more functions by replacing numbers w/ functions
        } else if (elem.innerHTML=="MORE FUNCTIONS"){
            for (let i = 0; i<number_elements.length; i++){
                number_elements[i].innerHTML=functions[i]
            }
            elem.innerHTML="NUMBERS"
        // displays numbers
        } else if (elem.innerHTML=="NUMBERS"){
            for (let i = 0; i<number_elements.length; i++){
                number_elements[i].innerHTML= numbers[i];
            }
            elem.innerHTML="MORE FUNCTIONS"
        } else {
            if (display==0||display=="Error"){
                if (!elem.id || elem.innerHTML=="("){
                    // sets display value to the button pressed if display is error or zero, and if the button does not contain an operator
                    output.innerHTML = elem.innerHTML; 
                }
            } else {
                // adds button value onto display value
                output.innerHTML += elem.innerHTML;
            }
        }
        // prevents formatting issues, shrinks display text once it gets to a certain length
        if (display.length>=56){
            output.style.fontSize = "1vw";
        } else if (display.length>=38){
            output.style.fontSize = "2vw";
        } else {
            output.style.fontSize = "3vw";
        }
    })
}