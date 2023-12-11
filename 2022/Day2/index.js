const fs = require('fs');
const path = require('path')
let input = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

console.time();

const map = {
    'A': 1, //rock X
    'B': 2, //paper Y
    'C': 3, //scissors Z
    'X': 1,
    'Y': 2,
    'Z': 3,
    [1]: 6,
    [0]: 3,
    [-1]: 0
}

function partOne(input){
    const guide = input.split('\r\n').map(r => r.split(' '))
    let outcomes = guide.map(([p1, p2]) => {
        if(map[p1] == map[p2]) return map[p2] + map[0]
        if(p1 == 'A' && p2 == 'Z') return map[p2] + map[-1]
        if(p1 == 'B' && p2 == 'X') return map[p2] + map[-1]
        if(p1 == 'C' && p2 == 'Y') return map[p2] + map[-1]
        return map[p2] + map[1]
    })
    console.log(outcomes)
    return outcomes.reduce((acc, v) => acc + v)
}
function partTwo(input){
    const guide = input.split('\r\n').map(r => r.split(' '))
    let outcomes = guide.map(([p1, p2]) => {
        if(p2 == 'Y') return map[p1] + map[0] //draw
        if(p2 == 'X') { //lose
            p2 = p1 == 'A' ? 'Z' : p1 == 'B' ? 'X' : 'Y'
            return map[p2] + map[-1] 
        }
        //win
        p2 = p1 == 'A' ? 'Y' : p1 == 'B' ? 'Z' : 'X'
        return map[p2] + map[1] 
    })
    console.log(outcomes)
    return outcomes.reduce((acc, v) => acc + v)
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()