pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TokenAuction {
  ERC721 public nonFungibleContract;

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
    Auction memory _auction = Auction({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuction[_tokenId] = _auction;
  }
}
Let’s add tests for this function. We want to check that TokenAuction claims the ownership of the token and that it creates an auction associated with that token.

Add the following block to your test/TokenAuctionTest.js

describe("createAuction", () => {
  let nft, auctionContract, tokens;

  before(async () => {
    nft = await GradientToken.new();
    auctionContract = await TokenAuction.new(nft.address);

    await nft.mint("#ff00dd", "#ddddff");
    tokens = await nft.tokensOf(accounts[0]);

    await nft.approve(auctionContract.address, tokens[0]);
    await auctionContract.createAuction(tokens[0], 100);
  });

  it("Should take ownership of a token", async () => {
    const tokenOwner = await nft.ownerOf(tokens[0]);
    assert.equal(tokenOwner, auctionContract.address);
  });

  it("Should create new auction", async () => {
    const auction = await auctionContract.tokenIdToAuction(tokens[0]);
    assert.equal(auction[0], accounts[0]);
    assert.equal(auction[1].toNumber(), 100);
  });
});