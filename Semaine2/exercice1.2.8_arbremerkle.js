//on va faire un tableau de tableau
//chaque case est une ligne


//on utilise les fonctions de hashage de javascript

const crypto = require('crypto')



class ArbredeMerkle {
    constructor(feuilles){
        this.feuilles = feuilles
        this.arbre = [[]]

        for(let f of feuilles){
            this.arbre[0].push(this.hachageChaine(f))
            //chaque feuille on fait un hash et la on rempli la premiere case

        

        for(let i = 0; i < this.arbre[i].length < 1 ; i++) {
            //i cest la ligne
            this.arbre[i=1]=[]
            //jajoute une nouvelle ligne en faisant un tableau vide
            for(let j=0; j<this.arbre[i].length;j+=2) {
                this.arbre[i=1].push(this.hachage(this.arbre[i][j],this.arbre[i][j+1]))
            //cette ligne va se construire en hachant la ligne precedente

            }
        }

        //des que jarrive a une ligne ou il ny a plus quun noeud on sarrete


    }





}




//premiere ligne fais le hash des feuilles

hachageChaine(chaine){
   return crypto.createHash('sha256').update(Buffer.from(chaine),'utf8').digest()
}


hachage(hashA,hashB){
//concatenation
let concatenation = []
if (hashB === undefined)
    concatenation = hashA
else
    concatenation = Buffer.concat([hashA,hashB])

return crypto.createHash('sha256').update(concatenation,'utf8').digest()
}

afficher(){

    console.log(this.feuilles)
    console.log(this.arbre)
    
}


}


/*
*/
//var abreMerkle = ["lapin", "carotte", "champs", "arbre"]





erable = new ArbredeMerkle(["AA","BB","CC","DD"])
erable.afficher()
