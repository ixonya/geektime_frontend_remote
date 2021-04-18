function findAb(str) {
    for (let i = 0 ; i != str.length - 1 ; ++i) {
        c = str.charAt(i);
        if (c === 'a') {
            if (str.charAt(i + 1) === 'b') {
                return true;
            }
        }
    }
    return false;
}

console.log(findAb('3894  aaafdfaaab098 90809 bbaaa'));