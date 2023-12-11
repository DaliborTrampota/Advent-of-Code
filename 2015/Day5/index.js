const fs = require('fs');
let input = fs.readFileSync('./Day5/input.txt', {encoding: 'utf-8'}).split('\n')

console.time();

const vovels = ['a', 'e', 'i', 'o', 'u']
const blacklist = ['ab', 'cd', 'pq', 'xy']

const blRegex = new RegExp(`(${blacklist.join('|')})`)
const vovRegex = new RegExp(`[${vovels.join('')}]`, 'g')
const doubleRegex = new RegExp(`([a-zA-Z])\\1+`)

function partOne(input){
    let n = 0
    for(let str of input) {
        if(blRegex.test(str)) continue
        if(!doubleRegex.test(str)) continue
        if(str.match(vovRegex)?.length >= 3) n++
    }
    return n    
}

const pairRegex = new RegExp(`([a-zA-Z]{2}).*\\1+`)
const repeatRegex = new RegExp(`([a-zA-Z])[a-zA-Z]\\1`)

function partTwo(input){
    let n = 0
    for(let str of input) {
        if(!pairRegex.test(str)) continue
        if(!repeatRegex.test(str)) continue
        n++
    }
    return n   
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()