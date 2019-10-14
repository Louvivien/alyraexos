

function palindrome(chaine) {
    for (let i = 0; i < chaine.length/2; i++) {
    console.log(chaine[i])
    if (chaine[i]!=chaine[chaine.length-(i+1)]){
        return false
    }
}
    return true

}

console.log(palindrome("ANNA"))
console.log(palindrome("ANdiudNA"))


