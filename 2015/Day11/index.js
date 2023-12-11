const fs = require('fs');
let input = 'vzbxkghb'

console.time();

const z = 'z'.charCodeAt(0)
const a = 'a'.charCodeAt(0)


function validate(pass) {
    return new RegExp('([a-z])\\1+.*([^\\1])\\2+').test(pass) && !/[iol]/.test(pass) && pass.split('').some((ch, i, arr) => {
        let start = ch.charCodeAt(0)
        return arr.at(i+1)?.charCodeAt(0) == start + 1 && arr.at(i+2)?.charCodeAt(0) == start + 2
    })
}

function incrementChar(ch) {
    ch = ch.charCodeAt(0)
    ch++
    if(ch > z) ch = a
    return String.fromCharCode(ch)    
}

function partOne(password){
    do {
        let newChars = [] 
        let chars = password.split('').reverse()
        // console.log(chars)
        let wrap = false
        do {
            newChars.push(incrementChar(chars.shift()))
            if(newChars.at(-1) == 'a') wrap = true
            else wrap = false
        } while(wrap)
        password = newChars.concat(chars).reverse().join('')
        //console.log(password)
    } while(!validate(password))
    return password
}



console.log(partOne(input))
console.log(partOne(partOne(input)))

console.timeEnd()