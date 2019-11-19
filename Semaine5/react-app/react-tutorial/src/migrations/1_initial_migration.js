const Migrations = artifacts.require("Migrations");
const scOuverte = artifacts.require("SceneOuverte")
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(scOuverte);
};
