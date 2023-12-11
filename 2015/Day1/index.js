const fs = require('fs');
let input = fs.readFileSync('./Day1/input.txt', {encoding: 'utf-8'}).split('')//.map(num => parseInt(num))

console.time();

function partOne(input){
    let floor = 0
    for(let ch of input)
        floor += ch == '(' ? 1 : -1

    return floor
}
function partTwo(input){
    let floor = 0
    for(let i in input){
        floor += input[i] == '(' ? 1 : -1
        if(floor == -1) return Number(i) + 1
    }
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()