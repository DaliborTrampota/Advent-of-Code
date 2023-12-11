const fs = require('fs');
const path = require('path');

let rawInput = fs.readFileSync(path.join(path.dirname(__filename), `input.txt`), {encoding: 'utf-8'})

//took part one 30min 
console.time('Part one');
//console.log(partOne(parseInput(rawInput, false)));
console.timeEnd('Part one');

console.log('\n\n');

console.time('Part two');
console.log(partTwo(parseInput(rawInput, true)));
console.timeEnd('Part two');

function parseInput(rawInput, isPartTwo){
    let tiles = {}
    rawInput.split('\r\n\r\n').map(tile => {
        tile = tile.split('\r\n');
        let id = tile.shift().match(/Tile (\d{4}):/)[1];

        let top = tile[0];
        let bottom = reverseSide(tile[tile.length - 1]);
        let right = tile.reduce((side, line) => side += line.charAt(line.length - 1), '');
        let left = reverseSide(tile.reduce((side, line) => side += line.charAt(0), ''));
        let center = tile.slice(1, -1).map(line => line.slice(1, line.length - 2));

        let Rtop = reverseSide(top);
        let Rleft = reverseSide(left);
        let Rright = reverseSide(right);
        let Rbottom = reverseSide(bottom);

        tiles[id] = { top, right, bottom, left, Rtop, Rright, Rbottom, Rleft, center, neighbours: { top: null, right: null, bottom: null, left: null } };
    });


    return tiles;
}

function partOne(tiles){
    //let tileCopy = Object.assign(tiles);
    let tileEntries = Object.entries(tiles);
    for(let [ID, tile] of tileEntries){
        for(let side in tile){
            if(['center', 'neighbours', 'Rtop', 'Rleft', 'Rbottom', 'Rright'].includes(side)) continue;
            for(let [otherID, otherTile] of tileEntries){
                if(tile == otherTile) continue;
                for(let otherSide in otherTile){
                    if(['center', 'neighbours'].includes(otherSide)) continue;

                    if(tile[side] == otherTile[otherSide] && !tile.neighbours.hasOwnProperty(otherSide.charAt(0) == 'R' ? otherSide.slice(0) : 'R' + otherSide)){
                        tiles[ID].neighbours[side] = { otherID, otherSide };
                    }
                }                
            }
        }
    }
    let corners = getCornerIDs(tileEntries)
    return corners.reduce((acc, id) => acc * BigInt(id), 1n)
}


function partTwo(tiles){

    let tileEntries = Object.entries(tiles);
    for(let [ID, tile] of tileEntries){
        for(let side in tile){
            if(['center', 'neighbours', 'Rtop', 'Rleft', 'Rbottom', 'Rright'].includes(side)) continue;
            for(let [otherID, otherTile] of tileEntries){
                if(tile == otherTile) continue;
                for(let otherSide in otherTile){
                    if(['center', 'neighbours'].includes(otherSide)) continue;

                    if(tile[side] == otherTile[otherSide] && !tile.neighbours.hasOwnProperty(otherSide.charAt(0) == 'R' ? otherSide.slice(0) : 'R' + otherSide)){
                        tiles[ID].neighbours[side] = { otherID, otherSide };
                    }
                }                
            }
        }
    }
    
    const a = Math.sqrt(Object.keys(tiles).length)
    const arr = Array.from({ length: a }, () => Array.from({ length: a }, () => false))
    const entries = Object.entries(tiles)
    let corners = getCornerIDs(tileEntries)
    for(let id of corners) {
        const t = tiles[id]
        let x, y
        if(!t.neighbours.top) y = 0
        else y = a - 1

        if(!t.neighbours.right) x = a - 1
        else x = 0
        console.log(x, y, t.neighbours)
        arr[y][x] = id
    }
    //console.log(arr)
    while(entries.length) {

    }
    for(let id in tiles) {
        console.log(id, tiles[id].neighbours)
    }
    for(let i = 0; i < 4; i++) {

    }
    return
    let sea = Array.from({ length: a }, () => Array.from({ length: a }, () => 'null'))

    let leftUpperCorner = getCornerIDs(tileEntries).filter(id => tiles[id].neighbours.top == null && tiles[id].neighbours.left == null)[0]
    
    let c = tiles[leftUpperCorner];
    let x = c.neighbours.top ? a : 0;
    let y = c.neighbours.left ? a : 0;
    sea[x][y] = c;
    
    console.log(tileEntries.map(t => {let i = t[1].neighbours; i.id = t[0]; return i}).filter(t => Object.values(t).some(obj => obj ? obj.otherID == '3947' : false)))
    for(let i in sea){
        for(let j in sea){
            if(i == 0 && j == 0)
                continue;

            let nextTile = sea[i][j - 1].neighbours.right;
            if(nextTile.otherSide.charAt(0) == 'R')
                break
        }
    }


/*
    for(let tile of tileEntries){
        let id = tile.shift();
        let body = tile.shift();

        for(let side in body.neighbours){
            let match = body.neighbours[side];
            if(match && (side == 'R' + match.otherSide || 'R' + side == match.otherSide))
                body = flipHorizontal(body);
        }
        tiles[id] = body
    }*/
    //console.log(tiles['1171'])
    //console.log(Object.entries(tiles).map(tile => [tile.shift(), Object.values(tile[0].neighbours).map(o => `id: ${o ? o.otherID : null}, side: ${o ? o.otherSide : null}`)]), tiles['1171'].neighbours)
    //console.log(tileEntries)
    return false;
}


function rotate(arr) {
    const newArr = []
    for(let i = 0; i < arr[0].length; i++) {
        let newRow = ''
        for(let r of arr) {
            newRow += r[arr[0].length - i - 1]
        }
        newArr.push(newRow)
    }
    return newArr
}


function reverseSide(side){
    return side.split('').reverse().join('');
}


function rotate90(tile){

    let temp = tile.top;
    tile.top = reverseSide(tile.left);
    tile.left = tile.bottom;
    tile.bottom = reverseSide(tile.right);
    tile.right = temp;

    return tile;
}

function rotate180(tile){

    let temp = tile.top;
    tile.top = reverseSide(tile.bottom);
    tile.bottom = reverseSide(temp);

    temp = tile.right;
    tile.right = reverseSide(tile.left);
    tile.left = reverseSide(temp);

    return tile;
}

function flipVertical(tile){

    let temp = tile.top;
    tile.top = tile.bottom;
    tile.bottom = temp;

    tile.right = reverseSide(tile.right);
    tile.left = reverseSide(tile.left);

    return tile;
}

function flipHorizontal(tile){

    let temp = tile.right;
    tile.right = tile.left;
    tile.left = temp;

    tile.top = reverseSide(tile.top);
    tile.bottom = reverseSide(tile.bottom);

    temp = tile.neighbours.right
    tile.neighbours.right = tile.neighbours.left;
    tile.neighbours.left = temp;

    return tile;
}

function flipDiagonal(tile){
    
}

function alignTop(tile){

}

function drawTiles(tiles){

}

function getCornerIDs(tileEntries){
    let neighbours = tileEntries.map(tile => [tile[0], Object.values(tile[1].neighbours).filter(side => side).length])
    
    return neighbours.filter(n => n[1] == 2).map(n => n[0])
}