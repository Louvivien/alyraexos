//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity ^0.5.11;  //le chapeau dit toutes les version en dessous


contract SceneOuverte {
    //0x3A96040CB6cD3B03E253Ca7Be66fc650A0e9f527

    string[12] passagesArtistes;
    uint creneauxLibres = 12;
    uint tour;


    function sInscrire(string memory _nomDArtiste) public {   //memory car c'est un input
    if(creneauxLibres >0){                                  //s'il reste des places
    passagesArtistes[12-creneauxLibres] = _nomDArtiste;      //on attribue une place a l'artiste
    creneauxLibres -=1;                                     //on décremente le nombre de places restantes
                        }
    }

/*
Ensuite, on ajoute la gestion du passage des artistes. 
Le premier artiste à passer est l’artiste dont le nom est sur la première case du tableau, numérotée 0. 

On déclare donc une nouvelle variable, tour, qui désigne la case de l’artiste en cours de passage. 
Notez que les entiers sont automatiquement initialisés à “0”.
*/

    
    function passerArtisteSuivant() public {
    tour += 1; //celui qui va jouer
    }
    
/*
Ensuite on ajoute une fonction “getter”, qui nous affiche l’artiste en cours de passage.


*/

    function getTour() public view returns (uint) {
    return tour;
    }
    
    
    function artisteEnCours() public view returns (string memory){
    return passagesArtistes[tour-1];
     }
    
    
    
 }








  

  