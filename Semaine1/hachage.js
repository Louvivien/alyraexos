const crypto = require("crypto")

function pseudohachage (chaine) {
    condensat=0 //En cryptographie, le condensat est synonyme de hash ou empreinte, résultat de l'application d'une fonction de hachage sur un message (ou, dans le domaine informatique, sur un fichier).

    for (let i = 0; i < chaine.length; i++) {
        condensat += chaine.charCodeAt(i) *100**(i+1) % (2**256)  // .charCodeAt retourne un entier compris entre 0 et 65535 qui correspond au code UTF-16 d'un caractère de la chaîne situé à une position donnée.
    }

    // notre condensat ne doit jamais etre egal pour ne pas qu'il y ai de collision
return condensat
}

function sha256(chaine){
    return crypto.createHash("sha256").update(chaine).digest("hex")
}

console.log("Condensat :", pseudohachage(process.argv[2]))
console.log(sha256(process.argv[2]))

/* 
process.argv[2] c est quoi : process.argv est un tableau contenant les arguments de la ligne de commande.
It starts with 2 because the code will be run with
node myprogram.js firstarg secondarg
So
process.argv[0] == "node"
process.argv[1] == "myprogram.js"
process.argv[2] == "firstarg"

Buffer :
Example
Convert the string "abc" into a stream of binary data:
var buf = Buffer.from('abc');
console.log(buf);




*/


//on peut regarder les details de la fonction crypto sur node js pour en savoir plus


//fonction qui fait un condensat de condensat

function doubleHachage(entree) {
    entreeBuffer = Buffer.from(entree)
    hash = crypto.createHash("sha256").update(entreeBuffer).digest
    doubleHash =  crypto.createHash("sha256").update(hash).digest
    return doubleHash
}


//une cle

function cleDeVerification(message) {
    entreeBuffer = Buffer.from(message)
    hash = crypto.createHash("sha256").update(message).digest("hex")
    cle =  hash.substring(0,8)
    return cle
}
message = process.argv[2]
cle = cleDeVerification(message)
console.log(message," Cle: ", cle)
console.log("Verification : ", verification(message,cle))

//Fonction qui verifie un message avec sa cle
function verification (message, cle){
    return cleDeVerification(message) == cle
}

//Fonction qui donne la chaine de caractere dont le hash commence par "66"