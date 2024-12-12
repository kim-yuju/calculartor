let buttons = document.querySelectorAll("button");
let text = document.querySelector(".text");
let afterOperator = false; // 연산자 버튼이 눌렸는지 추적하는 변수
let firstOperand, operator;

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    console.log(this.value);

    // 숫자를 눌렀을 때 출력
    if (this.classList.contains("number")) {
      if (text.textContent === "0" || afterOperator) {
        text.textContent = this.value;
        afterOperator = false;
      } else {
        text.textContent += this.value;
      }

      // C를 눌렀을 때 0으로 초기화
    } else if (button.textContent === "C") {
      text.textContent = "0";
      afterOperator = false;
      firstOperand = undefined;
      operator = undefined;

      // .을 눌렀을 때 출력
    } else if (button.textContent === ".") {
      if (!text.textContent.includes(".")) {
        text.textContent += text.textContent === "" ? "0." : ".";
      }

      // 연산자 버튼을 눌렀을 때
    } else if (this.classList.contains("operator")) {
      if (firstOperand !== undefined && !afterOperator) {
        let secondOperand = Number(text.textContent);
        let result = calculate(firstOperand, secondOperand, operator);
        text.textContent = result;
        firstOperand = result;
      } else {
        firstOperand = Number(text.textContent);
      }
      operator = this.value;
      afterOperator = true;

      console.log(firstOperand);
      console.log(operator);

      // '=' 버튼을 눌렀을 때
    } else if (this.classList.contains("equal")) {
      if (firstOperand !== undefined && operator) {
        let secondOperand = Number(text.textContent);
        let result = calculate(firstOperand, secondOperand, operator);
        text.textContent = result; // 결과를 텍스트에 출력
        firstOperand = undefined;
        operator = undefined;
        afterOperator = false; // 다음 입력을 위해 초기화
      }
    }
  });
});

function calculate(a, b, op) {
  switch (op) {
    case "/":
      return Number((a / b).toFixed(10));
    case "*":
      return a * b;
    case "-":
      return a - b;
    case "+":
      return a + b;
    default:
      return b;
  }
}
