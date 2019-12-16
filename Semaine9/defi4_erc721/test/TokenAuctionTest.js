const GradientToken = artifacts.require("GradientToken");
const TokenAuction = artifacts.require("TokenAuction");

contract("Auction", accounts => {
  it("Should accept nft on creation", async () => {
    let nft = await GradientToken.new();
    let auction = await TokenAuction.new(nft.address);
    const nftAddr = await auction.nonFungibleContract();
    assert.equal(nftAddr, nft.address);
  });
});
