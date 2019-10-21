class Noeud {
  constructor(valeur) {
    this.valeur = valeur
    this.gauche = undefined
    this.droit = undefined
  }
  _ajouter(valeur) {
    if ( valeur < this.valeur)
      if (this.gauche===undefined)
        this.gauche = new Noeud(valeur)
      else 
        this.gauche._ajouter(valeur)
    else if (valeur > this.valeur)
      if (this.droit===undefined)
        this.droit = new Noeud(valeur)
      else 
        this.droit._ajouter(valeur)
  }
  _affichageInfixe(){
    let affichage = []
    if (this.gauche)
      affichage = this.gauche._affichageInfixe()
    affichage = affichage.concat([this.valeur])
    if (this.droit)
      affichage = affichage.concat(this.droit._affichageInfixe())
    return affichage
    
  }
  _trouverValeur(v){
    if (this.valeur == v)
      return true
    else if (v < this.valeur)
      if(this.gauche)
        return this.gauche._trouverValeur(v)
      else 
        return false
    else 
      if (this.droit)
        return this.droit._trouverValeur(v)
      else 
        return false
  }
}

class ArbreBinaire {
  constructor(){
    this.racine = undefined
  }
  ajouter(valeur){
    if (this.racine === undefined)
      this.racine = new Noeud(valeur)
    else 
      this.racine._ajouter(valeur)
  }
  affichageInfixe(){
    console.log("Affichage Infixe: ", this.racine._affichageInfixe())
  }
  trouverValeur(v){
    console.log(this.racine._trouverValeur(v))
  }
}

baobab = new ArbreBinaire()
baobab.ajouter(6)
baobab.ajouter(3)
baobab.ajouter(7)
baobab.ajouter(2)
baobab.ajouter(4)
baobab.affichageInfixe()
console.log(baobab)
