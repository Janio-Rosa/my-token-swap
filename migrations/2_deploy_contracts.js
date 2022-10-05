const EthSwap = artifacts.require("EthSwap");
const JanioToken = artifacts.require("JanioToken");

module.exports = async function(deployer) {
    await deployer.deploy(JanioToken);
    const token = await JanioToken.deployed();

    await deployer.deploy(EthSwap, token.address);
    const ethSwap = await EthSwap.deployed();

    await token.transfer(ethSwap.address, '1000000000000000000000000');	
};
