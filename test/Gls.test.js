const { expect } = require("chai");

describe("Gld contract", function () {
  let gldInstance = null;
  let initialSupply;
  let deployer, wallet, walletTo;

  beforeEach(async () => {
    initialSupply = 1000;
    const Gld = await ethers.getContractFactory("GLDToken");
    gldInstance = await Gld.deploy(initialSupply);
    [deployer, wallet, walletTo] = await ethers.getSigners();
  });

  it("deployer gets the initial supply", async function () {
    const walletToBalance = await gldInstance.balanceOf(walletTo.address);
    expect(walletToBalance).to.equal(0);
    const deployerBalance = await gldInstance.balanceOf(deployer.address);
    expect(deployerBalance).to.equal(initialSupply);
  });

  it("transfers tokens", async function () {
    let transferAmount = 50;
    await gldInstance.transfer(walletTo.address, transferAmount);
    const walletToBalance = await gldInstance.balanceOf(walletTo.address);
    expect(walletToBalance).to.equal(transferAmount);
    const deployerBalance = await gldInstance.balanceOf(deployer.address);
    expect(deployerBalance).to.equal(initialSupply - transferAmount);
  });

  it("syntax sugar", async function () {
    await expect(gldInstance.transfer(walletTo.address, 7))
      .to.emit(gldInstance, "Transfer")
      .withArgs(deployer.address, walletTo.address, 7);
    await expect(gldInstance.transfer(walletTo.address, initialSupply + 1)).to
      .be.reverted;
  });
});
