
//IIFE
(function () {
  document.getElementsByClassName("expression")[0].disabled = true;
})();

let evaluated=false
//Event Listeners
const buttons = document.querySelectorAll(".btn");

function buttonInformation() {
  console.log("Button clicked:", this.value);
  let Content = document.getElementsByClassName("expression")[0];
  Content.value += this.value;
  let result = document.getElementsByClassName("result")[0];
  let expres = document.getElementsByClassName("expression")[0].value.trim();
  console.log(expres);
  try {
    evaluated=false
    expres = evaluate(expres);
    console.log(expres);
    if (!isNaN(expres)) {
      result.innerText = expres;
      evaluated=true
    } else {
      throw "Invalid syntax";
    }
  } catch (e) {
    console.log("Errir"+e.message);
    result.innerText = e.message;
    evaluated=false
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", buttonInformation.bind(button));
  
});
const saveToHistory=()=>{
  console.log(this)
  const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
  const newDiv=document.createElement("div")
  const deleteButton=document.createElement("button")
  deleteButton.innerText="X"
  newDiv.style.display="flex"
  newDiv.style.justifyContent="space-between"
  const newOption = document.createElement("p");
  newOption.innerText = document.getElementsByClassName("expression")[0].value.trim();
  newOption.onclick = function () {
    console.log(this.innerText)
    document.getElementsByClassName("expression")[0].value=this.innerText
  }.bind(newOption);
  deleteButton.addEventListener('click',function deleting(){
    this.remove()
    console.log(this)
  }.bind(newDiv))
  newDiv.appendChild(newOption)
  newDiv.appendChild(deleteButton)
  dropdownContent.appendChild(newDiv);
}

document.getElementsByClassName("clear")[0].addEventListener("click", () => {
    document.getElementsByClassName("expression")[0].value = "";
    document.getElementsByClassName("result")[0].innerText = 0;
});



const evaluation = document.querySelectorAll(".eval1");
evaluation.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("hello");
    let result = document.getElementsByClassName("result")[0];
    let expres = document.getElementsByClassName("expression")[0].value.trim();
    if(expres.length===0){
      return;
    }
    console.log(expres);
    try {
      evaluated=false
      expres = evaluate(expres);
      console.log("Result=>"+expres);
      if (!isNaN(expres)) {
        result.innerText = expres;
        const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
        const duplicates=Object.values(dropdownContent.children).filter((btn)=>{
          console.log(btn.innerText)
           return btn.innerText===document.getElementsByClassName("expression")[0].value.trim()
        })
        if(duplicates.length===0){
          saveToHistory()
        }
        evaluated=true
        alert("Expression is Saved to History")
      } else {
        result.style.scale="0.4"
        throw "Invalid syntax";
      }
    } catch (e) {
      console.log("Errir"+e);
      result.innerText = e.message;
      evaluated=false
    }
  });
});





document.getElementsByClassName("Edit")[0].addEventListener("click", () => {
  console.log("clicked");
  document.getElementsByClassName("expression")[0].disabled =
    !document.getElementsByClassName("expression")[0].disabled;
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
  console.log(newButton);
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

