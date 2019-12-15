pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";



contract GradientToken is ERC721, Ownable {
    /*Ownable allows managing authorization. 
    It assigns ownership to deployer (when the contract is deployed) 
    and adds modifier onlyOwner that allows you to restrict certain methods
    only to contract owner. Also, you can transfer ownership.*/
  string public constant name = "GradientToken";
  string public constant symbol = "GRAD";

struct Gradient {
  string outer;
  string inner;
}

  Gradient[] public gradients;


  function getGradient( uint _gradientId ) public view returns(string memory outer, string memory inner){
    Gradient memory _grad = gradients[_gradientId];

    outer = _grad.outer;
    inner = _grad.inner;
  }

  function mint(string memory _outer, string memory _inner) public payable onlyOwner{
    Gradient memory _gradient = Gradient({ outer: _outer, inner: _inner });
    uint _gradientId = gradients.push(_gradient) - 1;

    _mint(msg.sender, _gradientId);
  }







}
