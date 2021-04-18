function findA(str) {
    for (let i = 0 ; i != str.length ; ++i) {
        if (str.charAt(i) === 'a') {
            return true;
        }
    }
    return false;
}

console.log(findA('bcbcbbccbbca1'));