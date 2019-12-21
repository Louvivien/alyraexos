var Production = artifacts.require("./Production.sol");

contract("Production", function(accounts){
    var productionInstance;

    it("initializes with two producers", function() {
        return Production.deployed().then(function(instance) {
            //on fait appel a une instance de notre contrat deploye
          return instance.producersCount();
          //sur cette instance on applique la fonction producersCount
        }).then(function(count) {
            //on fait ca car cest asynchrone dont il faut reprendre la fonction
          assert.equal(count, 2);
          //on verifie que la valeur est egale a 2
        });
      });
    
      it("it initializes the producers with the correct values", function() {
        return Production.deployed().then(function(instance) {
            //ici on va verifier le contenu des structures
          productionInstance = instance;
          return productionInstance.producers(1);
          //d'abord pour le premier candidat
        }).then(function(producer) {
          assert.equal(producer[0], 1, "contains the correct id");
          assert.equal(producer[1], "Candidate 1", "contains the correct name");
          assert.equal(producer[2], 0, "contains the correct votes count");
          return productionInstance.producers(2);
          //ensuite pour le second
        }).then(function(producer) {
          assert.equal(producer[0], 2, "contains the correct id");
          assert.equal(producer[1], "Candidate 2", "contains the correct name");
          assert.equal(producer[2], 0, "contains the correct votes count");
        });
      });

      it("allows a producer to add a percentage", function() {
        return Production.deployed().then(function(instance) {
          productionInstance = instance;
          //on fait une instance et on la met dans une variable
          producerId = 1;
          return productionInstance.addPercentage(producerId, { from: accounts[0] });
          //on lui dit qu'elle account doit voter
        }).then(function(receipt) {
          //on recupere ce qui nous revient
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          //on verifie quil y a un log 
          assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
          //on accede a l'event
          assert.equal(receipt.logs[0].args._producerId.toNumber(), producerId, "the producer id is correct");
          //on verifie que le producer id est le bon
          return productionInstance.voters(accounts[0]);
          //on va lire le mapping des voters
        }).then(function(voted) {
          //on verifie si cet account a vote
          assert(voted, "the producer was marked with a percentage");
          return productionInstance.producers(producerId);
        }).then(function(producer) {
          var voteCount = producer[2];
          assert.equal(addCount, 1, "increments the producer's add count");
        })
      });

      it("throws an exception for invalid producers", function() {
        return Production.deployed().then(function(instance) {
          productionInstance = instance;
          return productionInstance.vote(99, { from: accounts[1] })
          //on vote pour le candidat 99
        }).then(assert.fail).catch(function(error) {
          //on verifie que ca ne marche pas 
          //on recupere le message
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          //on verifie que le message contient le mot revert
          return productionInstance.producers(1);
        }).then(function(producer1) {
          var voteCount = producer1[2];
          assert.equal(voteCount, 1, "producer 1 did not receive any votes");
          //on verifie que sil y a une erreur le compteur de vote ne sincremente pas pour le producer 1
          return productionInstance.producers(2);
        }).then(function(producer2) {
          var voteCount = producer2[2];
          assert.equal(voteCount, 0, "producer 2 did not receive any votes");
          //on verifie que sil y a une erreur le compteur de vote ne sincremente pas pour le producer 2
        });
      });

      it("throws an exception for double voting", function() {
        return Production.deployed().then(function(instance) {
          productionInstance = instance;
          producerId = 2;
          productionInstance.vote(producerId, { from: accounts[1] });
          //on vote une fois pour le candidat 1
          return productionInstance.producers(producerId);
        }).then(function(producer) {
          var voteCount = producer[2];
          assert.equal(voteCount, 1, "accepts first vote");
          //on verifie que ca marche
          // Try to vote again
          return productionInstance.vote(producerId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return productionInstance.producers(1);
        }).then(function(producer1) {
          var voteCount = producer1[2];
          assert.equal(voteCount, 1, "producer 1 did not receive any votes");
          return productionInstance.producers(2);
        }).then(function(producer2) {
          var voteCount = producer2[2];
          assert.equal(voteCount, 1, "producer 2 did not receive any votes");
        });
      });

});