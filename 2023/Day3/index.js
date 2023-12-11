const fs = require('fs');
let input = fs.readFileSync('./Day3/input.txt', {encoding: 'utf-8'}).split('\r\n').map(l => l.split(''))
    
console.time();

const specialChar = /[^a-zA-Z0-9.]/

function findSymbol(x, y, symbol = specialChar) {
    for(let i = y - 1; i <= y + 1; i++) {
        for(let j = x - 1; j <= x + 1; j++) {
            if(symbol.test(input?.at(i)?.at(j))) 
                return true
        }
    }
    return false
}

function partOne(input){
    let sum = 0

    for(let y = 0; y < input.length; y++) {
        let num = ''
        let coords = []

        const parse = () => {
            for(let coord of coords) {
                if(findSymbol(coord.x, coord.y)) {
                    sum += Number(num)
                    break
                }
            } 
            num = ''
            coords = []
        }

        for(let x = 0; x < input.at(0).length; x++) {
            let char = input.at(y).at(x)
            if(/\d/.test(char)){
                coords.push({ x, y })
                num += char
            } else {
                parse()
            }
        }
        parse()
    }
    return sum
    // let i = 0
    // for(let line of input) {
    //     let j = 0
    //     for(let char of line) {
    //         if(specialChar.test(char)) {
    //             let coords = findNum(j, i)
    //             if(!coords.length) continue

    //             for(let coord of coords) {
    //                 const line = input.at(coord.y).join('')

    //             }
                
    //             // let line = input[numIdx.y].join('')
    //             console.log(line, coords)
    //         }
    //         j++
    //     }
    //     i++
    // }
}


function partTwo(input){
    let sum = 0

    for(let y = 0; y < input.length; y++) {
        let num = ''
        let coords = []

        const parse = () => {
            for(let coord of coords) {
                if(findSymbol(coord.x, coord.y, /\*/)) {
                    sum += Number(num)
                    break
                }
            } 
            num = ''
            coords = []
        }

        for(let x = 0; x < input.at(0).length; x++) {
            let char = input.at(y).at(x)
            if(/\d/.test(char)){
                coords.push({ x, y })
                num += char
            } else {
                parse()
            }
        }
        parse()
    }
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()