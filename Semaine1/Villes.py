#-*- coding: utf-8 -*-


class Ville :
        
        
        def __init__(self, liste) :
            self.nom = liste[0]
            self.num_departement = int(liste[1])
            self.population = int(liste[2])
            self.superficie = float(liste[3])
            self.rang = int(liste[4])


        def getRang(self) :
            return self.rang

        def getSuperficie(self) :
            return self.superficie

        def afficherNom(self) :
            return print(self.nom)
        
        def afficherVille(self) :
            return print(self.nom, self.num_departement, self.population, self.superficie, self.rang)


class Noeud:
        def __init__(self,liste):
            self.gauche = None
            self.droite = None
            self.ville = Ville(liste)

        def inserer(self, liste):
            ville = Ville(liste)
            if ville.getRang() < self.ville.getRang() :
            # if ville.getSuperficie() < self.ville.getSuperficie() :    
                if self.gauche is None:
                    self.gauche = Noeud(liste)
                else:
                    self.gauche.inserer(liste)
            else :
                if self.droite is None:
                    self.droite = Noeud(liste)
                else:
                    self.droite.inserer(liste)

        def afficherArbre(self): # parcours infixe
                if self.gauche:   # si il y a un element a gauche 
                    self.gauche.afficherArbre() #on recommence la fonction
                self.ville.afficherVille() #sinon on affiche la ville
                if self.droite: 
                    self.droite.afficherArbre()

        def rechercher(self, rang):
            if rang < self.ville.getRang() :
                if self.gauche is None:
                    return None
                return self.gauche.rechercher(rang)
            elif rang > self.ville.getRang() :
                if self.droite is None:
                    return None
                return self.droite.rechercher(rang)
            else :
                return self


fichier = open("villes.txt", "r")

liste = ["Maisons-Alfort", 94, 51091, 5.4, 100]
noeud = Noeud(liste)  #ici on cree notre racine

for ligne in fichier :  #ici on remplit tous les noeuds
     liste = ligne.rsplit(" ")
     noeud.inserer(liste)

fichier.close()
noeud.afficherArbre()

unNoeud = noeud.rechercher(130)
if unNoeud is not None :
    unNoeud.ville.afficherNom()
else :
    print("Non trouvé")
  