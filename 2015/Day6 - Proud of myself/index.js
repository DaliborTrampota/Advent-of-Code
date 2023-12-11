const fs = require('fs');
let input = fs.readFileSync('./Day6/input.txt', {encoding: 'utf-8'}).split('\n').map(r => ({
    nums: r.match(/\d+/g).map(Number),
    state: r.startsWith('toggle') ? 'toggle' : r.match(/turn (on|off)/)[1]
}))

console.time();


const idx = (x, y) => x + 1000 * y

const doRange = (map, x, y, x2, y2, fn) => {
    for(let i = x; i <= x2; i++) {
        for(let j = y; j <= y2; j++) {
            map[idx(i, j)] = fn(map[idx(i, j)])
        }
    }
}

function partOne(input){
    const lights = new Array(1000*1000).fill(0)

    for(let { nums, state } of input) {
        switch(state) {
            case 'toggle':
                doRange(lights, ...nums, (curState) => !curState)
                break
            case 'on':
                doRange(lights, ...nums, (curState) => 1)
                break
            case 'off':
                doRange(lights, ...nums, (curState) => 0)
                break
        }
    } 
    
    return lights.reduce((acc, v) => acc += v, 0)
}


function partTwo(input){
    const lights = new Array(1000*1000).fill(0)

    for(let { nums, state } of input) {
        switch(state) {
            case 'toggle':
                doRange(lights, ...nums, (curState) => curState+2)
                break
            case 'on':
                doRange(lights, ...nums, (curState) => curState+1)
                break
            case 'off':
                doRange(lights, ...nums, (curState) => Math.max(0, curState-1))
                break
        }
    } 
    
    return lights.reduce((acc, v) => acc += v, 0)
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()