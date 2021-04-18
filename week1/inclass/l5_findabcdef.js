function findAbcdef(str) {
    const pattern = 'abcdef';
    for (let i = 0 ; i != str.length - pattern.length + 1 ; ++ i) {
        if (startWith(str.substr(i), pattern)) {
            return true;
        }
    }
    return false;
}

function startWith(str, pattern) {
    if (pattern === '') {
        return true;
    }
    if (str === '') {
        return false;
    }
    if (str.charAt(0) === pattern.charAt(0)) {
        return startWith(str.substr(1), pattern.substr(1));
    }
    return false;
}

console.log(findAbcdef('dfsabcde0fsdabcdef'));