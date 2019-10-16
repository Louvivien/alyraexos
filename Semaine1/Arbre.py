#-*- coding: utf-8 -*-

'''
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
'''

class Noeud:
        def __init__(self,v):
            print("initnoeud")
            self.gauche = None
            self.droite = None
            self.valeur = v  

    
class Arbre:
    def __init__(self):
        print("initarbre")
        self.racine = None 

    def ajouter(self, val):
        print("ajouter1")
        if(self.racine == None):  #si pas de racine devient la racine
            self.racine = Noeud(val)
        else:
            self._ajouter(val, self.racine)


    def _ajouter(self, val, nd):
        print("ajouter2")
        if(val < nd.valeur  ): #sinon il se met le plus a gauche
            if(nd.gauche is not None):
                self._ajouter(val, nd.gauche)
            else:
                nd.gauche = Noeud(val)
        else:
            if(nd.droite is not None):
                self._ajouter(val, nd.droite)
            else:
                nd.droite = Noeud(val)

    def afficher(self): # parcours infixe
        if Noeud(self).gauche:   # si il y a un element a gauche 
                Noeud(self).gauche.afficherArbre() #on recommence la fonction
                print(Noeud(self).valeur) #sinon on affiche la valeur 
                print("hello")
        if Noeud(self).droite: 
                Noeud(self).droite.afficherArbre() 
                print("hi")

'''
    def rechercher(self, rang):
        if rang < self.v.getRang() :
            if self.gauche is None:
                return None
            return self.gauche.rechercher(rang)
        elif rang > self.v.getRang() :
             if self.droite is None:
                return None
            return self.droite.rechercher(rang)
        else :
            return self
'''


arbre = Arbre() #ici on cree notre arbre ce qui va creer notre racine
arbre.ajouter(1)
arbre.ajouter(2) #ici on remplit le premier noeud
arbre.ajouter(3) 
arbre.afficher()

'''
noeud.afficherArbre()



unNoeud = noeud.rechercher(130)
if unNoeud is not None :
    unNoeud.v.afficherNom()
else :
    print("Non trouvé")
 ''' 