class Calculator{
  constructor(previousOperandText, currentOperandText){
  this.previousOperandText = previousOperandText
  this.currentOperandText = currentOperandText
  this.clear()
    }
   
clear() {
  this.currentOperand = ''
  this.previousOperand = ''
  this.operation = undefined
}

delete(){
  this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number){
  if (number === '.' && this.currentOperand.includes('.')) return
  this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation){
  if(this.currentOperand === '')return
  if(this.previousOperand !== '') {
    this.compute()
  }
  this.operation = operation
  this.previousOperand = this.currentOperand
  this.currentOperand = ''
}

compute() {
  let computation
  const prev = parseFloat(this.previousOperand)
  const current = parseFloat(this.currentOperand)
  if (isNaN(prev) || isNaN(current)) return
  switch(this.operation){
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
       break 
    case '×':
      computation = prev * current
      break
    case '/':
      computation = prev / current
      break
   default:   
   return
  }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''
}

getDisplayNumber(number){
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let  integerDisplay
  if(isNaN(integerDigits)){
    integerDisplay = ''
  } else{
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  //const floatNumber = parseFloat(number)
 // if(isNaN(floatNumber)) return ''
  //return floatNumber.toLocalString('en')
}

updateDisplay(){
  this.currentOperandText.innerText = this.currentOperand
  this.getDisplayNumber(this.currentOperand)
  if (this.operation != null){
    this.previousOperand.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
  }else{
    this.previousOperandTextElement = ''
  }
}
 }

const numberButton = document.querySelectorAll('[key-number]');
const operatorsButton = document.querySelectorAll('[key-operator]');
const deleteButton = document.querySelector('[del-operator]');
const allClearButton = document.querySelector('[allclear-operator]');
const equalButton = document.querySelector('[equal-operator]');
const currentOperandText = document.querySelector('[data-current-operand]');
const previousOperandText = document.querySelector('[data-previous-operand]');



const calculator = new Calculator(previousOperandText, currentOperandText);

numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operatorsButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
