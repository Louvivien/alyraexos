class Etudiant :
        def __init__(self, nom, prenom, numero_etudiant, age) :
            self.nom = nom
            self.prenom = prenom
            self.numero_etudiant = numero_etudiant
            self.age = age


        def getNom(self) :
            return self.nom

        def getPrenom(self) :
            return self.prenom

        def estPlusAgeQue(self, age) :
            if self.age > age :
                return True
            else :
                return False 

unEtudiant = Etudiant("Dupont", "Marcel", 2110012, 23)
print(unEtudiant.getNom())
print(unEtudiant.getPrenom())
print(unEtudiant.estPlusAgeQue(30))
