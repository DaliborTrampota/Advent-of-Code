const fs = require('fs');

const instruction = ['OR', 'AND', 'RSHIFT', 'LSHIFT', 'NOT']
let input = fs.readFileSync('./Day7/input.txt', {encoding: 'utf-8'}).split('\r\n')
    .map(r => r.split(' '))
    .map(tok => ({ 
        target: tok.at(-1), 
        instruction: tok.find(t => instruction.includes(t)), 
        wires: tok.slice(0, -2).filter(t => !instruction.includes(t)), 
        value: Number(tok.find(v => !isNaN(v))) 
    }))

console.time();


class Wire {
    constructor(value, fn) {
        this.value = isNaN(value) ? null : value
        this.source = this.value != null
        this.fn = fn
    }
    calculate() {
        this.value = this.fn()
        return this.get()
    }
    get() {
        if(this.value != null) return this.simulate16bit()
        return this.calculate()
    }
    simulate16bit() {
        this.value = this.value % 65535
        if(this.value < 0) this.value += 65535 + 1
        return this.value
    }
    clear() {
        if(!this.source) this.value = null
    }
}


function partOne(input){
    let wires = {}
    // console.log(input)
    const getVal = (key) => {
        if(isNaN(key)) return wires[key].get()
        return Number(key)
    }
    for(let { target, instruction, wires: sources, value } of input) {
        if(!instruction && !isNaN(value)) {
            wires[target] = new Wire(value)
            continue
        }

        switch(instruction) {
            case 'AND':
                wires[target] = new Wire(null, () => getVal(sources[0]) & getVal(sources[1]))
                break
            case 'OR':
                wires[target] = new Wire(null, () => getVal(sources[0]) | getVal(sources[1]))
                break
            case 'RSHIFT':
                wires[target] = new Wire(null, () => getVal(sources[0]) >>> value)
                break
            case 'LSHIFT':
                wires[target] = new Wire(null, () => getVal(sources[0]) << value)
                break
            case 'NOT':
                wires[target] = new Wire(null, () => ~getVal(sources[0]))
                break
            default:
                wires[target] = new Wire(null, () => getVal(sources[0]))
                break
        }
    }
    return { result: wires['a'].get(), wires }
}


function partTwo(wires){
    wires['b'] = new Wire(wires['a'].get())
    for(let w in wires) {
        wires[w].clear()
    }
    return wires['a'].get()
}

const { result, wires } = partOne(input)
console.log(result)
console.log(partTwo(wires))

console.timeEnd()