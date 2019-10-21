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
        if(self.racine == None):  #si pas de racine devient la racine
            print("la racine est vide")
            print("on affecte la valeur a la racine")
            self.racine = Noeud(val)
        else:
            print("la racine n'est pas vide")
            self._ajouter(val, self.racine) #sinon ajouter2

    def _ajouter(self, val, nd): #ajouter2
            print("on affecte la valeur a une branche")
            if(val < nd.valeur  ): #si la valeur est inferieure a la valeur du noeuf
                if(nd.gauche is not None): 
                    self._ajouter(val, nd.gauche)
                    print("on ajoute une feuille a gauche")

                else:
                    nd.gauche = Noeud(val)
                    print("le noeud prend la valeur a gauche")
            else:
                if(nd.droite is not None):
                    self._ajouter(val, nd.droite)
                    print("on ajoute une feuille a droite")
                else:
                    nd.droite = Noeud(val)
                    print("le noeud prend la valeur a droite")     


    def afficher(self):
        if (self.racine == None): 
            print ("l'arbre est vide")
        else:
            print("la racine n'est pas vide")
            x = self.racine
            print("la valeur de la racine est :", x.valeur)
            self._afficher(x)

    
    def _afficher(self, nd): #afficher2
            if(nd.gauche is not None): 
                    print("sous le noeud", nd.valeur ,"a gauche il y a le noeud ", nd.gauche.valeur)
                    self._afficher(nd.gauche)

            else:
                    print("Pas de noeud inferieur a gauche pour le noeud", nd.valeur)

            if(nd.droite is not None):              
                    print("sous le noeud", nd.valeur ,"a droite il y a le noeud ", nd.droite.valeur)
                    self._afficher(nd.droite)
            else:
                    print("Pas de noeud inferieur a droite pour le noeud", nd.valeur)
    
            
            '''
Écrire la méthode pour supprimer un noeud donné 
en distinguant trois cas :
Le noeud est une feuille -> suppression simple

Le noeud a un seul enfant -> il est remplacé par lui

Le noeud à deux enfants, on le remplace alors par le noeud 
le plus proche, c’est à dire le noeud le plus à droite 
de l’arbre gauche ou le plus à gauche de l'arbre droit.
'''
    def supprimer(self, nd): 
                nd = Noeud(nd)
                if(nd.gauche is None and nd.droite is None):
                    del nd.gauche
                    del nd.droite
                    del nd.valeur
                    print("Noeud supprime")

                elif(nd.gauche is None and nd.droite is not None):
                    Noeud(nd).valeur = nd.droite.valeur 
                    print("Noeud remplace")
                elif(nd.gauche is not None and nd.droite is None):
                    Noeud(nd).valeur = nd.gauche.valeur
                    print("Noeud remplace")
                else:
                   print("solution to be found")


        

    
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
arbre.ajouter(4)
arbre.ajouter(5)
arbre.ajouter(3)
arbre.ajouter(2)
arbre.ajouter(6)
arbre.afficher()
arbre.supprimer(6)
arbre.afficher()



'''
noeud.afficherArbre()



unNoeud = noeud.rechercher(130)
if unNoeud is not None :
    unNoeud.v.afficherNom()
else :
    print("Non trouvé")
 ''' 