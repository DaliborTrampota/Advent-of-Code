const fs = require('fs');
let input = fs.readFileSync('./Day10/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function partOne(input, outlet = 0){
    
    let adapters = input.map(a => Number(a))
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);
    
    let joltInput = outlet;
    let oneDiff = threeDiff = 0;
    for(let adapter of adapters){
        let diff = adapter - joltInput
        if(diff == 1)
            oneDiff++;
        else if(diff == 3)
            threeDiff++;
        else
            return false //not all adapters were used

        joltInput = adapter
    }

    return oneDiff * threeDiff
}

function partTwo(input){

    const tribonacchi = [1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504];
    
    let adapters = input.map(a => Number(a))
    adapters.sort((a, b) => a - b).reverse();
    adapters.unshift(adapters[0] + 3);

    //Find the joltage differences between all adapthers
    let adapterDeltas = [];
    for(let i = 0; i < adapters.length; i++)
        if(i + 1 >= adapters.length)
            adapterDeltas[i] = adapters[i]
        else
            adapterDeltas[i] = adapters[i] - adapters[i + 1];
    
    //group all the differences with ones
    let groupingOfOnes = [];
    let interupted = false
    for(let i of adapterDeltas){
        if(!interupted && i == 1)
            groupingOfOnes[groupingOfOnes.length - 1]++
        else if(i == 1){
            groupingOfOnes.push(1);
            interupted = false
        }
        if(i != 1){
            interupted = true;
        }

    }
    //find the corresponding tribonacchi number based on group size and multiply them together
    const combinations = groupingOfOnes.map(group => tribonacchi[group - 1]).reduce((acc, num) => acc * num, 1)


    //brute force works for smaller data sets
    /*for(let i = 0; i < combinations.length; i++){
        count += combinations[i]
        if(i + 1 < combinations.length)
            count += combinations[i + 1] 
        if(i + 2 < combinations.length)
            count += combinations[i + 2]
    }*/

    /*function recursive(adapters, joltInput, highestAdapter){
        adapters = adapters.slice(adapters.indexOf(joltInput) + 1)
    
        let nextAdapters = [adapters[0]];
        if(adapters.length > 1)
            nextAdapters.push(adapters[1])
        if(adapters.length > 2)
            nextAdapters.push(adapters[2]);
    
        nextAdapters = nextAdapters.filter(adpt => adpt - joltInput <= 3);
            
        if(nextAdapters[0] == highestAdapter)
            combinations++;
    
        for(let a of nextAdapters)
            recursive(adapters, a, highestAdapter)
    }
    recursive(adapters, joltInput, adapters[adapters.length - 1])*/

    return combinations;
}

//console.log(partOne(input));
console.log(partTwo(input));
console.timeEnd();


/*
function checkValidity(adapters, joltInput){
    adapters = adapters.slice(adapters.indexOf(joltInput) + 1)
    for(let adapter of adapters){
        let diff = adapter - joltInput
        if(diff > 3)
            return false //not all adapters were used

        joltInput = adapter
    }
    return true
}

function factorial(n){
    var i= n;
    while(--i) n*= i;
    return n;
}

function combos(n, r, repeats){
    if(n< r) return 0;
    if(n=== r) return 1;
    if(repeats){
        return factorial(n+r-1)/((factorial(r)*factorial(n-1)));
    }
    return factorial(n)/((factorial(r)*factorial(n-r)));
}*/