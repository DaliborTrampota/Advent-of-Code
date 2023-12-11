const fs = require('fs');
const path = require('path')
let input = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

console.time();

function partOne(input){
    const rucksacks = input.split('\r\n').map(r => [r.slice(0, r.length/2), r.slice(r.length/2)].map(c => c.split('')))
    let prioritySum = 0
    for(let r of rucksacks) {
        const common = new Set(r[0].filter(i => r[1].includes(i)))
        for(let letter of common) {
            if(letter == letter.toUpperCase()) prioritySum += letter.charCodeAt(0)-'A'.charCodeAt(0) + 27
            else prioritySum += letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        }
    }

    return prioritySum
}
function partTwo(input){
    const groups = input.split('\r\n').map(c => c.split('')).reduce((acc, v, i) => (i % 3 ? acc.at(-1).push(v) : acc.push([v])) && acc, [])

    let prioritySum = 0
    for(let g of groups) {
        const common = new Set(g[0].filter(i => g[1].includes(i) && g[2].includes(i)))
        for(let letter of common) {
            if(letter == letter.toUpperCase()) prioritySum += letter.charCodeAt(0)-'A'.charCodeAt(0) + 27
            else prioritySum += letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        }
    }
    

    return prioritySum
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()