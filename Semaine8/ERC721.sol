contract ObjetsMagiquesERC721Simple {
    
      //On créé la structure d'un objet
    struct Item {
        //a une adresse
        address owner;    
        //a une rarete
        uint256 rarete;
        //a un type
        uint256 typeObjet;
        //a un model
        uint256 modele;
    }
    
        //On créé le tableau de la liste des objets
    Items [] _listItems;
    
    
 event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

 function createMagicItem(uint256 rarete, uint256 typeObjet, uint256 modele) public view returns (string validation)
 //A FINIR
 {
        //On vérifie d'abord une premiere chose   AFINIR
        require(estInscris(msg.sender), "xxxx");
        //On vérifie ensuite une seconde chose AFINIR
        require(remuneration > 0, "xxxx");
        //On vérifie ensuite un autre truc AFINIR
        require(delai > 0, "xxxxx");
        //On vérifie enfin une derniere chose AFINIR
        require(msg.value >= (remuneration * 102)/100, "xxxxx");


        //On alimente le tableau _listItems 
        _listDemandes.push(Items(msg.sender, rarete, typeObjet, modele"));
        
     
         //On cree l'objet
        mapping (uint256 => address) private _newItem;
     
        return "votre objet a ete cree";
    };

 function balanceOf(address _owner) public view returns (uint256 balance);

 function ownerOf(uint256 _tokenId) public view returns (address _owner);

 function exists(uint256 _tokenId) public view returns (bool exists);

 function transferFrom(address _from, address _to, uint256 _tokenId) public;

}
