function findAbababx(str) {
    let state = found0;
    for (let c of str) {
        state = state(c);
    }
    if (state === found7) {
        return true;
    } else {
        return false;
    }
}

function found0(c) {
    if (c === 'a') {
        return found1;
    }
    return found0;
}

function found1(c) {
    if (c === 'b') {
        return found2;
    }
    return found0(c);
}

function found2(c) {
    if (c === 'a') {
        return found3;
    }
    return found0;
}

function found3(c) {
    if (c === 'b') {
        return found4;
    }
    return found0(c);
}

function found4(c) {
    if (c === 'a') {
        return found5;
    }
    return found0;
}

function found5(c) {
    if (c === 'b') {
        return found6;
    }
    return found0(c);
}

function found6(c) {
    if (c === 'x') {
        return found7;
    }
    return found4(c);
}

function found7(c) {
    return found7;
}

console.log(findAbababx('aabaabababababababababx'));