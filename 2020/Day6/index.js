const fs = require('fs');
let input = fs.readFileSync('./Day6/input.txt', {encoding: 'utf-8'}).split('\r\n\r\n')//separate by group

console.time();


function partOne(input){
    uniqueAnswers = 0;
    for(let group of input){
        let p = Array.from(new Set(group.split('\r\n').join('').split('')));
        uniqueAnswers += p.length;
    }
    return uniqueAnswers;
}

function partTwo(input){

    let everyoneAnswered = 0;
    for(let group of input){
        let g = group.split('\r\n').map(a => a.split(''))
        g.sort((a, b) => b.length - a.length);
        
        //g.shift = person with least amount of answers
        //.filter(..) person-with-least-amount-of-answers' answers
        //every(person => includes(answer)) if every person in that group has that answer
        let res = g.shift().filter(answer => g.every(person => person.includes(answer)));
        console.log(res)

        everyoneAnswered += res.length;
    }
    
    return everyoneAnswered;
}

console.log(partTwo(input));
console.timeEnd();


