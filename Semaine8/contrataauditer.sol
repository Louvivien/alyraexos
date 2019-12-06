//pragma solidity ^0.5.12;
                            ///////////////1. il est preferable de verrouiller le compilateur a une version precise
pragma solidity 0.5.11;


//import "./Token.sol";
import "./SafeMath.sol";                    //2. safemath nest pas importe a lorigine
import "./Pausable.sol";


contract Crowdsale is Pausable { 
    using SafeMath for uint256;  
    

    //address public owner;                                                 ///////3. n'est pas utilise 
    //Token public tok; 
    address payable escrow; // Address of Escrow Provider Wallet 
                                                                            ///////4. la passer en private et en payable
    uint256 public savedBalance = 0; // Total amount raised in ETH 
    mapping (address => uint256) balances;// Balances in incoming Ether     ///5. rajouter public
    
    
    
    // Initialization                                                       //6. penser a instancier le token
    constructor(address payable _escrow) public {
        //ajouter ici les constructeurs avec une limite et un delai pour l'ICO
        //ajouter token = new(Token);
        
        
    //owner = msg.sender;                                                   //7. pas necessaire
    // add address of the specific contract
    escrow = _escrow; 
        
    }
                                                                            ///////8. fallback doit etre defini comme external pas a lorigine
                                                                            //9. ajouter un require qui va verifier que le transfer sest bien fait, 
                                                                            //le require fait un rollback de toute la foncion
    function () external whenNotPaused payable { 
                                                                
        escrow.transfer(msg.value);                                         //10. passer le transfer en derniere instruction
        ///// pas de require
        balances[msg.sender] = balances[msg.sender].add(msg.value); 
        savedBalance = savedBalance.add(msg.value); 
                                                                            //11. ajouter le transfert lie au token
                                        }
}









