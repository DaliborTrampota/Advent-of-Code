const fs = require('fs');
const path = require('path');

let rawInput = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

const operators = {
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
}

//took part one 30min 
console.time('Part one');
console.log(partOne(parseInput(rawInput, false)));
console.timeEnd('Part one');
console.log('\n\n')
console.time('Part one RPN');
console.log(partOneRPN(parseInput(rawInput, false)));
console.timeEnd('Part one RPN');
console.log('\n\n');
console.time('Part two');
console.log(partTwo(parseInput(rawInput, true)));
console.timeEnd('Part two');

function parseInput(rawInput, isPartTwo){
    let input = rawInput.split('\r\n');
    
    return input;
}

function partOne(equations){
    let sum = 0;
    for(let eq of equations){
        let brackets = findBrackets(eq);
        let res = solve(eq, brackets, false)
        sum += res;
        //console.log(res);
    }
    return sum;
}

function partOneRPN(equations){
    let sum = 0;
    for(let eq of equations){
        let res = RPN(eq)
        sum += res;
        //console.log(res);
    }
    return sum;
}

function partTwo(equations){
    let sum = 0;
    for(let eq of equations){
        let brackets = findBrackets(eq);
        sum += solve(eq, brackets, true)
    }
    return sum;
}

function solve(eq, brackets, isPartTwo){
    let hasNested = true;
    while(hasNested){
        eq = solveNestedBetter(eq, brackets, isPartTwo);
        if(!eq.includes("("))
            hasNested = false;
    }
    return solveSimple(eq, isPartTwo);
}

function solveSimple(eq, addBeforeMultiply){
    eq = eq.split(/ +/);
    if(!eq[0])
        eq.shift()

    if(addBeforeMultiply){
        for(let i = eq.length - 2; i >= 0; i -= 2){
            if(eq[i] == '+'){
                eq[i - 1] = Number(eq[i - 1]) + Number(eq[i + 1]);
                eq.splice(i, 2);
            }
        }    
        return eval(eq.join(" "));
    }else{
        let res = eq.shift();
        for(let i = 0; i < eq.length; i += 2)
            res = eval(res + eq[i] + eq[i + 1]);
        return res;
    }
}

//wrote this home :), what it does it loops through the brackets and checks if bracket doesnt have brackets within them then it solves and continues
function solveNestedBetter(eq, brackets, isPartTwo){
    let keys = Object.keys(brackets);
    for(let i = 0; i < keys.length - 1; i++){
        let start = keys[i].split("_")[0]//0 = index, 1 = start or end
        let next = keys[i + 1].split("_")[0];
        if(start == next){
            let eqToSolve = eq.slice(brackets[`${start}_start`], brackets[`${start}_end`])  
            delete brackets[`${start}_start`]
            delete brackets[`${start}_end`]
            let nestedRes = solveSimple(eqToSolve, isPartTwo);
            eq = eq.replace("(" + eqToSolve + ")", nestedRes.toString().padStart(eqToSolve.length + 2, " "));//I pad the number so the equation stays the same length so the brackets indecies are still correct. I dont know if this is more performant than callind findBrackets function again
            i++;
        }
    }
    return eq
}

function findBrackets(eq){
    let chars = eq.split("");
    let brackets = {};
    for(let i = 0; i < chars.length; i++){
        if(chars[i] == "("){
            brackets[`${i}_start`] = i + 1;
        }
        if(chars[i] == ")"){
            for(let j = chars.length; j >= 0; j--){
                let values = Object.values(brackets)
                if(!brackets.hasOwnProperty(`${j}_end`) && brackets.hasOwnProperty(`${j}_start`)){
                    if(!values.includes(i))
                        brackets[`${j}_end`] = i;
                }
            }
        }
    }
    return brackets;
}

//idk what I was doing here lol i was tired and not at home :)
function solveNested(eq, brackets, isPartTwo){
    let start, end;
    for(let key in brackets){
        start = key.split("_")[0]
        end = brackets[`${start - 1}_end`];
        break;
    }
    let eqToSolve = eq.slice(start, end);
    let hasNested = eqToSolve.indexOf("(");

    if(hasNested == -1){
        delete brackets[`${start - 1}_start`]
        delete brackets[`${start - 1}_end`]
        let nestedRes = solveSimple(eqToSolve, isPartTwo);
        return eq.replace("(" + eqToSolve + ")", nestedRes.toString().padStart(eqToSolve.length + 2, " "));
    }else{
        let keys = Object.keys(brackets);
        let start;
        for(let i = 0; i < keys.length; i++){
            start = keys[i].split("_")[0]
            if(start == keys[i + 1].split("_")[0]){
                eqToSolve = eq.slice(brackets[`${start}_start`], brackets[`${start}_end`])  
                break;
            }
        }
        delete brackets[`${start}_start`]
        delete brackets[`${start}_end`]
        let nestedRes = solveSimple(eqToSolve, isPartTwo);
        return eq.replace("(" + eqToSolve + ")", nestedRes.toString().padStart(eqToSolve.length + 2, " "));
    }
}


//console.log(RPN("2 * ((3 + 4 + 3) * 3)"))
function RPN(eq){
    let operatorStack = [];
    let stack = [];
    for(let i = 0; i < eq.length; i++){
        if(eq[i] == ' ')
            continue;


        if(operators.hasOwnProperty(eq[i])){
            while(operatorStack.length && operatorStack[operatorStack.length - 1] != '('){
                stack.push(operators[operatorStack.pop()](...stack.splice(-2)))
            }
            operatorStack.push(eq[i]);
        }else if(eq[i] == '('){
            operatorStack.push(eq[i]);
        }else if(eq[i] == ')'){
            while(operatorStack[operatorStack.length - 1] != '('){
                stack.push(operators[operatorStack.pop()](...stack.splice(-2)))
            }
            if(operatorStack[operatorStack.length - 1] == '(')
                operatorStack.pop();
            if(operators.hasOwnProperty(operatorStack[operatorStack.length - 1]))
                stack.push(operators[operatorStack.pop()](...stack.splice(-2)))
        }else{
            stack.push(Number(eq[i]));
        }
    }
    while(stack.length != 1){
        stack.push(operators[operatorStack.pop()](...stack.splice(-2)))
    }
    return stack[0];
}


class Stack{
    constructor(equation){
        this.stack = [];
        this.operatorStack = [];
        this.equation = equation.split(/ +/);
    }

    

    pop(){

    }

    push(){
        let char = equation.shift();
        if(this.operators.hasOwnProperty(char))
            this.operatorStack.push(char);
        else
            this.stack.push(char);
    }
}