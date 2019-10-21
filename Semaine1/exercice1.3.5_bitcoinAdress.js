const crypto = require("crypto");
const base58 = require("base-58");

// Classe pour clé publique
class PublicKey {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = 0x00;
    }

    toBuffer() {
        return Buffer.concat([Uint8Array.of(0x04), x, y]); 
        //Le tableau typé Uint8Array représente un tableau d'entiers 
        //non signés, représentés sur 8 bits. 
        //Les éléments du tableau sont initialisés à 0. 
        //Une fois que le tableau est construit, on peut manipuler 
        //ses différents éléments grâce aux méthodes de l'objet 
        //ou grâce à la notation usuelle (avec les crochets).


    }

    hash160() {
        let sha256Buffer = crypto.createHash("sha256").update(this.toBuffer()).digest();
        return crypto.createHash("ripemd160").update(sha256Buffer).digest();
    }

    addIdChecksum() {
        let hash160Buffer = this.hash160();
        let idBuffer = Buffer.concat([Uint8Array.of(this.id), hash160Buffer]);
        let checksumBuffer = crypto.createHash("sha256").update(idBuffer).digest();
        checksumBuffer = crypto.createHash("sha256").update(checksumBuffer).digest();
        return Buffer.concat([idBuffer, checksumBuffer.subarray(0, 4)]);
    }

    toAdressString() {
        return base58.encode(this.addIdChecksum());
    }
}

let x = crypto.randomBytes(32);
let y = crypto.randomBytes(32);

let key = new PublicKey(x, y);
console.log(key.toBuffer().toString("hex"));
console.log(key.hash160().toString("hex"));
console.log(key.addIdChecksum().toString("hex"));
console.log(key.toAdressString());