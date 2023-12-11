const fs = require('fs');
let input = fs.readFileSync('./Day5/input.txt', {encoding: 'utf-8'}).split('\n')

console.time();

function getIndex(row, col) {
    let idx = row * col
    for(let i = 0; i < col - 1; i++){//left triangle
        for(let j = 0; j < col - i - 1; j++){
            idx++
        }
    }
    for(let i = 0; i < row - 2; i++){ //right triangle
        for(let j = 0; j < row - i - 2; j++){
            idx++
        }
    }
    return idx
}

function partOne(){
    let idx = getIndex(2978, 3083)
    let i = 1
    let num = 20151125
    while(i != idx) {
        num = num * 252533 % 33554393
        i++
    }
    return num
}


function partTwo(input){
    
}

console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()