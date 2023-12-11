const fs = require('fs');
let input = fs.readFileSync('./Day5/input.txt', {encoding: 'utf-8'})

let [seeds, ...maps] = input.split("\r\n")
seeds = seeds.match(/\d+/g).map(Number)
//seeds = [0, 1, 49, 50, 51, 96, 97, 98, 99]
maps = maps.map(m => {
    let [name, ...values] = m.split("\n")
    return {
        input: name.split("-").at(0),
        output: name.split("-").at(-1).slice(0, -5),
        map: values.map(l => {
            let [d, s, len] = l.match(/\d+/g).map(Number)
            return { d, s, len }
        })
    }
}).reduce((acc, map) => {acc[map.input] = map; return acc}, {})

function partOne(seeds, maps) {
    let curInput = "seed"
    while(curInput != "location") {
        console.log("Starting", curInput, "for", seeds.length)
        let newSeeds = []
        for(let s of seeds) {
            let newValue = s;
            let range = maps[curInput].map.find(m => m.s <= s && m.s + m.len >= s)
            if(range) {
                newValue = range.d + (s - range.s)
            }
            //console.log(s, newValue)
            newSeeds.push(newValue)
        }
        seeds = newSeeds
        curInput = maps[curInput].output
    }
    //console.log(seeds)
    let min = Infinity
    for(let s of seeds) {
        if(s < min) {
            min = s;
        }
    }
    return min//Math.min(...seeds)
}

function partTwo(seedRanges, maps) {
    let min = Infinity
    for(let i = 0; i < seedRanges.length; i += 2) {
        let seeds = []
        console.log("Range", seedRanges[i + 1].toLocaleString(), seeds)
        let len = seedRanges[i + 1]
        let start = seedRanges[i]
        for(let c = 0; c < len; c++) {
            seeds.push(start + c)
        }
        console.log("Seeds mapped", seeds.length)
        let res = partOne(seeds, maps)
        if(res < min) min = res;
        console.log("Cur min", min)
    }
    return min;
}

console.log(partOne(seeds, maps))
console.log(partTwo(seeds, maps))