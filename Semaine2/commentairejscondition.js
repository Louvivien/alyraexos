/*
4.3. Exercice sur les conditions.
Fournir un commentaire selon l'âge de la personne.
Vous devez fournir un commentaire sur 4 tranches d'âge qui sont les suivantes :
Tranche d'âge Exemple de commentaire
1 à 6 ans « Vous êtes un jeune enfant. »
7 à 11 ans « Vous êtes un enfant qui a atteint l'âge de raison. »
12 à 17 ans « Vous êtes un adolescent. »
18 à 120 ans « Vous êtes un adulte. »

*/

var age = prompt('Quel age avez vous ?');
alert(age);
if (age <= 6) { 
    alert('Vous êtes un jeune enfant.') }
if (age > 6 && age <= 11) { 
    alert('Vous êtes un enfant qui a atteint l\'âge de raison.') }
if (age > 11 && age <= 17) {
    alert('Vous êtes un adolescent.') }
if (age > 17 && age <= 120) {
    alert('Vous êtes un adolescent.') }
else {
    alert('Ce n\'est pas un âge realiste.') }






