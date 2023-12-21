const path = document.querySelector("svg>path");

let unit = 4;
let cr = 2; // circle rad

function six(x, y, size, theta) {
    let dx = Math.cos(theta) * size;
    let dy = Math.sin(theta) * size;
    let cx = Math.cos(theta) * cr * 2;
    let cy = Math.sin(theta) * cr * 2;

    return [`L ${x} ${y}
    a ${size} ${size} 0 1 0 ${dx*2} ${dy*2}
    a ${cr} ${cr} 0 1 1 ${-cx} ${-cy}
    a ${cr} ${cr} 0 1 1 ${cx} ${cy}
    `, [x + dx*2, y + dy*2]];
}

function d(x, y, size, theta) {
    let dx = Math.cos(theta) * size;
    let dy = Math.sin(theta) * size;
    let cx = Math.cos(theta) * cr * 2;
    let cy = Math.sin(theta) * cr * 2;

    return [`L ${x} ${y}
    a ${size} ${size} 0 1 1 ${dx*2} ${dy*2}
    a ${cr} ${cr} 0 1 1 ${-cx} ${-cy}
    a ${cr} ${cr} 0 1 1 ${cx} ${cy}
    `, [x + dx*2, y + dy*2]];
}

function line(x, y, size, theta) {
    let dx = Math.cos(theta) * size;
    let dy = Math.sin(theta) * size;

    return [`L ${x} ${y}
    l ${dx*2} ${dy*2}
    `, [x + dx*2, y + dy*2]];
}

function arc(x, y, size, theta, direction) {
    let dx = Math.cos(theta) * size;
    let dy = Math.sin(theta) * size;

    direction = !direction ? 0 : 1;

    return [`L ${x} ${y}
    a ${size} ${size} 0 1 ${direction} ${dx*2} ${dy*2}
    `, [x + dx*2, y + dy*2]];
}

const P = [six, unit, Math.PI/2];
const B = [six, unit, Math.PI/4];
const T = [six, unit, 0];
const D = [six, unit, Math.PI/4*7];
const K = [six, unit*2, 0];
const G = [six, unit*2, Math.PI/4*7];
const M = [d, unit, Math.PI/4];
const N = [d, unit, Math.PI/4*7];
const X = [d, unit*2, 0];
const R = [d, unit*2, Math.PI/4*7];
const F = [line, unit, Math.PI/2];
const V = [line, unit, Math.PI/4];
const S = [line, unit, 0];
const Z = [line, unit, Math.PI/4*7];
const CS = [line, unit*2, Math.PI/2];
const CZ = [line, unit*2, Math.PI/4];
const C = [line, unit*2, 0];
const J = [line, unit*2, Math.PI/4*7];
const NN = [line, unit, Math.PI/4*3];
const L = [arc, unit, Math.PI/4];
const LR = [arc, unit, Math.PI/4, 1];
const TS = [arc, unit, 0];
const TSR = [arc, unit, 0, 1];
const DZ = [arc, unit, Math.PI/4*7];
const DZR = [arc, unit, Math.PI/4*7, 1];
const SL = [arc, unit*2, Math.PI/2];
const SLR = [arc, unit*2, Math.PI/2, 1];
const ZL = [arc, unit*2, Math.PI/4];
const ZLR = [arc, unit*2, Math.PI/4, 1];

let angle = 0;
function draw(shape) {
    let attribute = "";

    let append;
    let pos = [150, 75];
    for (let i = 0; i < shape.length; i++) {
        [append, pos] = shape[i][0](pos[0], pos[1], shape[i][1], shape[i][2], shape[i][3]);
        attribute += append;
    }

    attribute = "M" + attribute.substring(1);

    path.setAttribute("d", attribute);
    angle += 0.01;
}

draw([M, NN, SL, NN, G, S]);
