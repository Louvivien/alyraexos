const crypto = require("crypto");
const bs58 = require('base-58');



function ripemd160(c){
    return crypto.createHash("ripemd160").update(c).digest("hex")

}

function sha256(c){
    return crypto.createHash("sha256").update(c).digest("hex")

}


function adresseBitcoin(clePublique){


    //calculer le hash sha 256 puis ripemd160 on appelle ce resultast hash160
    let hash160 = ripemd160(sha256(clePublique))
    console.log(hash160)

    //ajouter lidentifiant (0x00) au debut 
    //et le controle a la fin (4 premiers octets du 
    //sha 256(sha 256(0x00 + hash160)))

    let adresse =  "0x00" + hash160 + sha256(Buffer.from("0x00"+hash160, "hex"))).substr(0,8)
    console.log(adresse)

    ""//0x00 + hash160 + cle

    //convertir le nombre en base 58
    let adresseb58 = bs58.encode(Buffer.from(adresse))
    return 1+adresseb58
}

console.log(adresseBitcoin("82883"))