const crypto = require("crypto")

function hachage(chaine){
  let b = Buffer.from(chaine)
  let h = crypto.createHash("sha256").update(b).digest("hex")
  // Pour simplifier et avoir un entier de taille raisonnable, on prend les premiers octets du condensat
  let miniH = h.slice(0,8)
  return parseInt(miniH,16)
}
x
function minage (chaine, target) {
  console.log("Minage. La cible est", target)
  nonce=-1
  do {
    nonce = nonce+1
    // A faire : travailler sur des binaires plutôt que des chaînes de caractères avec Buffer.from() et Buffer.concat()
    chaineCandidate = chaine + nonce
    condensat = hachage(chaineCandidate)
    console.log("nonce =",nonce,", appel sur la chaine [", chaineCandidate, "]\t condensat = ",condensat, )
  } while(condensat>=target)
  console.log(">>> Trouvé nonce =", nonce)
}

minage("Bonjour!", 247796327)