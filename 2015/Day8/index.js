const fs = require('fs');
let input = fs.readFileSync('./Day8/input.txt', {encoding: 'utf-8'}).split('\r\n')//.slice(0, 3)
// console.log(input)
console.time();


function partOne(input){
    let res = 0
    for(let str of input) {
        let n = 0
        for(let i = 1; i < str.length - 1;) {
            if(str[i] == '\\') {
                if(str.at(i + 1) == 'x') {
                    n += 1
                    i += 4
                }else if(str.at(i + 1) == '"') {
                    n += 1
                    i += 2
                }else if(str.at(i + 1) == '\\') {
                    n += 1
                    i += 2
                }
            }else {
                n++
                i++
            }
        } 
        res += str.length - n
    }
    return res
}


function partTwo(input){
    let res = 0
    for(let str of input) {
        let newStr = ''
        for(let i = 0; i < str.length; i++) {
            if(str[i] == '"') {
                newStr += '\\"'
            }else if(str[i] == '\\') {
                newStr += '\\\\'
            } else {
                newStr += str[i]
            }
        } 
        newStr = `"${newStr}"`
        res += newStr.length - str.length
    }
    return res
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()