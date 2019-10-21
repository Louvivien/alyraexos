




function hachage(chaine){
    condensat=0
    for (i=0)



function minage (block, cible) {

//Recherche le nonce tel que le hash (block+nonce) 
//soit inferieur a la cible


//jutilise la fonction hachage

nonce=0







let h = crypto.createHash("sha256").update(Buffer.from(chaine),'utf8').digest()

}


do {
    nonce = nonce+1
    chaineCandidate = chaine + nonce
    condensat = hachage(chaineCandidate)
    console.log("nonce =", nonce, "Appel sur [", chaineCandidate, "l\t condensat = ", condensat,)


} while (condensat >=target)
console.log(">>> Trouve nonce", nonce)



return nonce

}


previoushash = "0000000000000000000900af3ea1acae59e6ac8fc50a796a44d916ac5341d577"
