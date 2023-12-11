const fs = require('fs');
const path = require('path')
let input = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

console.time();

function partOne(input){
    const elves = input.split('\r\n\r\n').map(r => r.split('\r\n').map(Number).reduce((acc, v) => acc + v))
    return elves.sort((a, b) => b - a).at(0)
}
function partTwo(input){
    const elves = input.split('\r\n\r\n').map(r => r.split('\r\n').map(Number).reduce((acc, v) => acc + v))
    return elves.sort((a, b) => b - a).slice(0, 3).reduce((acc, v) => acc + v)
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()