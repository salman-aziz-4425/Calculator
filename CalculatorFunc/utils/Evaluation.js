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



function evaluate(expression,Values) {
  expression=expression.replace("%","/100")
  const tokens = expression.match(/(?:\d+(\.\d+)?|[-+*^/()]|\b\w+\b|\b\w+\b|\bsin\b|\bcos\b)/g);
  console.log(Values)
  console.log(tokens)
for(let i=0;i<tokens.length;i++){
  if(tokens[i] in Values){
    tokens[i]=Values[tokens[i]]
  }
}
const values = [];
const ops = [];
tokens.forEach(token => {
  if (!isNaN(token)) {
    values.push(parseFloat(token, 10));
  } else if (token === '(') {
    ops.push(token);
  } else if (token === ')') {
      if( (ops[ops.length - 1]==='(')&&(ops[ops.length-2]==='sin'||ops[ops.length-2]==='cos' || ops[ops.length-2]==='sqrt' || ops[ops.length-2]==='tan')){
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

