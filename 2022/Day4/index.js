const fs = require('fs');
const path = require('path')
let input = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

console.time();

function partOne(input){
    const rucksacks = input.split('\r\n').map(r => [r.slice(0, r.length/2), r.slice(r.length/2)].map(c => c.split('')))
    
}
function partTwo(input){
    const groups = input.split('\r\n').map(c => c.split('')).reduce((acc, v, i) => (i % 3 ? acc.at(-1).push(v) : acc.push([v])) && acc, [])

}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()