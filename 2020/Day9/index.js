const fs = require('fs');
let input = fs.readFileSync('./Day9/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function partOne(input, preamble){
    let nums = input.map(n => Number(n));
    let idx = preamble;

    next:
    for(let k of input){
        for(let i = idx - preamble; i < idx; i++){
            for(let j = idx - preamble; j < idx; j++){
                if(i != j && nums[i] + nums[j] == nums[idx]){
                    idx++;
                    continue next;
                }
            }
        }
    }
    /*
    next:
    for(let k of input){
        let stack = nums.slice(idx - preamble, idx);
        for(let i of stack){
            for(let j of stack){
                if(i + j == nums[idx]){
                    idx++;
                    continue next;
                }
            }
        }
    }*/

    return { num: nums[idx], index: idx };
}

function partTwo(input, preamble){
    let invalidNumber = partOne(input, preamble);
    let nums = input.slice(0, invalidNumber.index).map(n => Number(n));

    let leftIdx = 0, rightIdx = 1;
    let sum = nums[leftIdx] + nums[rightIdx];
    while(sum != invalidNumber.num){
        
        if(sum < invalidNumber.num){
            rightIdx++;
            sum += nums[rightIdx];
        }else if(sum > invalidNumber.num){
            sum -= nums[leftIdx]
            leftIdx++;
        }
    }
    return nums[leftIdx] + nums[rightIdx - 1];
}

console.log(partTwo(input, 25));
console.timeEnd();
