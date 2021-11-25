const { expect } = require("chai");

describe("TokenCreator contract", function () {
  let tokenCreator = null;
  const initialSupply = 1000;
  const name = "Super Token";
  const symbol = "STK";
  let deployer, wallet, walletTo;

  beforeEach(async () => {
    [deployer, wallet, walletTo] = await ethers.getSigners();
    const tokenCreatorFactory = await ethers.getContractFactory("TokenCreator");
    tokenCreator = await tokenCreatorFactory.deploy();
  });

  it("is owned by deployer", async function () {
    await expect(await tokenCreator.owner()).to.equal(deployer.address);
  });

  it("creates SimpleToken for Wallet and assigns balance", async function () {
    await expect(
      await tokenCreator
        .connect(wallet)
        .createSimpleToken(initialSupply, name, symbol)
    )
      .to.emit(tokenCreator, "CreatedSimpleToken")
      .withArgs(
        await tokenCreator.child(),
        wallet.address,
        initialSupply,
        name,
        symbol
      );
    const simpleToken = await ethers.getContractAt(
      "SimpleToken",
      await tokenCreator.child()
    );
    await expect(await simpleToken.balanceOf(deployer.address)).to.equal(0);
    await expect(await simpleToken.balanceOf(wallet.address)).to.equal(
      initialSupply
    );
  });
});
