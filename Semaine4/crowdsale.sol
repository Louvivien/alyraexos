pragma solidity ^0.5.0;

import "./ERC20exemple.sol";



contract Crowdsale {

    mapping(address => uint256) public _balances;
    address private wallet;
    ERC20veth private _token;
    
    //quand on deploie on lance le constructeur
    constructor (address payable _wallet) public {
                wallet = _wallet;
                _token = ERC20veth(0xD60c550593E36c013c8A13042Be0dE0E208EfB5a);

                
                /*
                ici soit on cree une nouvelle instance la premiere fois quon deploie notre contrat
                _token = new ERC20veth;
                soit on utilise un token existant
                //ou _token = ERC20veth(_token);
                    */
    }
    
    
    

    function() external payable {
        //payable signifie quon peut payer cette fonction en ether
        
        //lefalllback est le nom de la fontion sans nom
        //si on lappelle avec rien on appelle avec celui qui a deploye
        
        _balances[msg.sender] += msg.value;
        //on rempli la balance associe a ladresse dans le mapping
        
        buyToken(msg.sender, msg.value);
    }

    function buyToken(address beneficiary, uint256 amount) public payable {
        //Appel ERC20
        //transfert de ce contrat vers un investisseur
        
        _token.transfer(beneficiary, amount);
        //ici cest le contrat qui va appeler 
        //le transfer
        //donc cest le contrat qui va etre le msg.sender
        //dans la fonction transfert et on va avoir un pb
        //donc
        //on va tranferer des token sur le contrat
        //sinon on va deployer lerc20 sur ladresse du contrat
       
        
        //ATTENTION bien saisir ce code avant de deployer:
        //wallet.send(amount); //wallet.transfer(amount)
        //ou alors
        
        /*une fonction payback
        function payback (adresse paybable wallet){
            require (weiraise > 0);
            wallet.send(weiraise);
            weiraise = 0;
          */  
            
            //et on noublie pas dincrementer le weirai
        }
        
        
        
        
        
        
    }
    
    
    
    
}
    