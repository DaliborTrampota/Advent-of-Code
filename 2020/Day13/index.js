const fs = require('fs');
let input = fs.readFileSync('./Day13/input.txt', {encoding: 'utf-8'}).split('\r\n')
//took 10min - part one 10min part two (bruteforce)20min (better bruteforce) 35min
console.time();


function partOne(input){
    let timestamp = Number(input.shift())
    let buses = input.shift().split(',').filter(a => a != 'x');

    let smallestWaitTime = Infinity;
    let busID;
    for(let bus of buses){
        let waitTime = bus - timestamp % bus;
        if(waitTime < smallestWaitTime){
            smallestWaitTime = waitTime
            busID = bus
        }
    }

    return smallestWaitTime * busID
}


function partTwoBruteForce(input){
    let timestamp = Number(input.shift())//not needed 
    let buses = input.shift().split(',').map((a, i) => {
        return {ID: a, diff: i}
    }).filter(b => b.ID != 'x');

    let lowestID = buses.reduce((acc, i) => acc > i.ID ? acc = i.ID : acc, 100)
    
    let t = 0, found = false;
    while(!found){
        let counter = 0;
        for(let bus of buses){
            if((bus.ID - (t % bus.ID)) % bus.ID == bus.diff)
                counter++;
            else
                break;
        }
        if(counter == buses.length)
            found = true;
        else
            t++
    }

    return t;    
}

function partTwoBruteForceBetter(input){
    input.shift()
    let buses = input.shift().split(',').map((a, i) => {
        return {ID: a, diff: i}
    }).filter(b => b.ID != 'x');

    let pass = 0;
    let busCount = 2, t = 0, increment = Number(buses[0].ID);
    while(busCount - 1 != buses.length){
        let found = false, reducedBuses = buses.slice(0, busCount);
        while(!found){
            let counter = 0;
            for(let bus of reducedBuses){
                if((bus.ID - (t % bus.ID)) % bus.ID == bus.diff)
                    counter++;
                else
                    break;
            }
            if(counter == reducedBuses.length)
                found = true;
            else
                t += increment;
        }
        busCount++;
        increment *= reducedBuses[busCount - 2].ID;
        pass++;
    }
    return t;
}

function partTwo(input){
    input.shift()
    let busLength = input[0].split(',').length
    let buses = input.shift().split(',').map((a, i) => {
        return {ID: a, diff: i}
    }).filter(b => b.ID != 'x');

    return ChineseRemainderTheorem(buses.map(b => b.ID), buses.map(b => (b.ID - b.diff) % b.ID))//busLength - b.diff))
}

//not working. wiliam woo
function partTwoBruteForceBetter2(input){
    
    input.shift()
    let buses = input.shift().split(',').map((a, i) => {
        return {ID: a, diff: (a - i) % a}
    }).filter(b => b.ID != 'x');
console.log(buses)
    let inc = 1n;
    let diff = 0
    let t = 0n;
    for(let bus of buses){
        if(inc != 1)
            diff = bus.ID - bus.diff
        while(true){
            if(t % BigInt(bus.ID) == BigInt(diff)){
                inc *= BigInt(bus.ID);
                break;
            }
            t += inc;
        }
        console.log(t)
    }
/*
    let bus1 = buses.shift();
    let t = BigInt(parseInt(bus1.ID));
    let factor = bus1.diff + 1;
    for(let bus of buses){
        while(t % BigInt(bus.ID) != bus.diff){
            t += BigInt(factor)
        }
        factor *= bus.ID;
        console.log(factor)
    }*/
    return t;
}


//https://github.com/caderek/aoc2020/blob/main/src/day13/README.md
function partTwoGuide(input){
    input.shift();
    let buses = input.shift().split(',').map((busID, delay) => {
        if(busID == 'x')
            return null
            console.log(busID, delay)
        let remainder = delay == 0 ? 0 : busID > delay ? Number( busID - delay ) : Number( busID - (delay % busID) );
        return { busID, remainder};
    }).filter(o => o)
    console.log(buses)

    let sum = 0n
    for(let i = 0; i < buses.length; i++){
        let busesCopy = Array.from(buses);
        let secondNumber = busesCopy.splice(i, 1)[0];
        let firstNumber = busesCopy.reduce((acc, bus) => acc *= BigInt(bus.busID), 1n);
        let res = eGCD(firstNumber, BigInt(secondNumber.busID))

        res = BigInt(secondNumber.remainder) * firstNumber * res.x;
        sum += res < 0n ? -res : res;
        //console.log(res < 0n ? -res : res)
    }

    let modulo = buses.reduce((acc, bus) => acc *= BigInt(bus.busID), 1n)
    return mod(sum, modulo);
    console.log(sum);
}

function eGCD(a, b){
    let x = 1n
    let y = 0n
    let r = 0n
    let s = 1n
  
    while (b !== 0n) {
      let c = a % b
      let q = a / b
      a = b
      b = c
  
      let rPrim = r
      let sPrim = s
      r = x - q * r
      s = y - q * s
      x = rPrim
      y = sPrim
    }
  
    return { a, x, y }
}

function mod(a, b){
    const x = a % b
    return x < 0n ? x + b : x
}


//console.log(partOne(input));
//console.log(partTwo(Array.from(input)));
console.log(partTwoGuide(input));
console.timeEnd();

function ChineseRemainderTheorem(n, a)
{
    //let prod = n.Aggregate(1, (i, j) => i * j);
    let prod = n.reduce((i, j) => i * j, 1);
    let sm = 0n;

    for(let i = 0; i < n.length; i++)
    {
        let p = prod / n[i];
        //console.log(`x = ${n[i]} Mod(${a[i]})`)
        sm += BigInt(a[i]) * BigInt(modularMultiplicativeInverse(p, n[i])) * BigInt(p);
    }

    return sm % BigInt(prod);
}
function modularMultiplicativeInverse(a, mod)
{
    b = a % mod;

    for (x = 1; x < mod; x++)
    {
        if ((b * x) % mod == 1)
        {
            return x;
        }
    }

    return 1;
}

function absoluteModulo(a, b){
    ((a % b) + b) % b;
}
  // returns x where (a * x) % b == 1
  // https://rosettacode.org/wiki/Modular_inverse
  function getInverse(a, mod) {
    const b = a % mod;
    for (let i = 1; i < mod; i++) {
      if ((b * i) % mod === 1) {
        return i;
      }
    }
    return 1;
  };
function chineseRemainderTheorem(lines){
    // x =- a (mod n)
    // x - some unknown, constant value of t
    // a - bus number MINUS offset % bus number
    // n - cycle length (= bus number)
  
    // to solve each row, we also need
    // N - all n's added up
    // nU = N / n
    // i - inverse modulo
  
    const N = lines.reduce((acc, cur) => {
      if (cur === "x") {
        return acc;
      }
      return acc === null ? cur : acc * cur;
    }, null);
  
    const sum = lines.reduce((acc, cur, idx) => {
      if (cur === "x") {
        return acc;
      }
      const a = absoluteModulo(cur - idx, cur);
      const nU = N / cur;
      const inverse = getInverse(nU, cur);
      console.log(`x = ${a} (mod ${cur})`);
      return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
    }, 0n);
  
    return sum % BigInt(N);
  };
  
  function findMatchingT(buses) {
    let busesInt = buses.map((bus) => (bus === "x" ? "x" : parseInt(bus, 10)));
    return chineseRemainderTheorem(busesInt);
  };

  
//console.log(findMatchingT(input[1].split(',')))