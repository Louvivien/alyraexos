App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Production.json", function(production) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Production = TruffleContract(production);
      // Connect provider to interact with contract
      App.contracts.Production.setProvider(App.web3Provider);

      App.listenForEvent1();
      App.listenForEvent2();

      return App.render();
    });
  },

  listenForEvent1: function() {
    App.contracts.Production.deployed().then(function(instance) {
      //on fait une instance de notre contrat
      instance.addedProducerEvent({}, {
        //on appelle levenement et on y souscrit
        fromBlock: 'latest',
        //modif ici!!!!!! https://github.com/dappuniversity/election/issues/2
        toBlock: 'latest'
        //on le raccroche a la blockchain
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new percentage is recorded
        App.render();
      });
    });
  },

  listenForEvent2: function() {
    App.contracts.Production.deployed().then(function(instance) {
      //on fait une instance de notre contrat
      instance.addedMandatEvent({}, {
        //on appelle levenement et on y souscrit
        fromBlock: 'latest',
        //modif ici!!!!!! https://github.com/dappuniversity/election/issues/2
        toBlock: 'latest'
        //on le raccroche a la blockchain
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new percentage is recorded
        App.render();
      });
    });
  },

  render: function() {
    var productionInstance;
    var loader = $("#loader");
    var content = $("#content");
  
    loader.show();
    content.hide();
  
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  
    // Load contract data Producer
    App.contracts.Production.deployed().then(function(instance) {
      productionInstance = instance;
      return productionInstance.producersCount();
    }).then(function(producersCount) {
      
      // Store all promised to get producer info
      const promises = [];
      for (var i = 1; i <= producersCount; i++) {
        promises.push(productionInstance.producers(i));
      }

      // Once all producers are received, add to dom
      Promise.all(promises).then((producers) => {
        var producersResults = $("#producersResults");
        producersResults.empty();

      var producersSelect = $('#producersSelect');
      //producteur selectionne dans le formulaire
      producersSelect.empty();

      producers.forEach(producer => {
        //on rentre dans la boucle des candidats
          var id = producer[0];
          var name = producer[1];
          var producerShare = producer[2];
  
          // Render producer Result
          var producerTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + producerShare + "%"+ "</td></tr>"
          producersResults.append(producerTemplate);
  
          // Render producer ballot option
          var producerOption = "<option value='" + id + "' >" + name + "</ option>"
          producersSelect.append(producerOption);

      })
      });
      
      return productionInstance.listProducers(App.account);
      //on prend le compte
    }).then(function(hasVoted) {
      //on le passe dans la fonction a vote
      // Do not allow a user to vote
      if(hasVoted) {
        //$('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });


// Load contract data Mandat
App.contracts.Production.deployed().then(function(instance) {
  productionInstance = instance;
  return productionInstance.mandatsCount();
}).then(function(mandatsCount) {
  
  // Store all promised to get mandat info
  const promises = [];
  for (var i = 1; i <= mandatsCount; i++) {
    promises.push(productionInstance.mandats(i));
  }

  // Once all mandats are received, add to dom
  Promise.all(promises).then((mandats) => {
    var mandatsResults = $("#mandatsResults");
    mandatsResults.empty();

  var mandatsSelect = $('#mandatsSelect');
  //producteur selectionne dans le formulaire
  mandatsSelect.empty();

  mandats.forEach(mandat => {
    //on rentre dans la boucle des candidats
      var mandatId = mandat[0];
      var mandatType = mandat[1];

      // Render mandat Result
      var mandatTemplate = "<tr><td>" + mandatType + "</td></tr>"
      mandatsResults.append(mandatTemplate);

      // Render producer ballot option
      var mandatOption = "<option value='" + mandatId + "' >" + mandatType + "</ option>"
      mandatsSelect.append(mandatOption);

  })
  });
  
    //parait pas mal par rapport a l'autre 
  loader.hide();
  content.show();
}).catch(function(error) {
  console.warn(error);
});






  },




  

  addMandat: function() {
    //on a appelle dans le submit de notr form addMandat
    var mandatType = $('#mandatType').val();
    App.contracts.Production.deployed().then(function(instance) {
      return instance.addMandat(mandatType, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  addProd: function() {
    //on a appelle dans le submit de notr form addProducer
    var producerName = $('#producerName').val();
    var producerShare = $('#producerShare').val();
    App.contracts.Production.deployed().then(function(instance) {
      return instance.addProducer(producerName, producerShare, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }



};

//#region /////fonctions pour le front ///////
  
	//Input field value handling on focus
	$("input").focus( function() {
    $(this).addClass('alter-input');
    if(this.value==this.defaultValue)this.value='';
}).blur(function() {
    if(this.value=='') {
    this.value=this.defaultValue;
      $(this).removeClass('alter-input');
  }
});

/* ----------------------------------------------
    ADD MODULES TO DOM ON CLICK
---------------------------------------------- */




//Urgent Notification  // section en partie desactive par v
$('#ns-form').css('display', "none");


var a = 0;
$('#add-notification').click(function() {		
  if (a == 0) {
    $('.red-btn-icon').addClass('white-btn-icon');
    
    $('#add-notification').addClass('active-ns-div');
    $('#add-notification span').addClass('icon-red');
    //$('#add-notification h4').addClass('active-h4').html('Ajouter un coproducteur');
    /* desactive par v */
    $('#add-notification .plus').addClass('rotate-45');
    
    $('#ns-form').animate({  
      opacity: 'show',  
      height: 'show'  
    }, 'fast');
    
    a = 1;
    return;
  };
  if (a == 1) {
    $('.red-btn-icon').removeClass('white-btn-icon');
    
    $('#add-notification').removeClass('active-ns-div');
    $('#add-notification span').removeClass('icon-red');
    //$('#add-notification h4').removeClass('active-h4').html('Ajouter un coproducteur');
    /* desactive par v */
    $('#add-notification .plus').removeClass('rotate-45');
    
    
    $('#ns-form').animate({  
      opacity: 'hide',  
      height: 'hide'  
    }, 'fast');
    
    a = 0;
  };
});



//Main Content 1
$('#rac-form-1').css('display', "none");

var b = 0;
$('#add-main-1').click(function() {	
  if (b == 0) {
    $('.blue-btn-icon-1').addClass('white-btn-icon');
    
    $('#add-main-1').addClass('active-rac-div');
    $('#add-main-1 span').addClass('icon-blue');
    //section pliee
    $('#add-main-1 h4').addClass('active-h4').html('Ajouter un coproducteur');
    $('#add-main-1 .plus').addClass('rotate-45');
    
    $('#rac-form-1').animate({  
      opacity: 'show',  
      height: 'show'  
    }, 'fast');
    
    b = 1;
    return;
  };
  if (b == 1) {
    $('.blue-btn-icon-1').removeClass('white-btn-icon');
    
    $('#add-main-1').removeClass('active-rac-div');
    $('#add-main-1 span').removeClass('icon-blue');
    //retour apres ouverture
    $('#add-main-1 h4').removeClass('active-h4').html('Ajouter un coproducteur');
    $('#add-main-1 .plus').removeClass('rotate-45');
    
    $('#rac-form-1').animate({  
      opacity: 'hide',  
      height: 'hide'  
    }, 'fast');
    
    b = 0;
  };
});


//New Member
$('#nm-form').css('display', "none");

$('#nm-checked').click(function() {
  if ($("#nm-checked").is(":checked")) {
    $('#nm-form').show('fast'); 
    }
  else {
    $('#nm-form').hide('fast');
    }
});

var nm = 1;
$("#nm-add").click(function() {
  $('<br><input type="file" name="nm['+ (nm * 3) +']" /><br><input type="text" name="nm['+ ((nm * 3)+1) +']" value="Name" /><br><input type="text" name="nm['+ ((nm*3)+2) +']" value="Job Role" /><br>').animate({ opacity: 'toggle'}, 500).insertBefore('#nm-add');
  nm++;
});

//Web Resources
$('#wr-form').css('display', "none");

$('#wr-checked').click(function() {
  if ($("#wr-checked").is(":checked")) {
    $('#wr-form').show('fast'); 
    }
  else {
    $('#wr-form').hide('fast');
    }
});

var wr = 1;
$("#wr-add").click(function() {
  $('<br><input type="text" name="wr['+ (wr * 3) +']" placeholder="Reference" class="" /><br><input type="number" name="wr['+ ((wr * 3)+1) +']" placeholder="Montant en euros" class="" /><br><input type="text" name="wr['+ ((wr*3)+2) +']" placeholder="Description" class="" /><br>').animate({ opacity: 'toggle'}, 500).insertBefore('#wr-add');
  wr++;
});

/*
//Important Notification
$('#ns-form').css('display', "none");

$('#ns-checked').click(function() {
  if ($("#ns-checked").is(":checked")) {
    $('#ns-form').show('fast'); 
    }
  else {
    $('#ns-form').hide('fast');
    }
});

//Recently Added Content
$('#rac-form').css('opacity', 0.5);

$('#rac-checked').click(function() {
  if ($("#rac-checked").is(":checked")) {
    $('#rac-form').animate({ opacity: 1 }, 75);
    }
  else {
    $('#rac-form').animate({ opacity: 0.5 }, 'fast');
    }
});
  */
var rac = 1;
$("#rac-add").click(function() {
  $('<input type="text" name="rac-title-'+ rac +'" value="Title" /><br><textarea rows="4" cols="40" id="rac-'+ rac +'">Content</textarea><br>').animate({ opacity: 'toggle'}, 500).insertBefore('#rac-add');
  rac++;
});


//Main Content 2 deuxieme ligne
$('#rac-form-2').css('display', "none");

var b = 0;
$('#add-main-2').click(function() {	
  if (b == 0) {
    $('.red-btn-icon').addClass('white-btn-icon');
    
    $('#add-main-2').addClass('active-ns-div');
    $('#add-main-2 span').addClass('icon-red');
    //section pliee
    $('#add-main-2 h4').addClass('active-h4').html('Ajouter un mandat');
    $('#add-main-2 .plus').addClass('rotate-45');
    
    $('#rac-form-2').animate({  
      opacity: 'show',  
      height: 'show'  
    }, 'fast');
    
    b = 1;
    return;
  };
  if (b == 1) {
    $('.red-btn-icon').removeClass('white-btn-icon');
    
    $('#add-main-2').removeClass('active-ns-div');
    $('#add-main-2 span').removeClass('icon-red');
    //retour apres ouverture
    $('#add-main-2 h4').removeClass('active-h4').html('Ajouter un mandat');
    $('#add-main-2 .plus').removeClass('rotate-45');
    
    $('#rac-form-2').animate({  
      opacity: 'hide',  
      height: 'hide'  
    }, 'fast');
    
    b = 0;
  };
});

//#endregion fin des fonctions pour le front ///////

$(function() {
  $(window).load(function() {
    App.init();
  });
});