const fs = require('fs');
let input = fs.readFileSync('./Day7/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function partOne(input, target){
    let bags = {}
    for(let i of input){
        let args = i.split(/\scontain\s|,\s/);
        let bag = args.shift().match(/([a-z]+ [a-z]+)/)[1];
        let content = [];
        for(let c of args){
            let m = c.match(/(?:(no) other bags.|(?:\d+ ([a-z]+ [a-z]+) bags?\.?))/)
            if(m[1] != 'no')
                content.push(m[2])
        }
        bags[bag] = content;
    }

    let bagsWhichCanHoldTargetBag = [];
    let entries = Object.entries(bags);
    
    for(let [name, content] of entries){
        if(content.includes(target)){
            bagsWhichCanHoldTargetBag.push(name)
            delete bags[name];
            entries = Object.entries(bags);
        }
    }

    delete bags[target];
    let prevLength;
    do{ 
        prevLength = entries.length;
        let newBags = getBagsContaining(bagsWhichCanHoldTargetBag, bags);
        for(let name of newBags)
            delete bags[name];
        entries = Object.entries(bags);
        bagsWhichCanHoldTargetBag.push(...newBags)
    }while(entries.length != prevLength)
    
    return bagsWhichCanHoldTargetBag.length;
}

function partTwo(input, target){

    let bags = {}
    for(let i of input){
        let args = i.split(/\scontain\s|,\s/);
        let bag = args.shift().match(/([a-z]+ [a-z]+)/)[1];
        let content = [];
        for(let c of args){
            let m = c.match(/(?:(no) other bags.|(?:(\d+) ([a-z]+ [a-z]+) bags?\.?))/)
            if(m[1] != 'no')
                content.push({name: m[3], count: Number(m[2])})
        }
        if(Object.keys(content).length)
            bags[bag] = content;
    }
    
    return getBagsIn(bags[target], bags);
}

console.log(partTwo(input, "shiny gold"));
console.timeEnd();

function getBagsContaining(bags, allBags){
    let entries = Object.entries(allBags);
    let result = [];
    for(let [name, content] of entries)
        if(content.some(b => bags.includes(b)))
            result.push(name);
    
    return result;
}


function getBagsIn(bags, allBags){
    let bagCount = 0;
    for(let bag of bags){
        if(!allBags[bag.name])
            bagCount += bag.count
        else
            bagCount += getBagsIn(allBags[bag.name], allBags) * bag.count + bag.count
    }
    
    return bagCount
}