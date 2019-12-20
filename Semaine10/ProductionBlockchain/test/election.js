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

      it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          //on fait une instance et on la met dans une variable
          candidateId = 1;
          return electionInstance.vote(candidateId, { from: accounts[0] });
          //on lui dit qu'elle account doit voter
        }).then(function(receipt) {
          //on recupere ce qui nous revient
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          //on verifie quil y a un log 
          assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
          //on accede a l'event
          assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
          //on verifie que le candidate id est le bon
          return electionInstance.voters(accounts[0]);
          //on va lire le mapping des voters
        }).then(function(voted) {
          //on verifie si cet account a vote
          assert(voted, "the voter was marked as voted");
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
      });

      it("throws an exception for invalid candidates", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
          //on vote pour le candidat 99
        }).then(assert.fail).catch(function(error) {
          //on verifie que ca ne marche pas 
          //on recupere le message
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          //on verifie que le message contient le mot revert
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          //on verifie que sil y a une erreur le compteur de vote ne sincremente pas pour le candidate 1
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
          //on verifie que sil y a une erreur le compteur de vote ne sincremente pas pour le candidate 2
        });
      });

      it("throws an exception for double voting", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 2;
          electionInstance.vote(candidateId, { from: accounts[1] });
          //on vote une fois pour le candidat 1
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "accepts first vote");
          //on verifie que ca marche
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });

});