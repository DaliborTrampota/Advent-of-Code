const fs = require('fs');
let input = fs.readFileSync('./Day4/input.txt', {encoding: 'utf-8'})//.split('\r\n').map(l => l.split(''))


input = input.split("\r\n").map(l => {
    let [card, nums] = l.split(/:\s+/)
    let [winning, mine] = nums.split(/\s+\|\s+/)

    return {
        id: Number(card.match(/(\d+)/)[1]),
        winning: winning.split(/\s+/).map(Number),
        mine: mine.split(/\s+/).map(Number)
    }
})

function partOne(input) {
    let points = 0
    for(let card of input) {
        let matches = card.mine.filter(n => card.winning.includes(n))
        //console.log(matches, Math.pow(2, matches.length - 1))
        if(matches.length)
            points += Math.pow(2, matches.length - 1)
    }
    return points;
}

function partTwo(input) {
    let cards = {}
    for(let card of input) {
        let matches = card.mine.filter(n => card.winning.includes(n))
        let copies = cards[card.id] ?? 0
        if(!cards[card.id]) cards[card.id] = 0
        cards[card.id]++
        console.log("Have", copies + 1, card.id)
        for(let c = 0; c < copies + 1; c++) {
            for(let i in matches) {
                let newID = card.id + (Number(i) + 1)
                if(!cards[newID]) cards[newID] = 0
                cards[newID]++
                //console.log(card.id, c, "Got", newID)
            }
        }
    }
    return Object.values(cards).reduce((acc, t) => acc += t, 0)
}

console.log(partOne(input))
console.log(partTwo(input))