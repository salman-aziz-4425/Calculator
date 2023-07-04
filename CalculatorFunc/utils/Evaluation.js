const precedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^':3
};

const applyOp = (op, valueOne,valueTwo) => {
  switch (op) {
    case '+':
      return valueTwo+  valueOne;
    case '-':
      return valueTwo-  valueOne;
    case '*':
      return valueTwo*  valueOne;
    case '/':
      if ( valueOne === 0) {
        throw new Error("Cannot divide  value zero");
      }
      return (valueTwo/ valueOne);
    case '^':
        return valueTwo** valueOne;
    case 'sin':
      return Math.sin(degreesToRadians( valueOne));
    case 'cos':
      return Math.cos(degreesToRadians( valueOne));
    case 'tan':
        return Math.tan(degreesToRadians( valueOne));
    case 'sqrt':
        return Math.sqrt(valueOne)
  }
};
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};



function evaluate(expression) {
  expression=expression.replace("%","/100")
const tokens = expression.match(/\d+(\.\d+)?|[-+*^/()]|\d+|\w+|\bsin\b|\bcos\b/g);
console.log(tokens)
const values = [];
const ops = [];
tokens.forEach(token => {
  if (!isNaN(token)) {
    values.push(parseFloat(token, 10));
  } else if (token === '(') {
    ops.push(token);
  } else if (token === ')') {
      if( ops[ops.length - 1]==='('&&(ops[ops.length-1]==='sin'||ops[ops.length-1]==='cos' || ops[ops.length-1]==='sqrt' || ops[ops.length-1]==='tan')){
            var operand=ops.pop()
            values.push(applyOp( ops[ops.length - 1],parseFloat( values.pop()),' '));
      }
   else{
        while (ops.length > 0 && ops[ops.length - 1] !== '(') {
      var operand=ops.pop()
      values.push(applyOp(operand, parseFloat(values.pop()), parseFloat(values.pop())));
    }
    if (ops.length === 0) {
      throw new Error("Mismatched parentheses");
    }
   }
   if(ops[ops.length-2]==='sin'||ops[ops.length-2]==='cos' || ops[ops.length-2]==='sqrt' || ops[ops.length-2]==='tan'){
       if(ops[ops.length-2]==='sin'){
          
           values[values.length-1]=Math.sin(degreesToRadians(values[values.length-1]))
       }
       else if(ops[ops.length-2]==='cos'){
           values[values.length-1]=Math.cos(degreesToRadians(values[values.length-1]))
       }
       else if(ops[ops.length-2]==='sqrt'){
        values[values.length-1]=Math.sqrt(values[values.length-1])
    }
       else{
            values[values.length-1]=Math.tan(degreesToRadians(values[values.length-1]))
       }
          ops.pop();
          ops.pop()
   }
   else{
        ops.pop()
   }

  }  else {
    while (
      ops.length > 0 &&
      precedence[token] <= precedence[ops[ops.length - 1]]
    ) {
      const op = ops.pop();
        values.push(applyOp(op,parseFloat(values.pop()), parseFloat(values.pop())));
    }
    ops.push(token);
  }
});

while (ops.length > 0) {
  if (ops[ops.length - 1] === '(') {
    throw new Error("Mismatched parentheses");
  }
  const op = ops.pop();
  values.push(applyOp(op, parseFloat(values.pop()), parseFloat(values.pop())));
}
if (values.length !== 1 || ops.length !== 0) {
  throw new Error("Invalid expression");
}
if(isNaN(values[0])){
    throw new Error("Invalid expression");
}
return values.pop().toFixed(4);
}


// // Usage example
// try{
//     if(isNaN(evaluate("10^2"))){
//         throw "Invalid"
//     }
//       console.log(evaluate("10^2")); 
// }
// catch{
//     console.log("error")
// }
console.log(evaluate("(10)")); // Output: 22
// console.log(evaluate("(100 * 2 + 12)")); // Output: 212
// console.log(evaluate("(100 * (2 + 12))")); // Output: 1400
// console.log(evaluate("(100 * (2 + 12) / 14)")); // Output: 100
// console.log(evaluate("sin(sin(7+5)+cos(8+5))"));
// // console.log(Math.sin(Math.sin(7+5)+Math.cos(8+5)))// Output: 100
// console.log(evaluate("cos(100) * (sin(2)+ cos(12)) / sin(14)")); // Output: 100
// console.log(evaluate("100* (2 + 12) / sin(14)")); // Output: 100
// console.log(evaluate('sin(0)+cos(0)'));
// console.log(evaluate("sin(30) + cos(45) * (10 - 5) / 2"));
// console.log(evaluate("sin(45) * cos(60) + sin(30) * tan(75)"));
// console.log(evaluate("((3 + 5) * (7 / 2)) - ((4 * 6) + (9 / 3))")); 
// try{
// console.log(evaluate("(3 + 5 * 7 / 2) - (4 * 6 + 9 / 3))")); 
// }catch{
//  console.log("Invalid expression")
// }