let result = [];
let save = "";
let answer = 0;

let buttons = document.querySelector('.calc-buttons');
let screen = document.querySelector('.screen');

let code = [];
window.addEventListener('keydown',function(e){
  code.push(e.key);
  
  if ((code.length === 3) && (code[0]===code[1]  && code[1]===code[2]) && code[0] === "6"){
    document.querySelector('.satimg').classList.toggle('activate');
    code = [];
  }
  if (code.length === 3){
    code = [];
  }
} ); 



buttons.addEventListener('click',(e)=>{
  const audio = document.querySelector(`audio[data-key="${e.target.parentNode.getAttribute('data-key')}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  var element= document.querySelector("body");
  element.classList.toggle("satan");
  setTimeout(function(){ element.classList.toggle("satan");},1000);

  if(e.target.innerText === "C"){
    save = "";
    screen.innerText = 0;
    return;
  }

  if (e.target.innerText === "←"){
    save = save.substring(0,save.length -1);
    return
  }

  if (screen.innerText === "0"){
    if (e.target.innerText.match(/[-×+÷]/g)){
      return
    }
  }

  if (e.target.innerText !== "="){
    save += e.target.innerText;
    screen.innerText = save;
    if (save[save.length-1].match(/[-×+÷]/g)){
      screen.innerText = 0;
      result.push(save);
      save = "";
      console.log(result);
    }
  }else{
    if ((result.length>= 1)){
      result.push(save);
      computeResult(result);
    }
  }
 
  event.stopPropagation();
});

function computeResult(arr){

  let expression = arr.join("");
  let numbers = expression.split(/[-×+÷]/g).filter(e=> e!="");
  let operators = expression.split(/[^-×+÷]/g).filter(e=> e!="");
  console.log(numbers);
  console.log(operators);

  while (operators.includes('×') || operators.includes('÷')){
    if((operators.indexOf('÷') === -1) || (operators.indexOf('×') < operators.indexOf('÷')) && (operators.indexOf('×') !== -1)){ 
      answer = mathematics(numbers[0] ,numbers[1],'×');
      numbers.splice(0,2,answer);
      operators.splice(operators.indexOf('×'),1);
    } else{
      answer = mathematics(numbers[0] ,numbers[1],'÷');
      numbers.splice(0,2,answer);
      operators.splice(operators.indexOf('÷'),1);
    }
  }

  while (operators.includes('+') || operators.includes('-')){
    if((operators.indexOf('-') === -1) || (operators.indexOf('+') < operators.indexOf('-'))&& (operators.indexOf('+') !== -1)){ 
      answer = mathematics(numbers[0] ,numbers[1],'+');
      numbers.splice(0,2,answer);
      operators.splice(operators.indexOf('+'),1);
    } else{
      answer = mathematics(numbers[0] ,numbers[1],'-');
      numbers.splice(0,2,answer);
      operators.splice(operators.indexOf('-'),1);
    }
}
    screen.innerText = answer;
    save = answer;
    result = [];
}

function mathematics(a,b,operator){
  switch(operator){
    case '+':
      return +a + +b;
    case '-':
      return +a - +b;
    case '×':
      return +a * +b;
    case '÷':
      if (+b === 0){
        alert('cant divide by 0 calculator resets..');
        //figuyre out how to reset and break out of  everything? try a var
        return 0;
      }else{
        return Math.round(+a / +b);
      }
    
  }
}



//divide by 0 error will be implemented later
