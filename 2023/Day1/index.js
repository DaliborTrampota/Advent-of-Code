const fs = require('fs');
let input = fs.readFileSync('./Day1/input.txt', {encoding: 'utf-8'}).split('\r\n')//.slice(0, 3)
// console.log(input)
console.time();
//this was facking pain 1+hours due to overlap shit
function partOne(input){
    let sum = 0

    for(let line of input) {
        let nums = line.match(/\d/g)
        let num = nums.at(0) + nums.at(-1)
        sum += Number(num)
    }
    return sum
}


function partTwo(input){
    let sum = 0
    const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const getNum = (num) => {
        if(isNaN(num)) return String(digits.indexOf(num) + 1)
        return num 
    }
    for(let line of input) {

        let nums = []
        for(let i = 0; i < line.length; i++) {
            if(isNaN(line[i])) {
                for(let d of digits) {
                    if(line.slice(i).startsWith(d)) {
                        nums.push(getNum(d))
                    }
                }
            } else {
                nums.push(line[i])
            }
        }
        
        // let first = line.match(new RegExp(`(\\d|${digits.join('|')})`))[1]
        // let last = line.split('').reverse().join('').match(new RegExp(`(\\d|${digits.map(d => d.split('').reverse().join('')).join('|')})`))[1].split('').reverse().join('')
        // let num = `${getNum(first)}${getNum(last)}`
        let num = nums.at(0) + nums.at(-1)
        sum += Number(num)
    }
    return sum
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()