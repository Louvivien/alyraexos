class Noeud {
    constructor(valeur) {
      this.valeur = valeur
      this.gauche = undefined
      this.droit = undefined
    }
  
    ajouter(valeur) {
      if (this.gauche == undefined)
        this.gauche = new Noeud(valeur)
      else if (this.droite == undefined)
        this.droite = new Noeud(valeur)
      else 
        this.gauche.ajouter(valeur)
    }
  
    afficherSousArbre() {
      let sousArbre = this.valeur.toString()
      if(this.gauche)
        sousArbre += '('+ this.gauche.afficherSousArbre() +')'
      if(this.droite)
        sousArbre += '('+ this.droite.afficherSousArbre() +')'
      return  sousArbre
    }
  }
  
  class Arbre {
    constructor() {
      this.racine = undefined
    }
  
    ajouterNoeud(valeur) {
      if (this.racine !== undefined) 
        this.racine.ajouter(valeur)
      else 
        this.racine = new Noeud(valeur)
    }
  
    afficherArbre(){
      return this.racine.afficherSousArbre()
    }
  }
  
  babobab = new Arbre()
  babobab.ajouterNoeud(6)
  babobab.ajouterNoeud(3)
  babobab.ajouterNoeud(7)
  console.log("Baobab:", babobab)
  console.log("Affichage prefix:", babobab.afficherArbre())
  