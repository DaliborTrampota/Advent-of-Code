const fs = require('fs');
let input = fs.readFileSync('./Day2/input.txt', {encoding: 'utf-8'}).split('\n').map(num => num.split('x').map(Number))

console.time();

function calcReqArea(sides) {
    sides.sort((a, b) => a-b)
    return 2*sides[0]*sides[1] + 2*sides[0]*sides[2] + 2*sides[1]*sides[2] + sides[0]*sides[1]
}

function calcRibbonLen(sides) {
    sides.sort((a, b) => a-b)
    return 2*sides[0] + 2*sides[1] + sides.reduce((acc, t) => acc*=t, 1)
}

function partOne(input){
    let area = 0
    for(let sides of input){
        area += calcReqArea(sides)
    }

    return area
}
function partTwo(input){
    let len = 0
    for(let sides of input){
        len += calcRibbonLen(sides)
    }

    return len
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()