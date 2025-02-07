const display = document.getElementById('operation-result');
//seleciona todas as teclas de numeros
const numbers = document.querySelectorAll('[id*=key-number]');
const btnClear = document.getElementById('key-c')
const btnClearOne = document.getElementById('key-backspace')
const btnOperator = document.querySelectorAll('[id*=key-operator]')
const btnEqual = document.getElementById('key-equal')

//atualiza o display com o valor capturado do click
const updateDisplay = (text) => {
     console.log(text);
     //impede que um operador seja usado seguidamente
     let lastDisplayContent = display.textContent.charAt(display.textContent.length - 1)
     let controlerLastDisplayContent = ["-","+","/","*","."].includes(lastDisplayContent)
     let controlerLastTextContent = ["-","+","/","*","."].includes(text)   
     
     if(controlerLastDisplayContent && controlerLastTextContent){
          if(text === lastDisplayContent) return
     display.textContent = display.innerHTML.substring(0,display.innerHTML.length -1)
     } 
     
     //impede que a quantidade de digitos seja maior que o tamanho do display
     if(display.textContent.length > 20) return  
     
     display.textContent += text;
}

const updateDisplayKeyup = (text) => {
     console.log(text);
     //impede que um operador seja usado seguidamente
     let lastDisplayContent = display.textContent.charAt(display.textContent.length - 1)
     let controlerLastDisplayContent = ["-","+","/","*","."].includes(lastDisplayContent)
     let controlerLastTextContent = ["-","+","/","*","."].includes(text)   
     let controlerNumberKeyup = ["0","1","2","3","4","5","6","7","8","9"].includes(text)
     
     if(controlerLastDisplayContent && controlerLastTextContent){
          if(text === lastDisplayContent) return
          
     display.textContent = display.innerHTML.substring(0,display.innerHTML.length -1)
     display.textContent += text;  
     } 
     
     //impede que a quantidade de digitos seja maior que o tamanho do display
     if(display.textContent.length > 20) return  

     if(text === "Delete") return display.innerHTML = ""

     if(text === "Backspace"){
          let valueResult = display.innerHTML
          return display.innerHTML = valueResult.substring(0, valueResult.length -1)
     } 
     
     if(controlerNumberKeyup || controlerLastTextContent){
       display.textContent += text;   
     }   
}

//captura o valor do click
const getClick = (event) => updateDisplay(event.target.textContent);

//adiciona um evento de click para toda tecla de numero e operador
numbers.forEach (number => number.addEventListener('click', getClick));
btnOperator.forEach(operator => operator.addEventListener('click', getClick))

// limpa o display
btnClear.addEventListener('click', () => display.innerHTML = "")

// elimina um numero
btnClearOne.addEventListener('click', () => {
     let valueResult = display.innerHTML
     display.innerHTML = valueResult.substring(0, valueResult.length -1)
})

function cacl() {
     if(display.innerHTML) {
          let valueResult = eval(display.innerHTML)
          console.log("value",valueResult);
               if(isNaN(valueResult)){
                    return display.innerHTML = "Erro"    
               }
          display.innerHTML = valueResult
     }
}

btnEqual.addEventListener('click', cacl)

document.addEventListener("keyup",(event) => updateDisplayKeyup(event.key))