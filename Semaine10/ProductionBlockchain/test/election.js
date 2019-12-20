var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
    var electionInstance;

    it("initializes with two candidates", function() {
        return Election.deployed().then(function(instance) {
            //on fait appelle a une instance de notre contrat deploye
          return instance.candidatesCount();
          //sur cette instance on applique la fonction candidatesCount
        }).then(function(count) {
            //on fait ca car cest asynchrone dont il faut reprendre la fonction
          assert.equal(count, 2);
          //on verifie que la valeur est egale a 2
        });
      });
    
      it("it initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            //ici on va verifier le contenu des structures
          electionInstance = instance;
          return electionInstance.candidates(1);
          //d'abord pour le premier candidat
        }).then(function(candidate) {
          assert.equal(candidate[0], 1, "contains the correct id");
          assert.equal(candidate[1], "Candidate 1", "contains the correct name");
          assert.equal(candidate[2], 0, "contains the correct votes count");
          return electionInstance.candidates(2);
          //ensuite pour le second
        }).then(function(candidate) {
          assert.equal(candidate[0], 2, "contains the correct id");
          assert.equal(candidate[1], "Candidate 2", "contains the correct name");
          assert.equal(candidate[2], 0, "contains the correct votes count");
        });
      });






});