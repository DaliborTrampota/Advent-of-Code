const fs = require('fs');
const crypto = require('crypto')

let input = 'bgvyzdsv'//fs.readFileSync('./Day3/input.txt', {encoding: 'utf-8'}).split('')

console.time();


function solve(input, leading0Count){
    let i = 0
    let hash = ''
    let prefix = ''.padStart(leading0Count, '0')
    while(!hash.startsWith(prefix)) {
        hash = crypto.createHash('md5').update(input + i).digest('hex')
        //console.log(hash)
        i++
    }
    return i - 1
}
console.log(solve(input, 5))
console.log(solve(input, 6))
console.timeEnd()