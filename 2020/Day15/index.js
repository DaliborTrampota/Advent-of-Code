const fs = require('fs');
let input = fs.readFileSync('./Day15/input.txt', {encoding: 'utf-8'}).split(',')
//took 
console.time();


function partOne(numbers){
    numbers = numbers.map(Number)
    console.log(numbers)

    let spokenNumbers = [];
    let prevNumber = 0;
    let turn = 1;

    let part = 0
    while(turn != 30000001){
        if(numbers.length){
            prevNumber = numbers.shift();
        }else{
            let spokenNumbersWithoutPrev = spokenNumbers.slice(0, -1)
            if(!spokenNumbersWithoutPrev.includes(prevNumber))
                prevNumber = 0;
            else
                prevNumber = getDiffBetweenNumbersPartOne(spokenNumbersWithoutPrev, prevNumber, turn - 1);
            
        }
        spokenNumbers.push(prevNumber);
        turn++;
        if(turn % 500000 == 0){
            part++;
            console.log(`Part ${part} of 60`)
        }
    }
    return prevNumber;
}


function partTwo(numbers){
    numbers = numbers.map(Number)
    console.log(numbers)

    let spokenNumbers = {};
    let prevNumber = 0;
    let turn = 1;
    while(turn != 30000001){
        if(numbers.length){
            prevNumber = numbers.shift();
            spokenNumbers[`${prevNumber}_prev`] = turn;
        }else{
            if(!spokenNumbers.hasOwnProperty(`${prevNumber}_preprev`)){//!spokenNumbers.hasOwnProperty(`${prevNumber}_prev`) && - sometimes doesnt give correct answer without this
                prevNumber = 0;
                spokenNumbers[`${0}_preprev`] = spokenNumbers[`${0}_prev`];
                spokenNumbers[`${0}_prev`] = turn;
            }else{
                prevNumber = getDiffBetweenNumbers(spokenNumbers, prevNumber)
                if(!spokenNumbers.hasOwnProperty(`${prevNumber}_prev`)){
                    spokenNumbers[`${prevNumber}_prev`] = turn;
                }else{
                    spokenNumbers[`${prevNumber}_preprev`] = spokenNumbers[`${prevNumber}_prev`];
                    spokenNumbers[`${prevNumber}_prev`] = turn;
                }
            }
        }
        turn++;
        if(turn % 1000000 == 0)
            console.log(prevNumber)
    }
    return prevNumber;
}

function partTwoBetter(input){

    let numbers = input.map(Number);
    let seen = Object.fromEntries(numbers.map((n, i) => [n, i + 1]))

    let turn = numbers.length + 1;
    let nextNum = 0, prev;
    while(turn != 30000000){
        prev = seen[nextNum];
        seen[nextNum] = turn;
        if(!prev)
            nextNum = 0;
        else
            nextNum = turn - prev;
        turn++;
        if(turn % 1000000 == 0)
            console.log(nextNum)
    }
    return nextNum
}

//console.log(partOne(input));
//console.log(partTwo(input));
console.log(partTwoBetter(input));
console.timeEnd();

function getDiffBetweenNumbers(spokenNumbers, number){
    let prevNumberTurn = spokenNumbers[`${number}_preprev`]
    let prevTurn = spokenNumbers[`${number}_prev`]
    return prevTurn - prevNumberTurn;
}

function getDiffBetweenNumbersPartOne(spokenNumbers, number, turn){
    let nums = spokenNumbers.reverse();
    let firstIndex = nums.length - nums.indexOf(number)
    return turn - firstIndex;
}