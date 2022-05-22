const fs = require('fs');
let input = fs.readFileSync('./Day12/input.txt', {encoding: 'utf-8'}).split('\r\n')
//took 1h 30min, part one 30min, part two 1h
console.time();
class Ship{
    constructor(dir){
        this.dir = dir;
        this.ns = 0;//north+ south-
        this.ew = 0;//east+ west-
        this.rotate = ['N', 'E', 'S', 'W']
    }

    forward(val, waypoint){
        if(waypoint){
            switch(this.dir){
                case 'N':
                    this.ns += waypoint.ns * val;
                    this.ew += waypoint.ew * val;
                    break;
    
                case 'S':
                    this.ns -= waypoint.ns * val;
                    this.ew -= waypoint.ew * val;
                    break;
    
                case 'E':
                    this.ew += waypoint.ew * val;
                    this.ns += waypoint.ns * val;
                    break;
    
                case 'W':
                    this.ew -= waypoint.ew * val;
                    this.ns -= waypoint.ns * val;
                    break;
            }
        }else{
            switch(this.dir){
                case 'N':
                    this.ns += val;
                    break;
    
                case 'S':
                    this.ns -= val;
                    break;
    
                case 'E':
                    this.ew += val;
                    break;
    
                case 'W':
                    this.ew -= val;
                    break;
            }
        }
        
    }

    rotateRight(deg){
        let index;
        switch(deg){
            case 90:
                index = this.rotate.indexOf(this.dir) + 1;
                if(index >= this.rotate.length)
                    index = index - this.rotate.length;
                this.dir = this.rotate[index];
                break;

            case 180:
                index = this.rotate.indexOf(this.dir) + 2;
                if(index >= this.rotate.length)
                    index = index - this.rotate.length;
                this.dir = this.rotate[index];
                break;

            case 270:
                index = this.rotate.indexOf(this.dir) + 3;
                if(index >= this.rotate.length)
                    index = index - this.rotate.length;
                this.dir = this.rotate[index];
                break;
        }
    }

    north(val){
        this.ns += val;
    }

    south(val){
        this.ns -= val;
    }

    east(val){
        this.ew += val;
    }

    west(val){
        this.ew -= val;
    }

    getPos(){
        return {north: this.ns, east: this.ew, dir: this.dir}
    }
}

class Waypoint{
    constructor(ship, ns, ew){
        this.ship = ship;
        this.ns = ns;//north+ south-
        this.ew = ew;//east+ west-
        //this.rotate = [{ dir: 'N', x: 1, y: 1, swap: false}, { dir: 'E', x: -1, y: 1, swap: true}, { dir: 'S', x: -1, y: -1, swap: false}, { dir: 'W', x: 1, y: -1, swap: true}]
    }

    rotateRight(deg){

        let rotations = deg / 90;
        for(let i = 0; i < rotations; i++){//vector 90deg rotation
            let temp = this.ns;
            this.ns = -this.ew;//if minus here then clockwise
            this.ew = temp;//if here then anticlockwise
        }
    }

    /*translateRotation(operation){
        if(operation.swap){
            let temp = this.ns;
            this.ns = this.ew * operation.x;
            this.ew = temp * operation.y;      //ns = y, ew = x
        }else{
            this.ns = this.ns * operation.y;
            this.ew = this.ew * operation.x;
        }
    }*/

    north(val){
        this.ns += val;
    }

    south(val){
        this.ns -= val;
    }

    east(val){
        this.ew += val;
    }

    west(val){
        this.ew -= val;
    }

    getPos(){
        return {north: this.ns, east: this.ew}
    }
}

function partOne(input){
    let moves = [];

    for(let move of input){
        move = move.split('')
        let instruction = move.shift()
        let value = Number(move.join(''));
        moves.push({instruction, value})
    }

    let ship = new Ship('E');

    for(let move of moves){
        switch(move.instruction){
            case 'N':
                ship.north(move.value);
                break;

            case 'S':
                ship.south(move.value);
                break;

            case 'E':
                ship.east(move.value);
                break;

            case 'W':
                ship.west(move.value);
                break;

            case 'F':
                ship.forward(move.value);
                break;

            case 'R':
                ship.rotateRight(move.value);
                break;

            case 'L':
                ship.rotateRight(360 - move.value);
                break;
        }
    }
    let finalPos = ship.getPos()
    console.log(finalPos)
    return Math.abs(finalPos.north) + Math.abs(finalPos.east)
}


function partTwo(input){
    let moves = [];

    for(let move of input){
        move = move.split('')
        let instruction = move.shift()
        let value = Number(move.join(''));
        moves.push({instruction, value})
    }

    let ship = new Ship('E');
    let waypoint = new Waypoint(ship, 1, 10);

    for(let move of moves){
        switch(move.instruction){
            case 'N':
                waypoint.north(move.value);
                break;

            case 'S':
                waypoint.south(move.value);
                break;

            case 'E':
                waypoint.east(move.value);
                break;

            case 'W':
                waypoint.west(move.value);
                break;

            case 'F':
                ship.forward(move.value, waypoint);
                break;

            case 'R':
                waypoint.rotateRight(move.value);
                break;

            case 'L':
                waypoint.rotateRight(360 - move.value);
                break;
        }
    }
    let finalPos = ship.getPos()
    return Math.abs(finalPos.north) + Math.abs(finalPos.east)
}


//console.log(partOne(input));
console.log(partTwo(input));
console.timeEnd();

