
//on compare ici lettre par lettre

function palindrome(mot) {
    if (( mot.length == 0 ) || (mot.length == 1)){ //on verifie si la premiere et la derniere lettre sont les meme
        return true
    } else if (
        mot[0] != mot[mot.length-1]){ //si la premiere et la derniere lettre ne sont pas les meme on dit cest pas bon 
        return false
    
    } else {
        
        palindrome(mot.substring(1,mot.length)) // si cest bon on prend ce quil reste 
    }
}


function estPalindrome(chaine){
    if(palindrome(chaine)){
    console.log("La chaine", chaine, "est un palindrome")
    } else{
    console.log("La chaine", chaine, "n'est PAS un palindrome")
    }
}


estPalindrome("A")
estPalindrome("BOB")
estPalindrome("BOuisB")