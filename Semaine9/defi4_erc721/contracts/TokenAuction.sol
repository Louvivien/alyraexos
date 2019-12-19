pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TokenAuction {
  ERC721 public nonFungibleContract;
/*we define a contract that accepts non-fungible token address 
and assigns it to a public variable nonFungibleContract
  */

  struct Auction {
    address seller;
    uint128 price;
  }

  mapping (uint256 => Auction) public tokenIdToAuction;

  function TokenAuction( address _nftAddress ) public {
    nonFungibleContract = ERC721(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
  nonFungibleContract.takeOwnership(_tokenId);
  /*this function calls the ERC721 method takeOwnership. 
  This method transfers ownership if the transfer was approved for a specific contract.
   You can approve transfer using approve method
  */
  /*
  Then we create a new instance of our Auction and assign it to temporal
   in-memory variable _auction. 
  */
  Auction memory _auction = Auction({
     seller: msg.sender,
     price: uint128(_price)
  });
  //finally, we make a mapping of this auction to our _tokenId
  tokenIdToAuction[_tokenId] = _auction;
}

  function bid( uint256 _tokenId ) public payable {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller != address(0));
    require(msg.value >= auction.price);

    address seller = auction.seller;
    uint128 price = auction.price;

    delete tokenIdToAuction[_tokenId];

    seller.transfer(price);
    nonFungibleContract.transfer(msg.sender, _tokenId);
  }

  function cancel( uint256 _tokenId ) public {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller == msg.sender);

    delete tokenIdToAuction[_tokenId];

    nonFungibleContract.transfer(msg.sender, _tokenId);
  }
}