//IIFE
(function () {
  document.getElementsByClassName("expression")[0].disabled = true;
  
  // alert(`Note
  //   1)It will evaluate as you keep on clicking expressions
  //   2)For saving in history you have to press Equal = button
  //   3)For deleting hover on history to see evaluated expressions 
  //   4)By clicking on Edit button you can edit the expression and then again edit to close that mode`)
})();
var calculatorButtons = {
  '.':'.',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '^': '^',
  '(': '(',
  ')': ')',
  'sin': 'sin',
  'cos': 'cos',
  'tan': 'tan',
  'sqrt': 'sqrt',
  '%': '%',
  'Pi': '3.1415',
  'e':'2.7182'
};
let indexToInsert=0
let editable=false
let evaluated=false
//Event Listeners
const buttons = document.querySelectorAll(".btn");

function buttonInformation() {
  let result = document.getElementsByClassName("result")[0];
  let Content = document.getElementsByClassName("expression")[0];
  if(editable===false){
    Content.value += this.innerText;
  }
  else{
    Content.value=Content.value.slice(0,indexToInsert)+this.innerText+Content.value.slice(indexToInsert)
  }
  indexToInsert+=1
  try {
    evaluated=false
    let expres = evaluate(Content.value.trim(),calculatorButtons);
    if (!isNaN(expres)) {
      result.innerText = expres;
      evaluated=true
    } else {
      throw "Invalid syntax";
    }
  } catch (e) {
    result.innerText = e.message;
    evaluated=false
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", buttonInformation.bind(button));
  
});
const saveToHistory=()=>{
  const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
  const newDiv=document.createElement("div")
  const deleteButton=document.createElement("button")
  deleteButton.innerText="X"
  newDiv.style.display="flex"
  newDiv.style.justifyContent="space-between"
  const newOption = document.createElement("p");
  newOption.innerText = document.getElementsByClassName("expression")[0].value.trim();
  newOption.onclick = function () {
    document.getElementsByClassName("expression")[0].value=this.innerText
  }.bind(newOption);
  deleteButton.addEventListener('click',function deleting(){
    this.remove()
  }.bind(newDiv))
  newDiv.appendChild(newOption)
  newDiv.appendChild(deleteButton)
  dropdownContent.appendChild(newDiv);
}

document.getElementsByClassName("clear")[0].addEventListener("click", () => {
    document.getElementsByClassName("expression")[0].value = "";
    document.getElementsByClassName("result")[0].innerText = 0;
    indexToInsert=0
});



const evaluation = document.querySelectorAll(".eval1");
evaluation.forEach((button) => {
  button.addEventListener("click", () => {
    let result = document.getElementsByClassName("result")[0];
    let expres = document.getElementsByClassName("expression")[0].value.trim();
    if(expres.length===0){
      return;
    }
    try {
      evaluated=false
      expres = evaluate(expres,calculatorButtons);
      console.log("Result=>"+expres);
      if (!isNaN(expres)) {
        result.innerText = expres;
        const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
        const duplicates=Object.values(dropdownContent.children).filter((btn)=>{
          console.log("Already present=>"+btn.innerText)
           return btn.innerText===document.getElementsByClassName("expression")[0].value.trim()+"X"
        })
        console.log(duplicates)
        if(duplicates.length===0){
          saveToHistory()
          alert("Expression is Saved to History")
        }
        else{
          alert("Expression already Saved to History")
        }
        evaluated=true

      } else {
        result.style.scale="0.4"
        throw "Invalid syntax";
      }
    } catch (e) {
      result.innerText = e.message;
      evaluated=false
    }
  });
});





document.getElementsByClassName("Edit")[0].addEventListener("click", () => {
  document.getElementsByClassName("expression")[0].disabled =
    !document.getElementsByClassName("expression")[0].disabled;
   editable=!editable
});


let modal = document.getElementById("myModal");
let btn = document.querySelector(".myOwnConstants");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById("saveConstant").onclick = function () {
  let constantName = document.getElementById("constantName").value;
  let constantValue = document.getElementById("constantValue").value;
  let newButton = document.createElement("button");
  newButton.classList.add("btn");
  newButton.style.backgroundColor = "rgb(40, 172, 40)";
  newButton.style.color = "white";
  newButton.innerText = constantName;
  newButton.value = constantValue;
  newButton.addEventListener("click", buttonInformation.bind(newButton));

  let duplicates = Object.values(
    document.getElementsByClassName("operations")[0].children
  ).filter(
    (btn) =>
      btn.innerText === newButton.innerText || btn.value === newButton.value
  );
  console.log(duplicates);
  if (duplicates.length > 0) {
    document.getElementsByClassName("Error")[0].innerText =
      "Constant already exist";
  } else {
    document.getElementsByClassName("operations")[0].appendChild(newButton);
  }
};

document.getElementsByClassName("expression")[0].addEventListener("click",()=>{
   document.getElementsByClassName("expression")[0].focus()
  const cursorPosition =document.getElementsByClassName("expression")[0].selectionStart;
  console.log("Cursor Position: ", cursorPosition);
  indexToInsert=cursorPosition
  editable=true
})
