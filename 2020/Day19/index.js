const { reverse } = require('dns');
const fs = require('fs');
const path = require('path');

let rawInput = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

//took part one 30min 
console.time('Part one');
console.log(partOne(...parseInput(rawInput, false)));
console.timeEnd('Part one');

console.log('\n\n');

console.time('Part two');
console.log(partTwo(parseInput(rawInput, true)));
console.timeEnd('Part two');

function parseInput(rawInput, isPartTwo){
    let input = rawInput.split('\r\n\r\n');

    let rules = {};
    input[0].split('\r\n').map(rule => {
        let res = rule.match(/(\d): (?:"(\w)"|((?:\d+ ?){1,4})(?:\| )?((?:\d+ ?){1,4})?)/).splice(this.length - 2).filter(o => o)
        rules[res[1]] = res.slice(2).map(g => g.split(/ +/).filter(o => o))
    });
    /*input[0].split('\r\n').map(rule => {
        let res = rule.split(': ')
        rules[res[0]] = res[1].split(' | ').map(r => r.split(' ')) 
    })
    let rules2 = {};*/
    let messages = input[1].split('\r\n').map(reverse);
    
    return [rules, messages];
}

function partOne(rules, messages){
    //console.log(rules, messages)

    

    console.log(combinations)

}


function partTwo(equations){
}

function getCombinations(ruleIdx, rulesTable){
    let rules = rulesTable[ruleIdx];
    let combinations = [];
    for(let rule of rules){
        console.log(rules, rule)
        let str = '';
        for(let r of rule){
            if(rulesTable.hasOwnProperty(r))
                str += getCombinations(r, rulesTable);
            else
                return r;
        }
        combinations.push(str);
    }

    return combinations;
}