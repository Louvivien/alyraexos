

//faire un convertisseur






function convertHexaToDeci(h){
    var result = 0, digitValue;
    hex = h.toLowerCase();
    for(var i = 0; i < hex.length; i++){
        digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
        result = result * 16 + digitValue;

    }
    return result;
    
    }

function convertDeciToHexa(h){
    hexa = h.toString(16)
    if (h.lenght % 2 == 1){
        hexa = '0' + hexa

    }
    return hexa;
    
    }

function convertHexaLittleEndianToHexa(h){
    if (h.length %2 ==1){
        h = '0' +h
    }
    let retour = ""
    for (var i = 0; i < h.length-1; i+=2){
        retour = h[i] + h[i+1]+ retour
    }
    return retour
}

/*function getblockchainInfo(h){
    const Client = require('bitcoin-core');
    const client = new Client({ 
    network: 'regtest', 
    username: 'user', 
    password: 'pass', 
    port: 18443 
    });
client.getBlockchainInfo().then((help) => console.log(help));
}*/


//<h3>Conversion Hexadecimal > Decimal</h3>
document.getElementById('convertHexaDE').addEventListener('click', event => {
    deci = document.getElementById('hle0').value
    hexa = convertHexaToDeci(deci)
    document.getElementById('decimal0').innerHTML = hexa
})


//<h3>Conversion Decimal > Hexadecimal</h3>
document.getElementById('convertDeciHE').addEventListener('click', event => {
    hle0 = document.getElementById('deci0').value
    deci = convertHexaToDeci(hle0)
    document.getElementById('hexa0').innerHTML = deci
})

//<h3>Conversion Little Endian -> Hexadécimal</h3>
document.getElementById('convertHexaLE').addEventListener('click', event => {
    hle = document.getElementById('hle').value
    hexa = convertHexaLittleEndianToHexa(hle)
    document.getElementById('hexadecimal').innerHTML = '0x' + hexa

})

//Recupere infos blockchain

$(function() {
            $('#aperçu').click(function() {
                blockid = document.getElementById('blockid').value
                $.getJSON("https://api.blockcypher.com/v1/btc/main/blocks/" + blockid, function(donnees) {
                console.log(donnees)
                $('#r').html('<p><b>Hash</b> : ' + donnees.hash + '</p>');
                $('#r').append('<p><b>Total</b> : ' + donnees.total / 100000000 +' BTC' + '</p>');
                $('#r').append('<p><b>Chain</b> : ' + donnees.chain + '</p>');
                $('#r').append('<p><b>Fees</b> : ' + donnees.fees / 100000000 +' BTC' + '</p>');
                });
            });
        });
        



    /*
  info = $.getJSON('https://api.blockcypher.com/v1/btc/main/blocks/0000000000000000189bba3564a63772107b5673c940c16f12662b3e8546b412')
.then(function(d) {
   console.log(d)
    
   
             });
    var x = document.getElementById("myDIV").innerHTML = info[0];
*/
    


    





